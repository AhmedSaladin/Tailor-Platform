const { Mongoose } = require('mongoose');
const orderModel = require('./order.model');



const create_order = (req , res , next )=>{
    const order = new orderModel({
        _id: Mongoose.Types.ObjectId(),
        customerID: req.body.customerID,
        tailorID: req.body.tailorID,
        designs: req.body.designs,
        sizes: req.body.sizes, 
    });
    order.save().then(result =>{
        console.log(result);
        res.status(201).json(result);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};


module.exports={
    create_order,
}