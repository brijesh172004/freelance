const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Post a new skill
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { name, skillName, description, paymentDetails, location } = req.body;
        
        const skill = new Skill({
            user: req.user.userId,
            name,
            skillName,
            description,
            paymentDetails,
            location,
            image: req.file.path
        });

        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().populate('user', 'name email');
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get a single skill
router.get('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id).populate('user', 'name email');
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router; 