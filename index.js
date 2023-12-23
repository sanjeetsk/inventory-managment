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
server.post('/', validateRequest ,productController.addNewProduct)

server.use(express.static('./src/views'))

server.listen(3000);