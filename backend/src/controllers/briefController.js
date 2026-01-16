const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Create a new project brief (intake form)
 * POST /api/briefs
 */
const createBrief = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const {
      projectType,
      topic,
      detailedDescription,
      goals,
      expectedOutcomes,
      format,
      location,
      specificLocation,
      timeframe,
      startDate,
      endDate,
      estimatedHours,
      urgency,
      budgetMin,
      budgetMax,
      budgetCurrency,
      budgetFlexible,
      languages,
      industryContext,
      targetAudience,
      specificRequirements,
      deliverables
    } = req.body;

    // Validation
    if (!projectType || !topic || !goals || !timeframe || !urgency) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: projectType, topic, goals, timeframe, urgency'
      });
    }

    // Create brief
    const brief = await prisma.projectBrief.create({
      data: {
        userId,
        projectType,
        topic,
        detailedDescription,
        goals,
        expectedOutcomes,
        format: format || [],
        location,
        specificLocation,
        timeframe,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        estimatedHours: estimatedHours ? parseInt(estimatedHours) : null,
        urgency,
        budgetMin: budgetMin ? parseFloat(budgetMin) : null,
        budgetMax: budgetMax ? parseFloat(budgetMax) : null,
        budgetCurrency: budgetCurrency || 'THB',
        budgetFlexible: budgetFlexible || false,
        languages: languages || ['Thai'],
        industryContext,
        targetAudience,
        specificRequirements,
        deliverables,
        isActive: true
      }
    });

    res.status(201).json({
      success: true,
      data: brief
    });
  } catch (error) {
    console.error('Error creating brief:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create brief',
      details: error.message
    });
  }
};

/**
 * Get all briefs for current user
 * GET /api/briefs
 */
const getBriefs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { isActive } = req.query;

    const where = { userId };
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }

    const briefs = await prisma.projectBrief.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        consultations: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: briefs
    });
  } catch (error) {
    console.error('Error fetching briefs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch briefs',
      details: error.message
    });
  }
};

/**
 * Get a single brief by ID
 * GET /api/briefs/:id
 */
const getBriefById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const brief = await prisma.projectBrief.findFirst({
      where: {
        id,
        userId
      },
      include: {
        consultations: {
          select: {
            id: true,
            title: true,
            status: true,
            expertId: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });

    if (!brief) {
      return res.status(404).json({
        success: false,
        error: 'Brief not found'
      });
    }

    // Update lastUsedAt
    await prisma.projectBrief.update({
      where: { id },
      data: { lastUsedAt: new Date() }
    });

    res.json({
      success: true,
      data: brief
    });
  } catch (error) {
    console.error('Error fetching brief:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch brief',
      details: error.message
    });
  }
};

/**
 * Update a brief
 * PUT /api/briefs/:id
 */
const updateBrief = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if brief exists and belongs to user
    const existingBrief = await prisma.projectBrief.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingBrief) {
      return res.status(404).json({
        success: false,
        error: 'Brief not found'
      });
    }

    const {
      projectType,
      topic,
      detailedDescription,
      goals,
      expectedOutcomes,
      format,
      location,
      specificLocation,
      timeframe,
      startDate,
      endDate,
      estimatedHours,
      urgency,
      budgetMin,
      budgetMax,
      budgetCurrency,
      budgetFlexible,
      languages,
      industryContext,
      targetAudience,
      specificRequirements,
      deliverables,
      isActive
    } = req.body;

    // Update brief
    const updatedBrief = await prisma.projectBrief.update({
      where: { id },
      data: {
        ...(projectType && { projectType }),
        ...(topic && { topic }),
        ...(detailedDescription !== undefined && { detailedDescription }),
        ...(goals && { goals }),
        ...(expectedOutcomes !== undefined && { expectedOutcomes }),
        ...(format && { format }),
        ...(location !== undefined && { location }),
        ...(specificLocation !== undefined && { specificLocation }),
        ...(timeframe && { timeframe }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(estimatedHours !== undefined && { estimatedHours: estimatedHours ? parseInt(estimatedHours) : null }),
        ...(urgency && { urgency }),
        ...(budgetMin !== undefined && { budgetMin: budgetMin ? parseFloat(budgetMin) : null }),
        ...(budgetMax !== undefined && { budgetMax: budgetMax ? parseFloat(budgetMax) : null }),
        ...(budgetCurrency && { budgetCurrency }),
        ...(budgetFlexible !== undefined && { budgetFlexible }),
        ...(languages && { languages }),
        ...(industryContext !== undefined && { industryContext }),
        ...(targetAudience !== undefined && { targetAudience }),
        ...(specificRequirements !== undefined && { specificRequirements }),
        ...(deliverables !== undefined && { deliverables }),
        ...(isActive !== undefined && { isActive })
      }
    });

    res.json({
      success: true,
      data: updatedBrief
    });
  } catch (error) {
    console.error('Error updating brief:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update brief',
      details: error.message
    });
  }
};

/**
 * Delete (soft delete) a brief
 * DELETE /api/briefs/:id
 */
const deleteBrief = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if brief exists and belongs to user
    const existingBrief = await prisma.projectBrief.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingBrief) {
      return res.status(404).json({
        success: false,
        error: 'Brief not found'
      });
    }

    // Soft delete by setting isActive to false
    await prisma.projectBrief.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Brief deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting brief:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete brief',
      details: error.message
    });
  }
};

/**
 * Get brief recommendations based on AI matching
 * POST /api/briefs/:id/recommendations
 */
const getBriefRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { limit = 10 } = req.body;

    // Get the brief
    const brief = await prisma.projectBrief.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!brief) {
      return res.status(404).json({
        success: false,
        error: 'Brief not found'
      });
    }

    // Get experts matching the brief criteria
    const experts = await prisma.expert.findMany({
      where: {
        AND: [
          { availability: 'AVAILABLE' },
          // Match work mode if specified
          ...(brief.format && brief.format.length > 0
            ? [{ preferredMode: { hasSome: brief.format } }]
            : []),
          // Match languages
          ...(brief.languages && brief.languages.length > 0
            ? [{ languages: { hasSome: brief.languages } }]
            : [])
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true
          }
        },
        skills: {
          include: {
            skill: true
          }
        },
        industries: {
          include: {
            industry: true
          }
        }
      },
      take: parseInt(limit)
    });

    // Simple scoring algorithm (can be enhanced with AI later)
    const scoredExperts = experts.map(expert => {
      let score = 0;
      
      // Match work mode
      if (brief.format && brief.format.length > 0) {
        const modeMatch = brief.format.some(mode => expert.preferredMode.includes(mode));
        if (modeMatch) score += 20;
      }
      
      // Match languages
      if (brief.languages && brief.languages.length > 0) {
        const langMatch = brief.languages.some(lang => expert.languages.includes(lang));
        if (langMatch) score += 15;
      }
      
      // Budget compatibility
      if (brief.budgetMax && expert.hourlyRate) {
        if (parseFloat(expert.hourlyRate) <= parseFloat(brief.budgetMax)) {
          score += 25;
        }
      }
      
      // Years of experience
      if (expert.yearsOfExperience) {
        score += Math.min(expert.yearsOfExperience, 20);
      }
      
      // Rating
      if (expert.rating) {
        score += parseFloat(expert.rating) * 10;
      }

      return {
        ...expert,
        matchingScore: score
      };
    });

    // Sort by matching score
    scoredExperts.sort((a, b) => b.matchingScore - a.matchingScore);

    res.json({
      success: true,
      data: {
        brief,
        recommendations: scoredExperts
      }
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get recommendations',
      details: error.message
    });
  }
};

module.exports = {
  createBrief,
  getBriefs,
  getBriefById,
  updateBrief,
  deleteBrief,
  getBriefRecommendations
};
