export default class ProductModel {
    constructor(_id, _name, _desc, _price, _imageUrl) {
        this.id = _id
        this.name = _name
        this.desc = _desc
        this.price = _price
        this.imageUrl = _imageUrl
    }

    static getAll() {
        return products;
    }

    static add(productObj) {
        let newProduct = new ProductModel(
            products.length + 1, 
            productObj.name, 
            productObj.desc,
            productObj.price, 
            productObj.imageUrl
        )
        products.push(newProduct);
    }

    static update(productObj){
        const index = products.findIndex((p) => p.id == productObj.id);
        products[index] = productObj;
    }

    static getById(id){
        return products.find(p => p.id == id);
    }

    static delete(id){
        const index = products.findIndex(p => p.id == id);
        products.splice(index,1);
    }
}

const products = [
    new ProductModel(
        1,
        "Bhagavad Gita: Yatharoop",
        "A holy book of hindus",
        494,
        "https://cdn.exoticindia.com/images/products/original/books-2017/nan284.jpg"
    ),
    new ProductModel(
        2,
        "Atomic Habbits",
        "A supremely practical and useful book.",
        551,
        "https://shorturl.at/qzNV0"
    ),
    new ProductModel(
        3,
        "The Psychology of Money",
        "The mindset and behaviors that influence financial decisions.",
        303,
        "https://images.blinkist.io/images/books/60140e9d6cee070007f4833a/1_1/470.jpg"
    )
]