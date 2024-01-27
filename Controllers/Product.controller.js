const mongoose = require('mongoose')
const createError = require('http-errors')

const Product = require('../Models/Product.model')

module.exports = {
    getAllProducts : async(req, res, next)=>{
        try {
            const result = await Product.find({}, {__v: 0});
            res.send(result)
            
        } catch (error) {
            console.log(error.message)
        }
    
    },

    findProductById : async(req, res, next)=>{
        try {
            const {id} = req.params;
            const product = await Product.findById(id);
            // const product = await Product.findOne({_id: id});
            if(!product){
                throw createError(404, 'Product does not exist');
            }
            res.send(product)
            
        } catch (error) {
            // console.log(error.message)
            if (error instanceof mongoose.CastError){
                next(createError(400, "invalid Product id"))
                return;
            }
            next(error);
        }
        
    },

    createNewProduct : async(req, res, next)=>{
        try {
            const product = new Product(req.body);
            const result = await product.save();
            res.send(result)
            
        } catch (error) {
            console.log(error.message)
            if(error.name === 'ValidationError'){
                next(createError(422, error.message))
                return
            }
            next(error);
            
        }
       
    },

    updateProductById : async (req, res, next)=>{
        try {
            const {id} = req.params;
            const updates = req.body;
            const options = {new: true};
    
            const result = await Product.findByIdAndUpdate(id, updates, options);
            if(!result){
                throw createError(404, 'Product does not exist')
    
            }
            res.send(result);        
            
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError){
                next(createError(400, "invalid Product id"))
                return;
            }
            next(error);
            
        }
        
    },

    deleteProductById : async(req, res, next)=>{
        try {
            const {id} = req.params;
            const result = await Product.findByIdAndDelete(id);
            if (!result){
                throw createError(404, 'product does not exist')
            }
            
            res.send(result)
            
        } catch (error) {
            if(error instanceof mongoose.CastError){
                next(createError(400, 'invalid product id'))
    
            }        
            next(error)
        }
        
    }
}