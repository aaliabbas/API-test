const express = require('express');
const router = express.Router();
const State = require('../models/State');

// GET all states
router.get('/', async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new fun fact for a state
router.post('/:state/funfact', async (req, res) => {
    const { state } = req.params;
    const { funfacts } = req.body;

    try {
        let existingState = await State.findOne({ stateCode: state });
        if (!existingState) {
            return res.status(404).json({ error: 'State not found' });
        }

        existingState.funfacts.push(...funfacts);
        const newState = await existingState.save();
        res.status(201).json(newState);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// other CRUD routes (GET by state, PATCH, DELETE) can be added similarly

module.exports = router;
