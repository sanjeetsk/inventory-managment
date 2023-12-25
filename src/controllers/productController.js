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

    postaddProduct(req, res, next){
        const { name, desc, price } = req.body;
        const imageUrl = "images/" + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        let products = ProductModel.getAll();
        return res.render("products", {products: products}); 
    }

    getUpdateProductView(req, res){
        //if product exist then return view
        const id = req.params.id;
        console.log("id", id);
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render('update-product',{
                product: productFound,
                errorMessage: null
            })
        }
        else{
            res.status(401).send('Product Not Found');
        }
    }

    postUpdateProduct(req, res, next){
        ProductModel.update(req.body)
        console.log("update",req.body);
        let products = ProductModel.getAll();
        return res.render("products", {products: products}); 
    }

    deleteProduct(req, res){
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send('Product Not Found');
        }
        ProductModel.delete(id);
        let products = ProductModel.getAll();
        return res.render("products", { products });
    }
}