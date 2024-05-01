const express = require('express');
const app = express();
const Product = require('./model/product');
const mongoose = require('mongoose');
const multer = require('multer');
app.use(express.json());
const ImageModel = require('./image.model');


mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://Umesh:Umesh1488@cluster0.vgq9dzi.mongodb.net/My-Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('MongoDb connected')
    app.listen(3000, () => {
        console.log('Node API app is Running on port 3000')
    })
    
})
.catch((e) => {
    console.log(e)
})   

// Storage 

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: Storage
}).single('testImage')





//routes 
app.get('/products', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    }
    catch {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.post('/upload', (req,res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new ImageModel({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType:'image/jpg'
                }
            })
            newImage.save()
            .then(() => {
                res.send('Successfully Uploaded')
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
})

app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: `can not find any product with ID ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct)
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


app.post('/product', async (req, res) => {
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);
   }
   catch(error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
   }
})

app.delete('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            return res.status(404).json({message: `can not find any product with ID ${id}`})
        }
        const deleteProduct = await Product.findById(id);
        res.status(200).json(deleteProduct)
    }
    catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


