const  mongoose  = require('mongoose');
const userModel = require('../user/user.model');
const tailorModel = require('../tailor/tailor.model');
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
        designs: req.body.design,
        customer_sizes: req.body. customer_sizes, 
    });
    order.save().then(result =>{
        console.log(result);
        res.status(201).json();
        // customer_mail= userModel.findById(result.customer_id);
        // mailCustomer()

    }).catch(err=>{
        console.log(err.toString());
        res.status(500).json({message: err.toString()})
    });
};

const view_order = (req , res , next )=>{
    // id ? tailor :cutomer
    // get order by tailor id find({tailorID:tailor_id})
    if(req.query.tailor_id){       
        const id = mongoose.Types.ObjectId(req.query.tailor_id);        
        orderModel.aggregate([
            { $match: {tailor_id:id} },
              {
                 $lookup: {
                    from: userModel.collection.name,
                    let: { order_item: "$customer_id" },
                    pipeline: [
                        { $match:
                            { $expr:
                                { $and:
                                [
                                    { $eq: [ "$_id",  "$$order_item" ] }
                                ]
                                }
                            }
                        },
                        { $project: { name: 1, _id:0} }
                    ],
                    as: 'customer'
                 }
              },
              {
                $unwind: "$customer",
              },
              ])
              .then((result) => {
                console.log(result);
                res.status(200).json(result);
              })
              .catch((error) => {
                console.log(error);
              });



    }
    // get order by customer id find({customerID:customer_id})
    else if(req.query.customer_id){
            const id = mongoose.Types.ObjectId(req.query.customer_id);
            orderModel.aggregate([
                { $match: {customer_id:id} },
                  {
                     $lookup: {
                        from: tailorModel.collection.name,
                        let: { order_item: "$tailor_id" },
                        pipeline: [
                            { $match:
                                { $expr:
                                    { $and:
                                    [
                                        { $eq: [ "$_id",  "$$order_item" ] }
                                    ]
                                    }
                                }
                            },
                            //{ $project: { orders: 0, _id: 0,isTailor: 0, password: 0,gender: 0, avatar: 0, sizes: 0 } }
                            { $project: { name: 1, } }
                        ],
              
                        as: 'tailor'
                     }
                  },
                  {
                    $unwind: "$tailor",
                  },
                  ])
                  .then((result) => {
                    console.log(result);
                    res.status(200).json(result);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
    
        
        }
 
    else{
        orderModel.aggregate([///join to get customer_name& tailo name
            {
                $lookup: {
                   from: userModel.collection.name,
                   localField: 'customer_id',
                   foreignField: '_id',
                   as: 'customer'
         
                }
             },
             {
               $unwind: "$customer",
             },
             {
                $lookup: {
                   from: tailorModel.collection.name,
                   localField: 'tailor_id',
                   foreignField: '_id',
                   as: 'tailor'
         
                }
             },
             {
               $unwind: "$tailor",
             },
             
            {   
                $project:{
                    designs:1,
                    status:1,
                    customer_sizes : 1,
                    customer_id:1,
                    tailor_id:1,    
                    customer_name : "$customer.name",
                    tailor_name : "$tailor.name",
                } 
            }
              ])
              .then((result) => {
                console.log(result);
                res.status(200).json(result);
              })
              .catch((error) => {
                console.log(error);
              });
    
    }    
};
const view_orderByTailor = (req , res , next )=>{
    const id = mongoose.Types.ObjectId(req.params.id);
    orderModel.aggregate([
        { $match: {tailor_id:id} },
        {
            $lookup: {
               from: userModel.collection.name,
               localField: 'customer_id',
               foreignField: '_id',
               as: 'customer'
     
            }
         },
         {
           $unwind: "$customer",
         },
         {
            $lookup: {
               from: tailorModel.collection.name,
               localField: 'tailor_id',
               foreignField: '_id',
               as: 'tailor'
     
            }
         },
         {
           $unwind: "$tailor",
         },
         
        {   
            $project:{
                comments:1,
                designs:1,
                status:1,
                customer_sizes : 1,
                customer_id:1,
                tailor_id:1,
                customer_name : "$customer.name",
                tailor_name : "$tailor.name",
            } 
        }
          ])
          .then((result) => {
            console.log(result);
            res.status(200).json(result);
          })
          .catch((error) => {
            console.log(error);
          });

};
const view_orderByCustomer = (req , res , next )=>{
    const id = mongoose.Types.ObjectId(req.params.id);
    orderModel.aggregate([
        { $match: {customer_id:id} },
        {
            $lookup: {
               from: userModel.collection.name,
               localField: 'customer_id',
               foreignField: '_id',
               as: 'customer'
     
            }
         },
         {
           $unwind: "$customer",
         },
         {
            $lookup: {
               from: tailorModel.collection.name,
               localField: 'tailor_id',
               foreignField: '_id',
               as: 'tailor'
     
            }
         },
         {
           $unwind: "$tailor",
         },
         
        {   
            $project:{
                _id:1,
                comments:1,
                designs:1,
                status:1,
                customer_sizes : 1,
                customer_id:1,
                tailor_id:1,
                customer_name : "$customer.name",
                tailor_name : "$tailor.name",
            } 
        }
          ])
          .then((result) => {
            console.log(result);
            res.status(200).json(result);
          })
          .catch((error) => {
            console.log(error);
          });



};
const view_orderByOrderId = (req , res , next )=>{
    const id = mongoose.Types.ObjectId(req.params.id);

    orderModel.aggregate([
        { $match: {_id:id} },
        {
            $lookup: {
               from: userModel.collection.name,
               localField: 'customer_id',
               foreignField: '_id',
               as: 'customer'
     
            }
         },
         {
           $unwind: "$customer",
         },
         {
            $lookup: {
               from: tailorModel.collection.name,
               localField: 'tailor_id',
               foreignField: '_id',
               as: 'tailor'
     
            }
         },
         {
           $unwind: "$tailor",
         },
         
        {   
            $project:{
                comments:1,
                designs:1,
                status:1,
                customer_sizes : 1,
                customer_name : "$customer.name",
                tailor_name : "$tailor.name",
                customer_id:1,
                tailor_id:1,
            } 
        }
          ])
          .then((result) => {
            console.log(result);
            res.status(200).json(result);
          })
          .catch((error) => {
            console.log(error);
          });
};

const delete_order = (req , res , next )=>{
    orderModel.findOneAndDelete({_id: req.params.id})
    .then(res.status(204).json({message: 'Order deleted'}))
    .catch(err=>{
        res.status(500).json({message: err.toString()})
    });
};

const updateStatus = (req, res) => {  
    // console.log(req.params.id)
    orderModel.findOneAndUpdate(
        { _id: req.params.id},
        { status: req.body.status } ,
        { new: true },
        (err, order) => {
            if (err) {
                return res.status(400).json({error: "Cannot update order status"});
            }
        res.json(order);
    });
};
const updateComments = (req, res) => {
  let comment=[];  
    // console.log(req.params.id)
    orderModel.findById(req.params.id)
    .then(result =>{
      comment=result.comments
      if(comment!==null)
        comment.unshift(req.body.comment)
        else
        comment=req.body.comment
      console.log(comment)
      orderModel.findOneAndUpdate(
            { _id: req.params.id},
            { comments:comment } ,
            { new: true },
            (err, order) => {
                if (err) {
                    return res.comment(400).json({error: "Cannot update order status"});
                }
            res.json(order.comments);
        });
        //res.status(200).json(result);
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
    delete_order,
    updateStatus,
    updateComments,
}