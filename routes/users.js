const express = require('express');
const app = express()
const router = express.Router();

const userController = require("../controllers/user")
const User = require("../models/user")

// POST /users
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userController.addUser(email, password);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userController.getUserById(id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /users/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const user = await userController.updateUserById(id, updates);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await userController.deleteUserById(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists with provided email and password
    User.findOne({ email, password }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If user exists, return a success message
        return res.json({ message: 'Login successful' });
    });
});

module.exports = router;

