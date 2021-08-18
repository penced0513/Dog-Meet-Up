const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Group, UserGroup } = require('../../db/models');


const router = express.Router();

router.get('/', restoreUser, asyncHandler( async(req,res) => {
    const groups = await Group.findAll()
    return res.json(groups)
}));

router.post('/new', restoreUser, asyncHandler(async(req,res) => {
    const { name, imgURL, location, description, userId} = req.body
    const group = await Group.create({ name, img:imgURL, location, description, organizer: userId})
    return res.json(group)
}))

router.put('/:id', restoreUser, asyncHandler(async(req,res) => {
    const {id} = req.params
    const { name, imgURL, location, description, userId} = req.body
    const group = await Group.findByPk(id)
    await group.update({ name, img:imgURL, location, description, organizer: userId})
    return res.json(group)
}))

router.delete('/:id', restoreUser, asyncHandler(async(req,res) => {
    const {id} = req.params
    const userGroups = await UserGroup.findAll({where:{groupId: id}})
    userGroups.forEach(async(group) => {
        await group.destroy()
    })
    const group = await Group.findByPk(id)
    await group.destroy()
    res.json("Deleted")
}))

module.exports = router;
