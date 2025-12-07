const express = require('express');
const { body } = require('express-validator');
const seekerController = require('../controllers/seekerController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

const router = express.Router();

// All routes require authentication and SEEKER role
router.use(authenticate, authorize('SEEKER'));

/**
 * @route   GET /api/seekers/profile
 * @desc    Get seeker profile
 * @access  Private (Seeker only)
 */
router.get('/profile', seekerController.getSeekerProfile);

/**
 * @route   PUT /api/seekers/profile
 * @desc    Update seeker profile
 * @access  Private (Seeker only)
 */
router.put(
  '/profile',
  [
    body('organizationType')
      .optional()
      .isIn(['SME', 'LARGE_CORPORATION', 'UNIVERSITY', 'STARTUP', 'NGO', 'GOVERNMENT'])
      .withMessage('Invalid organization type'),
    body('organizationName').optional().notEmpty().withMessage('Organization name cannot be empty'),
  ],
  validate,
  seekerController.updateSeekerProfile
);

/**
 * @route   POST /api/seekers/consultations
 * @desc    Create consultation request
 * @access  Private (Seeker only)
 */
router.post(
  '/consultations',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('problemStatement')
      .notEmpty()
      .withMessage('Problem statement is required')
      .isLength({ min: 50 })
      .withMessage('Problem statement must be at least 50 characters'),
    body('preferredMode')
      .optional()
      .isArray()
      .withMessage('Preferred mode must be an array'),
  ],
  validate,
  seekerController.createConsultationRequest
);

/**
 * @route   GET /api/seekers/consultations
 * @desc    Get seeker's consultation requests
 * @access  Private (Seeker only)
 */
router.get('/consultations', seekerController.getConsultationRequests);

/**
 * @route   GET /api/seekers/consultations/:consultationId/matches
 * @desc    Get AI-matched experts for a consultation
 * @access  Private (Seeker only)
 */
router.get(
  '/consultations/:consultationId/matches',
  seekerController.getMatchedExperts
);

/**
 * @route   POST /api/seekers/connect
 * @desc    Send connection request to expert
 * @access  Private (Seeker only)
 */
router.post(
  '/connect',
  [
    body('consultationId').notEmpty().withMessage('Consultation ID is required'),
    body('expertId').notEmpty().withMessage('Expert ID is required'),
  ],
  validate,
  seekerController.sendConnectionRequest
);

/**
 * @route   PUT /api/seekers/consultations/:consultationId
 * @desc    Update consultation request
 * @access  Private (Seeker only)
 */
router.put(
  '/consultations/:consultationId',
  seekerController.updateConsultationRequest
);

/**
 * @route   DELETE /api/seekers/consultations/:consultationId
 * @desc    Delete consultation request
 * @access  Private (Seeker only)
 */
router.delete(
  '/consultations/:consultationId',
  seekerController.deleteConsultationRequest
);

module.exports = router;
