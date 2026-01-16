const prisma = require('../config/database');
const logger = require('../config/logger');

/**
 * Get dashboard statistics
 */
const getDashboardStats = async (req, res, next) => {
  try {
    // Get counts
    const [
      totalUsers,
      totalExperts,
      totalSeekers,
      totalConsultations,
      totalBriefs,
      pendingConsultations,
      activeExperts,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'EXPERT' } }),
      prisma.user.count({ where: { role: 'SEEKER' } }),
      prisma.consultation.count(),
      prisma.projectBrief.count(),
      prisma.consultation.count({ where: { status: 'PENDING' } }),
      prisma.expert.count({ where: { availability: 'AVAILABLE' } }),
    ]);

    // Get recent users (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Get consultation stats by status
    const consultationsByStatus = await prisma.consultation.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    // Get top experts (by consultations count)
    const topExperts = await prisma.expert.findMany({
      take: 5,
      orderBy: {
        totalConsultations: 'desc',
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Get recent consultations
    const recentConsultations = await prisma.consultation.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        seeker: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        expert: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalExperts,
          totalSeekers,
          totalConsultations,
          totalBriefs,
          pendingConsultations,
          activeExperts,
          recentUsers,
        },
        consultationsByStatus,
        topExperts,
        recentConsultations,
      },
    });
  } catch (error) {
    logger.error('Get dashboard stats error:', error);
    next(error);
  }
};

/**
 * Get all users with filters
 */
const getAllUsers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      role,
      search,
      isVerified,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {};

    if (role) {
      where.role = role;
    }

    if (isVerified !== undefined) {
      where.isVerified = isVerified === 'true';
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get users and count
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          expert: {
            select: {
              id: true,
              availability: true,
              totalConsultations: true,
              rating: true,
            },
          },
          seeker: {
            select: {
              id: true,
              organizationName: true,
              organizationType: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Remove passwords
    const sanitizedUsers = users.map(({ password, ...user }) => user);

    res.json({
      success: true,
      data: {
        users: sanitizedUsers,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Get all users error:', error);
    next(error);
  }
};

/**
 * Get user by ID (detailed)
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        expert: {
          include: {
            educations: true,
            workExperiences: true,
            skills: {
              include: {
                skill: true,
              },
            },
            industries: {
              include: {
                industry: true,
              },
            },
            achievements: true,
            consultations: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 10,
            },
          },
        },
        seeker: {
          include: {
            industries: {
              include: {
                industry: true,
              },
            },
            consultations: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 10,
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Remove password
    const { password, ...sanitizedUser } = user;

    res.json({
      success: true,
      data: sanitizedUser,
    });
  } catch (error) {
    logger.error('Get user by ID error:', error);
    next(error);
  }
};

/**
 * Update user (admin)
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isVerified, role } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(isVerified !== undefined && { isVerified }),
        ...(role && { role }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        phoneNumber: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logger.info('User updated by admin', { userId: id, adminId: req.user.id });

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    logger.error('Update user error:', error);
    next(error);
  }
};

/**
 * Delete user (soft delete)
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Delete user (will cascade delete related records)
    await prisma.user.delete({
      where: { id },
    });

    logger.info('User deleted by admin', { userId: id, adminId: req.user.id });

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    logger.error('Delete user error:', error);
    next(error);
  }
};

/**
 * Get all experts with filters
 */
const getAllExperts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      availability,
      search,
      minRating,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {};

    if (availability) {
      where.availability = availability;
    }

    if (minRating) {
      where.rating = {
        gte: parseFloat(minRating),
      };
    }

    if (search) {
      where.user = {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    // Get experts and count
    const [experts, total] = await Promise.all([
      prisma.expert.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phoneNumber: true,
              isVerified: true,
              createdAt: true,
            },
          },
          skills: {
            include: {
              skill: true,
            },
          },
          industries: {
            include: {
              industry: true,
            },
          },
        },
      }),
      prisma.expert.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        experts,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Get all experts error:', error);
    next(error);
  }
};

/**
 * Update expert status/availability
 */
const updateExpert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { availability, isVerified } = req.body;

    const updateData = {};
    if (availability) {
      updateData.availability = availability;
    }

    const updatedExpert = await prisma.expert.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Update user verification if needed
    if (isVerified !== undefined) {
      await prisma.user.update({
        where: { id: updatedExpert.userId },
        data: { isVerified },
      });
    }

    logger.info('Expert updated by admin', { expertId: id, adminId: req.user.id });

    res.json({
      success: true,
      message: 'Expert updated successfully',
      data: updatedExpert,
    });
  } catch (error) {
    logger.error('Update expert error:', error);
    next(error);
  }
};

/**
 * Get all consultations with filters
 */
const getAllConsultations = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { problemStatement: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get consultations and count
    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          seeker: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          expert: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
          brief: {
            select: {
              id: true,
              projectType: true,
              topic: true,
            },
          },
        },
      }),
      prisma.consultation.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        consultations,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Get all consultations error:', error);
    next(error);
  }
};

/**
 * Update consultation status (admin override)
 */
const updateConsultation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedConsultation = await prisma.consultation.update({
      where: { id },
      data: {
        status,
        ...(status === 'ACCEPTED' && { respondedAt: new Date() }),
      },
      include: {
        seeker: {
          include: {
            user: true,
          },
        },
        expert: {
          include: {
            user: true,
          },
        },
      },
    });

    logger.info('Consultation updated by admin', {
      consultationId: id,
      status,
      adminId: req.user.id,
    });

    res.json({
      success: true,
      message: 'Consultation updated successfully',
      data: updatedConsultation,
    });
  } catch (error) {
    logger.error('Update consultation error:', error);
    next(error);
  }
};

/**
 * Get all project briefs
 */
const getAllBriefs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      projectType,
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {};

    if (projectType) {
      where.projectType = projectType;
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    // Get briefs and count
    const [briefs, total] = await Promise.all([
      prisma.projectBrief.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          consultations: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      }),
      prisma.projectBrief.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        briefs,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    logger.error('Get all briefs error:', error);
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllExperts,
  updateExpert,
  getAllConsultations,
  updateConsultation,
  getAllBriefs,
};
