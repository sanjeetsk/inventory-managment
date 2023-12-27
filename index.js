import express from 'express';
import ProductController from './src/controllers/productController.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import validateRequest from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/userController.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/last-visit.middleware.js';

const server = express();

//parse form data
server.use(express.urlencoded({ extended: true }));

server.use(cookieParser());
// server.use(setLastVisit);          //it will set cookie for every request

server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// setup view engine setting
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src', 'views'));

server.use(ejsLayouts);

//create an instance of ProductController
const productController = new ProductController();
const userController = new UserController();

server.get('/', setLastVisit, auth, productController.getProducts);
server.get('/new', auth, productController.getAddProduct);
server.get('/update-product/:id', auth, productController.getUpdateProductView);
server.get('/register', userController.getRegister);
server.get('/login', userController.getLogin);
server.post('/delete-product/:id', auth, productController.deleteProduct);
server.post('/', auth, uploadFile.single('imageUrl'), validateRequest, productController.postaddProduct);
server.post('/update-product', auth, productController.postUpdateProduct);
server.post('/register', userController.postRegister);
server.post('/login', userController.postLogin);

server.get('/logout', userController.logout);

server.use(express.static('./src/views'))
server.use(express.static('public'));

server.listen(3000,()=>{
    console.log("Server is running on port 3000");
});