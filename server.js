const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Umesh:Umesh1488@cluster0.vgq9dzi.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('MongoDb connected')
    app.listen(3000, () => {
        console.log('Node API app is Running on port 3000')
    })
    
})
.catch((e) => {
    console.log(e)
})   
//routes 
app.get('/', (req,res) => {
    res.send('Hlo Node Api are u ')
})

