const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and ADMIN role
router.use(authenticate);
router.use(authorize('ADMIN'));

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get dashboard statistics
 * @access  Private (Admin only)
 */
router.get('/dashboard', adminController.getDashboardStats);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users with filters and pagination
 * @access  Private (Admin only)
 */
router.get('/users', adminController.getAllUsers);

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get user by ID (detailed)
 * @access  Private (Admin only)
 */
router.get('/users/:id', adminController.getUserById);

/**
 * @route   PUT /api/admin/users/:id
 * @desc    Update user (admin)
 * @access  Private (Admin only)
 */
router.put('/users/:id', adminController.updateUser);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user
 * @access  Private (Admin only)
 */
router.delete('/users/:id', adminController.deleteUser);

/**
 * @route   GET /api/admin/experts
 * @desc    Get all experts with filters
 * @access  Private (Admin only)
 */
router.get('/experts', adminController.getAllExperts);

/**
 * @route   PUT /api/admin/experts/:id
 * @desc    Update expert status/availability
 * @access  Private (Admin only)
 */
router.put('/experts/:id', adminController.updateExpert);

/**
 * @route   GET /api/admin/consultations
 * @desc    Get all consultations with filters
 * @access  Private (Admin only)
 */
router.get('/consultations', adminController.getAllConsultations);

/**
 * @route   PUT /api/admin/consultations/:id
 * @desc    Update consultation status (admin override)
 * @access  Private (Admin only)
 */
router.put('/consultations/:id', adminController.updateConsultation);

/**
 * @route   GET /api/admin/briefs
 * @desc    Get all project briefs
 * @access  Private (Admin only)
 */
router.get('/briefs', adminController.getAllBriefs);

module.exports = router;
