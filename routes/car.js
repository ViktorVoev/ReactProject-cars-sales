const controllers = require('../controllers/');
const router = require('express').Router();

router.get('/', controllers.car.get);

router.post('/create', controllers.car.post);

router.get('/details/:id', controllers.car.details);

router.put('/edit/:id', controllers.car.put);

router.delete('/delete/:id',  controllers.car.delete);

module.exports = router;