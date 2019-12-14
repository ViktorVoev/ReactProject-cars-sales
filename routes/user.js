const controllers = require('../controllers/');
const router = require('express').Router();

router.post('/register', controllers.user.post.register);

router.post('/login', controllers.user.post.login);

router.post('/logout', controllers.user.post.logout);

router.get('/profile/:id', controllers.user.get);

router.put('/favourite/:id', controllers.user.put);

router.delete('/favourite/:id', controllers.user.delete);

module.exports = router;