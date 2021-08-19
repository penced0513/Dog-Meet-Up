const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups')
const eventsRouter = require('./events')
const venuesRouter = require('./venues')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/groups', groupsRouter)

router.use('/events', eventsRouter)

router.use('/venues', venuesRouter)

module.exports = router;
