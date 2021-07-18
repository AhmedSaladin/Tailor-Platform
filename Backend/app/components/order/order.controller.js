const  mongoose  = require('mongoose');
const userModel = require('../user/user.model');
const orderModel = require('./order.model');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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',
}
}));


// send email
/*const mailCustomer = (email)=>{
    transporter.sendMail({
                    to: email ,
                    from: 'Tailor@Tailor_shop.com',
                    subject: "Don't replay to this",
                    html: '<h1>Thank you for choosing us , your order is made</h1>'
                });
};*/





const create_order = (req , res , next )=>{
    console.log(req.body);
    const order = new orderModel({
        customer_id: req.body.customer_id,
        tailor_id: req.body.tailor_id,
        designs: req.body.designs,
        sizes: req.body.sizes, 
    });
    order.save().then(result =>{
        console.log(result);
        res.status(201).json();
        customer_mail= userModel.findById(result.customer_id);
        mailCustomer()

    }).catch(err=>{
        console.log(err);
        res.status(500).json({message: err.toString()})
    });
};


const view_order = (req , res , next )=>{
    // id ? tailor :cutomer
    // get order by customer id find({customerID:customer_id})
    // get order by tailor id find({tailorID:tailor_id})
    // get order by id findById
    orderModel.find()
              .then(docs =>{
                         res.status(200).json(docs);
                            })
                .catch(err =>{
                        res.status(500).json({
                            error: err
                        })
                });
};
const view_orderByTailor = (req , res , next )=>{
    orderModel.find({tailor_id:tailor_id})
              .then(docs =>{
                         res.status(200).json(docs);
                            })
                .catch(err =>{
                        res.status(500).json({
                            error: err
                        })
                });
};
const view_orderByCustomer = (req , res , next )=>{
    orderModel.find({customer_id:customer_id})
              .then(docs =>{
                         res.status(200).json(docs);
                            })
                .catch(err =>{
                        res.status(500).json({
                            error: err
                        })
                });
};
const view_orderByOrderId = (req , res , next )=>{
    orderModel.findById(req.params.order_id)
              .then(docs =>{
                         res.status(200).json(docs);
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
    view_orderByTailor,
    view_orderByCustomer,
    view_orderByOrderId,
}