const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

// Get user's profile and their skills
router.get('/', auth, async (req, res) => {
    try {
        const skills = await Skill.find({ user: req.user.userId });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete a skill post
router.delete('/:id', auth, async (req, res) => {
    try {
        const skill = await Skill.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found or unauthorized' });
        }

        await skill.remove();
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 