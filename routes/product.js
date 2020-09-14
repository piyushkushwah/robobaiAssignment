const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const helper = require('../helper/errorHandler');

require('../models/Product');
const Product = mongoose.model('product');

router.get('/', (req, res) => {

    const query = { productName: { $regex: new RegExp(req.query.search, 'i') } };

    Product.find(query)
        .limit(20)
        .then(data => {

            if (data && data.length === 0) {
                res.status(404)
                    .json(helper.errorMsg('Data not found.', 'data'));
            } else {
                res.status(200)
                    .json({ data: data });
            }

        }).catch(err => {
            console.log(err);
            res.status(500).send(helper.errorMsg(err, 'data'));
        });

});

router.post('/', (req, res) => {

    const productId = (Math.random() * 1e18).toString(36);

    const newProduct = {
        productId: productId,
        productName: req.body.productName,
        quantity: req.body.quantity,
        numberOfUnits: req.body.numberOfUnits,
        coastPrice: req.body.coastPrice,
        sellingPrice: req.body.sellingPrice,
    }

    new Product(newProduct)
        .save()
        .then(data => {
            res.status(200).json({ data: data });
        }).catch(err => {
            res.status(500).send(helper.errorMsg(err, 'data'));
        });

});

router.put('/:id', (req, res) => {

    Product.findByIdAndUpdate({ _id: req.params.id }, {
        productName: req.body.productName,
        sellingPrice: req.body.sellingPrice,
        updated_at: new Date(),
    }, { new: true }).then(data => {
        res.status(200).json({ data: data });
    }).catch(err => {
        res.status(500).send(helper.errorMsg(err, 'data'));
    });

});

router.delete('/:id', (req, res) => {

    Product.findByIdAndDelete({ _id: req.params.id })
        .then(data => {
            res.status(200).send({ message: 'Product deleted successfully.', data: null });
        })
        .catch(err => {
            res.status(500).send(helper.errorMsg(err, 'data'));
        });

});

module.exports = router;