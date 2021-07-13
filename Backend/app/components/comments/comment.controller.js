const Comment = require('./comment.model');

const get_comment=(req,res)=>{
    if(req.query.tailor_id){console.log(req.query)
        Comment.find({tailor_id:req.query.tailor_id})
        .populate('customer_id','name')
        .exec((err, result) =>{
            if(err){
               console.log(err)
            }else{
             res.status(200).json(result)
                console.log(result)
            }
        })  
    }
    else if(req.query.order_id){console.log(req.query)
        Comment.find({order_id:req.query.order_id})
        .populate('customer_id','name')
        .exec((err, result) =>{
            if(err){
               console.log(err)
            }else{
             res.status(200).json(result)
                console.log(result)
            }
        })
    }else{
        Comment.find({})
        .populate('customer_id','name')
       // .populate('tailor_id')
        .exec((err, result) =>{
            if(err){
               console.log(err)
            }else{
             res.status(200).json(result)
                console.log(result)
            }
        })
        // .then((result)=>{
        //     res.status(200).json(result)
        // })
        // .catch((err)=>{
        //     res.status(500).json(err)
        // })
    }
}

const creat_comment=(req,res)=>{
    let {body} = req;
  const comment = new Comment(body)
  comment.save()
  .then((result)=>{res.status(201).json(result)})
  .then(()=>{
      ////find tailor by id and update rate
      /**model tailor include rate ?
       * get all comment by tailor id 
       * sum/number
       * find tailor and update
       */
    console.log("tailor id** "+body.tailor_id)
  })
  .catch((err)=>{
      res.status(400).json(err)
    })
}

const get_comments_by_id=(req,res)=>{
    Comment.findById(req.params.id)
    .then((result)=>{
        /*********add customer name******** */
        res.status(200).json(result)
    })
    .catch((err)=>{console.log(err)})
}


module.exports={
    get_comment,
    creat_comment,
    get_comments_by_id
}