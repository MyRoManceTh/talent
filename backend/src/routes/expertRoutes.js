const express = require('express');
const { body } = require('express-validator');
const expertController = require('../controllers/expertController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

const router = express.Router();

// All routes require authentication and EXPERT role
router.use(authenticate, authorize('EXPERT'));

/**
 * @route   GET /api/experts/profile
 * @desc    Get expert profile
 * @access  Private (Expert only)
 */
router.get('/profile', expertController.getExpertProfile);

/**
 * @route   PUT /api/experts/profile
 * @desc    Update expert profile
 * @access  Private (Expert only)
 */
router.put('/profile', expertController.updateExpertProfile);

/**
 * @route   POST /api/experts/education
 * @desc    Add education
 * @access  Private (Expert only)
 */
router.post(
  '/education',
  [
    body('degree').notEmpty().withMessage('Degree is required'),
    body('fieldOfStudy').notEmpty().withMessage('Field of study is required'),
    body('institution').notEmpty().withMessage('Institution is required'),
    body('startYear').isInt().withMessage('Start year must be a valid year'),
    body('endYear').optional().isInt().withMessage('End year must be a valid year'),
  ],
  validate,
  expertController.addEducation
);

/**
 * @route   POST /api/experts/experience
 * @desc    Add work experience
 * @access  Private (Expert only)
 */
router.post(
  '/experience',
  [
    body('title').notEmpty().withMessage('Job title is required'),
    body('company').notEmpty().withMessage('Company is required'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate')
      .optional()
      .isISO8601()
      .withMessage('End date must be a valid date'),
    body('isCurrent').optional().isBoolean(),
  ],
  validate,
  expertController.addWorkExperience
);

/**
 * @route   POST /api/experts/skills
 * @desc    Add skill
 * @access  Private (Expert only)
 */
router.post(
  '/skills',
  [
    body('skillName').notEmpty().withMessage('Skill name is required'),
    body('category')
      .isIn(['TECHNICAL', 'SOFT_SKILL', 'DOMAIN_KNOWLEDGE', 'TOOL', 'LANGUAGE'])
      .withMessage('Invalid skill category'),
    body('proficiency')
      .isIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'])
      .withMessage('Invalid proficiency level'),
    body('yearsOfExp').optional().isInt().withMessage('Years of experience must be a number'),
  ],
  validate,
  expertController.addSkill
);

/**
 * @route   POST /api/experts/achievements
 * @desc    Add achievement
 * @access  Private (Expert only)
 */
router.post(
  '/achievements',
  [
    body('title').notEmpty().withMessage('Achievement title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date').optional().isISO8601().withMessage('Date must be valid'),
  ],
  validate,
  expertController.addAchievement
);

/**
 * @route   GET /api/experts/consultations
 * @desc    Get consultation requests for expert
 * @access  Private (Expert only)
 */
router.get('/consultations', expertController.getConsultationRequests);

/**
 * @route   PUT /api/experts/consultations/:consultationId/respond
 * @desc    Respond to consultation request
 * @access  Private (Expert only)
 */
router.put(
  '/consultations/:consultationId/respond',
  [
    body('action')
      .isIn(['ACCEPTED', 'DECLINED'])
      .withMessage('Action must be ACCEPTED or DECLINED'),
  ],
  validate,
  expertController.respondToConsultation
);

module.exports = router;
