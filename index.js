const express = require('express');
const createError = require('http-errors')
const dotenv = require('dotenv').config()


const app = express();

app.use(express.json());

//Initialize DB

require('./initDB')();

const ProductRoute = require('./Routes/Products.route')


//MIDDLEWARE FOR PRODUCTS ROUTE
app.use('/products', ProductRoute)

//MIDDLEWARE NOT HANDLED BY PRODUCT ROUTE
app.use((req, res, next)=>{
    next(createError(404, 'not foundd'));
});

//ERROR HANDLER FOR ALL ERRORS
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });

})


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("Server started on port " + PORT +"...")
});