const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Group } = require('../../db/models');


const router = express.Router();

router.get('/', restoreUser, asyncHandler( async(req,res) => {
    const groups = await Group.findAll()
    return res.json(groups)
}));

module.exports = router;
