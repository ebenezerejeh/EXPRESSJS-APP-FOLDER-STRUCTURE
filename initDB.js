const mongoose = require('mongoose')





module.exports = () => {

    mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
}
   
).then(()=>{
    console.log('mongodb connected')
}).catch(err=> console.log(err.message));


mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to db...')
});


mongoose.connection.on('error', (err)=>{
    console.log(err.message)
    
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongosse connection is disconnected')
});

process.on('SIGINT', ()=>{
    mongoose.connection.close();
    process.exit(0);
})



}


