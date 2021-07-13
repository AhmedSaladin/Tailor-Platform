const  mongoose  = require('mongoose');
const orderModel = require('./order.model');



const create_order = (req , res , next )=>{
    const order = new orderModel({
        _id: mongoose.Types.ObjectId(),
        customerID: req.body.customerID,
        tailorID: req.body.tailorID,
        designs: req.body.designs,
        sizes: req.body.sizes, 
    });
    order.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'order stored',
            createdOrder: {
                _id: result._id,
                 customerID: result.customerID,
                 tailorID: result.tailorID,
                 designs:  result.designs,
                 sizes:    result.sizes,
            },
            request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};


const view_order = (req , res , next )=>{
    orderModel.find()
              .select('customerID tailorID _id designs sizes')
              .exec()
              .then(docs =>{
                        res.status(200).json({
                            order: docs.map(doc =>{
                                return{
                                    _id: doc._id,
                                    customerID: doc.customerID,
                                    tailorID: doc.tailorID,
                                    designs: doc.designs,
                                    sizes: doc.sizes,
                                    request: {
                                        type: 'GET',
                                        url: 'http://localhost:3000/orders/' + doc._id
                                    }
                                }
                            })
                        });
                            })
                .catch(err =>{
                        res.status(500).json({
                            error: err
                        })
                });
};

module.exports={
    create_order,
    view_order,
}