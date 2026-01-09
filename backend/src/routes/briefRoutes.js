const express = require('express');
const router = express.Router();
const briefController = require('../controllers/briefController');
const { authenticate } = require('../middleware/auth');

// All brief routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/briefs
 * @desc    Create a new project brief
 * @access  Private
 */
router.post('/', briefController.createBrief);

/**
 * @route   GET /api/briefs
 * @desc    Get all briefs for current user
 * @access  Private
 */
router.get('/', briefController.getBriefs);

/**
 * @route   GET /api/briefs/:id
 * @desc    Get a single brief by ID
 * @access  Private
 */
router.get('/:id', briefController.getBriefById);

/**
 * @route   PUT /api/briefs/:id
 * @desc    Update a brief
 * @access  Private
 */
router.put('/:id', briefController.updateBrief);

/**
 * @route   DELETE /api/briefs/:id
 * @desc    Delete (soft delete) a brief
 * @access  Private
 */
router.delete('/:id', briefController.deleteBrief);

/**
 * @route   POST /api/briefs/:id/recommendations
 * @desc    Get expert recommendations based on brief
 * @access  Private
 */
router.post('/:id/recommendations', briefController.getBriefRecommendations);

module.exports = router;
