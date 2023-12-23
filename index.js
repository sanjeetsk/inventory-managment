import express from 'express';
import ProductController from './src/controllers/productController.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import validateRequest from './src/middlewares/validation.middleware.js';

const server = express();

//parse form data
server.use(express.urlencoded({ extended: true }));

// setup view engine setting
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));

server.use(ejsLayouts);

//create an instance of ProductController
const productController = new ProductController();

server.get('/', productController.getProducts);
server.get('/new', productController.getAddProduct);
server.get('/update-product/:id', productController.getUpdateProductView);
server.post('/delete-product/:id', productController.deleteProduct);
server.post('/', validateRequest ,productController.postaddProduct);
server.post('/update-product', productController.postUpdateProduct);

server.use(express.static('./src/views'))
server.use(express.static('public'));

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});