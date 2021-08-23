const express = require('express');
const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { restoreUser } = require('../../utils/auth');
const { Event, Rsvp, User, Group } = require('../../db/models');

const router = express.Router();

router.get('/', restoreUser, asyncHandler( async(req,res) => {
    const events = await Event.findAll({
        where: {
            date: {
                [Op.gt]: Date.now()
            }
        },
        include: [
            {
                model: Rsvp,
                include: {
                    model: User
                },
            },
            {
                model: Group,
                include: {
                    model: User
                }
            }
        ]
    })
    return res.json(events)
}));

router.post('/new', restoreUser, asyncHandler(async(req,res) => {
    let { name, imgURL, venueId, groupId, description, date, capacity, userId} = req.body
    if (!imgURL) {
        imgURL = "https://www.vhv.rs/dpng/d/487-4871907_grey-x-icon-png-transparent-png.png"
    }
    const event = await Event.create({ name, img: imgURL, venueId, categoryId: groupId, description, date, capacity, hostId: userId})
    const createdEvent = await Event.findByPk(event.id, {
        include: [
            {
                model: Rsvp,
                include: {
                    model: User
                },
            },
            {
                model: Group,
                include: {
                    model: User
                }
            }
        ]
    })

    await Rsvp.create({ userId, eventId: event.id})
    return res.json(createdEvent)
}))

router.put('/:id', restoreUser, asyncHandler(async(req,res) => {
    const {id} = req.params
    let { name, imgURL, venueId, groupId, description, date, capacity, userId} = req.body
    if (!imgURL) {
        imgURL = "https://www.vhv.rs/dpng/d/487-4871907_grey-x-icon-png-transparent-png.png"
    }
    const event = await Event.findByPk(id, {
        include: [
            {
                model: Rsvp,
                include: {
                    model: User
                },
            },
            {
                model: Group,
                include: {
                    model: User
                }
            }
        ]
    })
    await event.update({ name, img:imgURL, venueId, groupId, description, date, capacity, userId})
    
    await Rsvp.create({ userId, eventId: event.id})
    return res.json(event)
}))

router.delete('/:id', restoreUser, asyncHandler(async(req,res) => {
    const {id} = req.params

    const rsvps = await Rsvp.findAll({where:{eventId: id}})
    rsvps.forEach(async(rsvp)=> {
        await rsvp.destroy()
    })

    const event = await Event.findByPk(id)
    await event.destroy()
    res.json("Deleted")
}))


module.exports = router;
