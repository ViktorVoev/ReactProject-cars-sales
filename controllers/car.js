const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Car.find()
            .then((cars) => res.send(cars))
            .catch(next);
    },

    post: (req, res, next) => {
        const { imgUrl, make, model, price, description, gearbox, creator } = req.body;
        models.Car.create({ imgUrl, make, model, price, description, gearbox, creator })
            .then((car) => res.send(car))
            .catch(next);
    },

    details: (req, res, next) => {
        const id = req.params.id;
        models.Car.find({ _id: id })
            .then((car) => res.send(car))
            .catch(next);
    },

    put: (req, res, next) => {
        const { imgUrl, make, model, price, description, gearbox } = req.body;
        const id = req.params.id;
        models.Car.updateOne({ _id: id }, { imgUrl, make, model, price, description, gearbox })
            .then((updatedCar) => res.send(updatedCar))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Car.deleteOne({ _id: id })
            .then((removedCar) => res.send(removedCar))
            .catch(next)
    }
};