const Sequelize = require('sequelize')
const Op = Sequelize.Op
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, UserGroup, Group, Rsvp, Event } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get('/:userId/groups', restoreUser, asyncHandler(async(req,res) => {
  const {userId} = req.params
  
  const userGroups = await User.findAll({
    include: { 
      model: Group,
      as: "joinedGroups",
      include: {
          model: User,
          as: "joinedGroups"
        }
    },
    where: {
      id: userId
    },
})
  
  return res.json(userGroups)
}))

router.post('/:userId(\\d+)/groups/:groupId(\\d+)', restoreUser, asyncHandler(async(req,res) => {
  const {userId, groupId} = req.params
  await UserGroup.create({ userId, groupId})
  const group = await Group.findByPk(groupId)
  return res.json(group)
}))


router.delete('/:userId/groups/:groupId', restoreUser, asyncHandler(async(req,res) => {
  const {userId, groupId} = req.params
  const userGroup = await UserGroup.findOne({where: {
      userId,
      groupId
  }})
  await userGroup.destroy()
  return res.json(groupId)
}))

router.get('/:userId/events', restoreUser, asyncHandler(async(req,res) => {
  const {userId} = req.params
  
  const userEvents = await Rsvp.findAll({
    include: { 
      model: Event,
      where: {
        date: {
          [Op.gt]: Date.now()
        }
      }
    },
    where: {
      userId,
    },
})
  
  return res.json(userEvents)
}))

router.post('/:userId(\\d+)/events/:eventId(\\d+)', restoreUser, asyncHandler(async(req,res) => {
  const {userId, eventId} = req.params
  const rsvp = await Rsvp.create({ userId, eventId})
  const event = await Event.findByPk(eventId)
  return res.json(event)
}))

router.delete('/:userId/events/:eventId', restoreUser, asyncHandler(async(req,res) => {
  const {userId, eventId} = req.params
  const rsvp = await Rsvp.findOne({where: {
      userId,
      eventId
  }})
  await rsvp.destroy()
  return res.json(eventId)
}))



router.get('/:userId/pets', restoreUser, asyncHandler(async(req, res) => {
  const { userId } = req.params

  const userPets = await Pet.findAll({
    where: {
      owner: userId
    }
  })

  return res.json(userPets)
}))

module.exports = router;
