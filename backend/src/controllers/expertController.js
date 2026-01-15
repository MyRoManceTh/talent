const prisma = require('../config/database');
const logger = require('../config/logger');

/**
 * Get expert profile
 */
const getExpertProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const expert = await prisma.expert.findUnique({
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
        educations: {
          orderBy: { startYear: 'desc' },
        },
        workExperiences: {
          orderBy: { startDate: 'desc' },
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
        },
      },
    });

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert profile not found',
      });
    }

    // Transform the response to match frontend expectations
    const transformedExpert = {
      ...expert,
      education: expert.educations || [],
      experience: (expert.workExperiences || []).map(exp => ({
        position: exp.title,
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrent: exp.isCurrent,
        description: exp.description,
        keyResponsibilities: exp.keyResponsibilities,
        industry: exp.industry,
        location: exp.location,
        achievements: exp.achievements,
      })),
      skills: (expert.skills || []).map(s => ({
        name: s.skill?.name || '',
        category: s.skill?.category || 'TECHNICAL',
        proficiencyLevel: s.proficiency,
        yearsOfExp: s.yearsOfExp,
      })),
      // Keep original arrays for compatibility
      educations: expert.educations,
      workExperiences: expert.workExperiences,
    };

    res.json({
      success: true,
      data: transformedExpert,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update expert profile
 */
const updateExpertProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      headline,
      bio,
      linkedinUrl,
      yearsOfExperience,
      hourlyRate,
      availability,
      country,
      city,
      timezone,
      preferredMode,
      languages,
      // Talenter fields
      dateOfBirth,
      currentCompany,
      currentPosition,
      workStatus,
      contactPhone,
      missionInterests,
      // Relations
      education,
      experience,
      skills,
      achievements,
    } = req.body;

    // Get expert first
    const existingExpert = await prisma.expert.findUnique({ 
      where: { userId },
      include: {
        educations: true,
        workExperiences: true,
        skills: { include: { skill: true } },
        achievements: true,
      },
    });

    if (!existingExpert) {
      return res.status(404).json({
        success: false,
        message: 'Expert profile not found',
      });
    }

    // Update basic expert info
    const expert = await prisma.expert.update({
      where: { userId },
      data: {
        headline,
        bio,
        linkedinUrl,
        yearsOfExperience,
        hourlyRate,
        availability,
        country,
        city,
        timezone,
        preferredMode,
        languages,
        // Talenter fields
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        currentCompany,
        currentPosition,
        workStatus,
        contactPhone,
        missionInterests: missionInterests || [],
      },
    });

    // Handle education updates
    if (education && Array.isArray(education)) {
      // Delete existing educations
      await prisma.education.deleteMany({
        where: { expertId: expert.id },
      });

      // Create new educations with proper type conversion
      if (education.length > 0) {
        const educationData = education.map(edu => ({
          expertId: expert.id,
          institution: edu.institution,
          degree: edu.degree,
          fieldOfStudy: edu.fieldOfStudy || null,
          // Convert to Int properly
          startYear: edu.startYear ? parseInt(String(edu.startYear), 10) : null,
          endYear: edu.endYear ? parseInt(String(edu.endYear), 10) : null,
          description: edu.description || null,
        }));
        
        console.log('Creating education with data:', educationData);
        
        await prisma.education.createMany({
          data: educationData,
        });
      }
    }

    // Handle experience updates
    if (experience && Array.isArray(experience)) {
      // Delete existing experiences
      await prisma.workExperience.deleteMany({
        where: { expertId: expert.id },
      });

      // Create new experiences
      if (experience.length > 0) {
        await prisma.workExperience.createMany({
          data: experience.map(exp => ({
            expertId: expert.id,
            title: exp.position || exp.title,
            company: exp.company,
            industry: exp.industry || null,
            location: exp.location || null,
            startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
            endDate: exp.endDate && !exp.isCurrent ? new Date(exp.endDate) : null,
            isCurrent: exp.isCurrent || false,
            description: exp.description || null,
            achievements: exp.achievements || null,
            keyResponsibilities: exp.keyResponsibilities || null,
          })),
        });
      }
    }

    // Handle skills updates
    if (skills && Array.isArray(skills)) {
      // Delete existing expert skills
      await prisma.expertSkill.deleteMany({
        where: { expertId: expert.id },
      });

      // Create new skills
      for (const skillData of skills) {
        if (skillData.name) {
          // Find or create skill
          let skill = await prisma.skill.findFirst({
            where: { name: { equals: skillData.name, mode: 'insensitive' } },
          });

          if (!skill) {
            skill = await prisma.skill.create({
              data: {
                name: skillData.name,
                category: skillData.category || 'TECHNICAL',
              },
            });
          }

          // Link skill to expert
          await prisma.expertSkill.create({
            data: {
              expertId: expert.id,
              skillId: skill.id,
              proficiency: skillData.proficiencyLevel || 'INTERMEDIATE',
              yearsOfExp: null,
            },
          });
        }
      }
    }

    // Handle achievements updates
    if (achievements && Array.isArray(achievements)) {
      // Delete existing achievements
      await prisma.achievement.deleteMany({
        where: { expertId: expert.id },
      });

      // Create new achievements
      if (achievements.length > 0) {
        await prisma.achievement.createMany({
          data: achievements.map(ach => ({
            expertId: expert.id,
            title: ach.title,
            description: ach.description || null,
            date: ach.date ? new Date(ach.date) : null,
            url: ach.url || null,
            images: ach.images || [],
            organization: ach.organization || null,
          })),
        });
      }
    }

    // Fetch complete updated profile
    const updatedExpert = await prisma.expert.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        educations: {
          orderBy: { startYear: 'desc' },
        },
        workExperiences: {
          orderBy: { startDate: 'desc' },
        },
        skills: {
          include: {
            skill: true,
          },
        },
        achievements: {
          orderBy: { date: 'desc' },
        },
      },
    });

    // Calculate profile completeness
    const completeness = calculateProfileCompleteness(updatedExpert);
    await prisma.expert.update({
      where: { userId },
      data: { profileCompleteness: completeness },
    });

    logger.info('Expert profile updated (full)', { expertId: expert.id });

    // Transform the response to match frontend expectations
    const transformedExpert = {
      ...updatedExpert,
      education: updatedExpert.educations || [],
      experience: (updatedExpert.workExperiences || []).map(exp => ({
        position: exp.title,
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrent: exp.isCurrent,
        description: exp.description,
        keyResponsibilities: exp.keyResponsibilities,
        industry: exp.industry,
        location: exp.location,
        achievements: exp.achievements,
      })),
      skills: (updatedExpert.skills || []).map(s => ({
        name: s.skill?.name || '',
        category: s.skill?.category || 'TECHNICAL',
        proficiencyLevel: s.proficiency,
        yearsOfExp: s.yearsOfExp,
      })),
      // Keep original arrays for compatibility
      educations: updatedExpert.educations,
      workExperiences: updatedExpert.workExperiences,
    };

    res.json({
      success: true,
      message: 'Expert profile updated successfully',
      data: transformedExpert,
    });
  } catch (error) {
    logger.error('Error updating expert profile:', error);
    next(error);
  }
};

/**
 * Add education
 */
const addEducation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { degree, fieldOfStudy, institution, startYear, endYear, description } = req.body;

    const expert = await prisma.expert.findUnique({ where: { userId } });
    
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert profile not found',
      });
    }

    const education = await prisma.education.create({
      data: {
        expertId: expert.id,
        degree,
        fieldOfStudy,
        institution,
        startYear,
        endYear,
        description,
      },
    });

    logger.info('Education added', { expertId: expert.id, educationId: education.id });

    res.status(201).json({
      success: true,
      message: 'Education added successfully',
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add work experience
 */
const addWorkExperience = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      title,
      company,
      industry,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      achievements,
    } = req.body;

    const expert = await prisma.expert.findUnique({ where: { userId } });
    
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert profile not found',
      });
    }

    const workExperience = await prisma.workExperience.create({
      data: {
        expertId: expert.id,
        title,
        company,
        industry,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        isCurrent,
        description,
        achievements,
      },
    });

    logger.info('Work experience added', { expertId: expert.id, workExpId: workExperience.id });

    res.status(201).json({
      success: true,
      message: 'Work experience added successfully',
      data: workExperience,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add skill
 */
const addSkill = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { skillName, category, proficiency, yearsOfExp } = req.body;

    const expert = await prisma.expert.findUnique({ where: { userId } });
    
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert profile not found',
      });
    }

    // Find or create skill
    let skill = await prisma.skill.findFirst({
      where: { name: { equals: skillName, mode: 'insensitive' } },
    });

    if (!skill) {
      skill = await prisma.skill.create({
        data: {
          name: skillName,
          category,
        },
      });
    }

    // Add skill to expert
    const expertSkill = await prisma.expertSkill.create({
      data: {
        expertId: expert.id,
        skillId: skill.id,
        proficiency,
        yearsOfExp,
      },
      include: {
        skill: true,
      },
    });

    logger.info('Skill added to expert', { expertId: expert.id, skillId: skill.id });

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: expertSkill,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add achievement
 */
const addAchievement = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, description, date, url, images } = req.body;

    const expert = await prisma.expert.findUnique({ where: { userId } });
    
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert profile not found',
      });
    }

    const achievement = await prisma.achievement.create({
      data: {
        expertId: expert.id,
        title,
        description,
        date: date ? new Date(date) : null,
        url,
        images: images || [],
      },
    });

    logger.info('Achievement added', { expertId: expert.id, achievementId: achievement.id });

    res.status(201).json({
      success: true,
      message: 'Achievement added successfully',
      data: achievement,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get consultation requests for expert
 */
const getConsultationRequests = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const expert = await prisma.expert.findUnique({ where: { userId } });
    
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert profile not found',
      });
    }

    const whereClause = {
      expertId: expert.id,
      ...(status && { status }),
    };

    const consultations = await prisma.consultation.findMany({
      where: whereClause,
      include: {
        seeker: {
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
 * Respond to consultation request
 */
const respondToConsultation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { consultationId } = req.params;
    const { action } = req.body; // 'ACCEPTED' or 'DECLINED'

    const expert = await prisma.expert.findUnique({ where: { userId } });
    
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: 'Expert profile not found',
      });
    }

    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
    });

    if (!consultation || consultation.expertId !== expert.id) {
      return res.status(404).json({
        success: false,
        message: 'Consultation request not found',
      });
    }

    const updatedConsultation = await prisma.consultation.update({
      where: { id: consultationId },
      data: {
        status: action,
        respondedAt: new Date(),
      },
      include: {
        seeker: {
          include: {
            user: true,
          },
        },
      },
    });

    logger.info('Expert responded to consultation', {
      expertId: expert.id,
      consultationId,
      action,
    });

    res.json({
      success: true,
      message: `Consultation request ${action.toLowerCase()}`,
      data: updatedConsultation,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Calculate profile completeness percentage
 */
function calculateProfileCompleteness(expert) {
  let score = 0;
  const weights = {
    headline: 10,
    bio: 15,
    yearsOfExperience: 5,
    hourlyRate: 5,
    linkedinUrl: 5,
    location: 5,
    preferredMode: 5,
    languages: 5,
  };

  if (expert.headline) score += weights.headline;
  if (expert.bio && expert.bio.length > 50) score += weights.bio;
  if (expert.yearsOfExperience) score += weights.yearsOfExperience;
  if (expert.hourlyRate) score += weights.hourlyRate;
  if (expert.linkedinUrl) score += weights.linkedinUrl;
  if (expert.country && expert.city) score += weights.location;
  if (expert.preferredMode && expert.preferredMode.length > 0) score += weights.preferredMode;
  if (expert.languages && expert.languages.length > 0) score += weights.languages;

  // Add remaining 40% based on additional data
  // This should check educations, work experiences, skills, etc.
  // For now, just return the base score
  return Math.min(score, 100);
}

module.exports = {
  getExpertProfile,
  updateExpertProfile,
  addEducation,
  addWorkExperience,
  addSkill,
  addAchievement,
  getConsultationRequests,
  respondToConsultation,
};
