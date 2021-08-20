const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Group, UserGroup, Rsvp, Event } = require('../../db/models');

const router = express.Router();

router.get('/', restoreUser, asyncHandler( async(req,res) => {
    const groups = await Group.findAll()
    return res.json(groups)
}));

router.post('/new', restoreUser, asyncHandler(async(req,res) => {
    let { name, imgURL, location, description, userId} = req.body
    if (!imgURL) {
        imgURL = "https://www.vhv.rs/dpng/d/487-4871907_grey-x-icon-png-transparent-png.png"
    }
    const group = await Group.create({ name, img:imgURL, location, description, organizer: userId})

    await UserGroup.create({ userId, groupId: group.id})
    return res.json(group)
}))

router.put('/:id', restoreUser, asyncHandler(async(req,res) => {
    const {id} = req.params
    let { name, imgURL, location, description, userId} = req.body
    if (!imgURL) {
        imgURL = "https://www.vhv.rs/dpng/d/487-4871907_grey-x-icon-png-transparent-png.png"
    }
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

    const rsvps = await Rsvp.findAll({
        include: {
            model: Event,
            where: {
                categoryId: id
            }
        }
    })
    await rsvps.forEach(async(rsvp) => {
        await rsvp.destroy()
    })

    const events = await Event.findAll({where:{categoryId: id}})
    events.forEach(async(event) => {
        event.destroy()
    })
    console.log('events', events)
    const group = await Group.findByPk(id)
    await group.destroy()
    res.json(events)
}))

module.exports = router;
