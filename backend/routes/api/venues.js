const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Event, Venue } = require('../../db/models');

const router = express.Router();

router.get('/', restoreUser, asyncHandler( async(req,res) => {
    const venues = await Venue.findAll()
    return res.json(venues)
}));

module.exports = router;
