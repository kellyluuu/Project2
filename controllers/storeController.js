
const express = require('express');
const Product = require('../models/product');
const productSeed = require('../models/productSeed');
const storeRouter = express.Router();
require('dotenv').config()
const IMGBB_API_KEY = process.env.IMGBB_API_KEY




// Authorization Middleware
storeRouter.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user");
    }
  });

// CREATE SEED

storeRouter.get('/seed', (req, res) => {
    Product.deleteMany({}, (err, deletedProducts) => {
        Product.create(productSeed, (err, data) => {
            res.redirect('/store');
        });
    });
});





//INDEX 
storeRouter.get('/',(req,res)=>{
    Product.find({},(err, products)=>{
        res.render('index.ejs',{products},)
    })
})

const imgbbUploader = require("imgbb-uploader");

//NEW 
storeRouter.get('/new',(req,res)=>{
    res.render('new.ejs')
})











//CREATE
storeRouter.post('/',(req,res)=>{
    Product.create(req.body,(err, createdProduct)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.redirect('/store')
        }
    })
})

//SHOW
storeRouter.get('/:id',(req,res)=>{
    Product.findById(req.params.id, (err,product)=>{
        res.render('show.ejs', {product})
    })
})



//EDIT
storeRouter.get('/:id/edit',(req,res)=>{
    Product.findById(req.params.id,(err, editProduct)=>{
        res.render('edit.ejs',{editProduct})
    })
})



//UPDATE
storeRouter.put('/:id',(req,res)=>{
    req.body.price = parseFloat(req.body.price)
    Product.findByIdAndUpdate(req.params.id, req.body, (err,updateProduct)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.redirect(`/store/${req.params.id}`)
        }
    })
})

// //UPDATE AFTER BUY 
// storeRouter.put('/:id/:qty',(req,res)=>{
//     Product.findById(req.params.id,(err, editProduct)=>{
//     editProduct.description = req.params.qty
//     let buyArr = editProduct
//     cartArr.push(buyArr)
//     console.log(cartArr)
//     res.redirect('/store')        
// })
// })




//DELETE
storeRouter.delete('/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id, (err, deleteProduct)=>{
        res.redirect('/store')
    })
})


module.exports = storeRouter;