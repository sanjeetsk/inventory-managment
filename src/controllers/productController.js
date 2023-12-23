// import path from 'path';
import ProductModel from '../models/productModel.js';

export default class ProductController{
    getProducts(req, res){
        let products = ProductModel.getAll();
        
        res.render("products", {products: products}) 
        // return res.sendFile(path.join(path.resolve(),'src','views','products.html'))
    }

    getAddProduct(req, res){
        return res.render("new-product", {errorMessage:null});
    }

    addNewProduct(req, res, next){

        ProductModel.add(req.body)
        let products = ProductModel.getAll();
        return res.render("products", {products: products}); 
    }
}