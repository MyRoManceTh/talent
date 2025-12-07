const prisma = require('../config/database');
const matchingEngine = require('../services/ai/matchingEngine');
const logger = require('../config/logger');

/**
 * Get seeker profile
 */
const getSeekerProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const seeker = await prisma.seeker.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            profileImage: true,
          },
        },
        industries: {
          include: {
            industry: true,
          },
        },
      },
    });

    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Seeker profile not found',
      });
    }

    res.json({
      success: true,
      data: seeker,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update seeker profile
 */
const updateSeekerProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      organizationType,
      organizationName,
      organizationSize,
      website,
      description,
      position,
      department,
    } = req.body;

    const seeker = await prisma.seeker.update({
      where: { userId },
      data: {
        organizationType,
        organizationName,
        organizationSize,
        website,
        description,
        position,
        department,
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

    logger.info('Seeker profile updated', { seekerId: seeker.id });

    res.json({
      success: true,
      message: 'Seeker profile updated successfully',
      data: seeker,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create consultation request
 */
const createConsultationRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      title,
      problemStatement,
      expectations,
      scope,
      budget,
      duration,
      preferredMode,
    } = req.body;

    const seeker = await prisma.seeker.findUnique({ where: { userId } });
    
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Seeker profile not found',
      });
    }

    const consultation = await prisma.consultation.create({
      data: {
        seekerId: seeker.id,
        title,
        problemStatement,
        expectations,
        scope,
        budget,
        duration,
        preferredMode: preferredMode || [],
        status: 'PENDING',
      },
    });

    logger.info('Consultation request created', {
      seekerId: seeker.id,
      consultationId: consultation.id,
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request created successfully',
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get AI-matched experts for a consultation request
 */
const getMatchedExperts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { consultationId } = req.params;

    const seeker = await prisma.seeker.findUnique({ where: { userId } });
    
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Seeker profile not found',
      });
    }

    // Get consultation request
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation || consultation.seekerId !== seeker.id) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found',
      });
    }

    // Get all available experts with their full profiles
    const experts = await prisma.expert.findMany({
      where: {
        availability: {
          in: ['AVAILABLE', 'BUSY'], // Exclude NOT_AVAILABLE
        },
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
          },
        },
        educations: {
          orderBy: { startYear: 'desc' },
        },
        workExperiences: {
          orderBy: { startDate: 'desc' },
          take: 5, // Limit to most recent
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
        achievements: {
          orderBy: { date: 'desc' },
          take: 3, // Limit to top achievements
        },
      },
    });

    if (experts.length === 0) {
      return res.json({
        success: true,
        message: 'No experts available at the moment',
        data: {
          matches: [],
          summary: 'No experts found in the system.',
        },
      });
    }

    // Run AI matching
    logger.info('Starting AI matching', {
      consultationId,
      expertCount: experts.length,
    });

    const matches = await matchingEngine.matchExperts(consultation, experts);

    // Store matching history
    await prisma.matchingHistory.create({
      data: {
        consultationId: consultation.id,
        expertIds: matches.map(m => m.expertId),
        scores: matches.reduce((acc, m) => {
          acc[m.expertId] = m.score;
          return acc;
        }, {}),
        algorithm: 'openai-gpt4o',
        parameters: {
          model: process.env.OPENAI_MODEL,
          timestamp: new Date().toISOString(),
        },
      },
    });

    // Get top 3 matches with full expert details
    const topMatches = matches.slice(0, 3);
    const enrichedMatches = await Promise.all(
      topMatches.map(async (match) => {
        const expert = experts.find(e => e.id === match.expertId);
        return {
          ...match,
          expert,
        };
      })
    );

    logger.info('AI matching completed', {
      consultationId,
      matchesFound: matches.length,
      topScore: matches[0]?.score,
    });

    res.json({
      success: true,
      data: {
        consultation,
        matches: enrichedMatches,
        totalMatches: matches.length,
        summary: matches[0]?.summary || 'Matching completed',
      },
    });
  } catch (error) {
    logger.error('Error in getMatchedExperts:', error);
    next(error);
  }
};

/**
 * Send connection request to expert
 */
const sendConnectionRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { consultationId, expertId, message } = req.body;

    const seeker = await prisma.seeker.findUnique({ where: { userId } });
    
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Seeker profile not found',
      });
    }

    // Verify consultation belongs to seeker
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation || consultation.seekerId !== seeker.id) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found',
      });
    }

    // Verify expert exists
    const expert = await prisma.expert.findUnique({
      where: { id: expertId },
      include: {
        user: true,
      },
    });

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert not found',
      });
    }

    // Update consultation with expert and change status
    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        expertId,
        status: 'SENT_TO_EXPERT',
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

    logger.info('Connection request sent', {
      seekerId: seeker.id,
      expertId,
      consultationId,
    });

    // TODO: Send email notification to expert

    res.json({
      success: true,
      message: 'Connection request sent to expert',
      data: updatedConsultation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get seeker's consultation requests
 */
const getConsultationRequests = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const seeker = await prisma.seeker.findUnique({ where: { userId } });
    
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Seeker profile not found',
      });
    }

    const whereClause = {
      seekerId: seeker.id,
      ...(status && { status }),
    };

    const consultations = await prisma.consultation.findMany({
      where: whereClause,
      include: {
        expert: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                profileImage: true,
              },
            },
          },
        },
      },
      orderBy: { requestedAt: 'desc' },
    });

    res.json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update consultation request
 */
const updateConsultationRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { consultationId } = req.params;
    const updates = req.body;

    const seeker = await prisma.seeker.findUnique({ where: { userId } });
    
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Seeker profile not found',
      });
    }

    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation || consultation.seekerId !== seeker.id) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found',
      });
    }

    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: updates,
    });

    logger.info('Consultation request updated', {
      seekerId: seeker.id,
      consultationId,
    });

    res.json({
      success: true,
      message: 'Consultation request updated',
      data: updatedConsultation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete consultation request
 */
const deleteConsultationRequest = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { consultationId } = req.params;

    const seeker = await prisma.seeker.findUnique({ where: { userId } });
    
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: 'Seeker profile not found',
      });
    }

    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation || consultation.seekerId !== seeker.id) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found',
      });
    }

    await prisma.consultation.delete({
      where: { id: consultationId },
    });

    logger.info('Consultation request deleted', {
      seekerId: seeker.id,
      consultationId,
    });

    res.json({
      success: true,
      message: 'Consultation request deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSeekerProfile,
  updateSeekerProfile,
  createConsultationRequest,
  getMatchedExperts,
  sendConnectionRequest,
  getConsultationRequests,
  updateConsultationRequest,
  deleteConsultationRequest,
};
