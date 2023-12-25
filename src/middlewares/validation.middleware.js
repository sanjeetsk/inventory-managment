import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
    // validate data
    // const {name, price, imageUrl} = req.body;
    // let error = []
    // if(!name || name.trim() == ''){
    //     error.push("Name is required");
    // }
    // if(!price|| parseFloat(price) < 1){
    //     error.push("Price must be positive value");
    // }
    // try{
    //     const validUrl = new URL(imageUrl)
    // }
    // catch(err){
    //     error.push('URL is invalid');
    // }

    // express validator
    //1. set up rules for validation
    const rules = [
        body('name')
            .notEmpty()
            .withMessage('Name is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price should be positive value'),
        // body('imageUrl')
        //     .isURL()
        //     .withMessage('Invalid url'),
        body.apply('imageUrl').custom((value, {req}) =>{
            if(!req.file){
                throw new Error('Image is required');
            }
            return true;
        })
    ];

    //2. run those rules
    await Promise.all(rules.map(rule => rule.run(req)));

    //3. check if there are any errors after running the rules.
    let validationError = validationResult(req);

    //4. if error, then return the error message
    if(!validationError.isEmpty()){
        return res.render("new-product", {
            errorMessage: validationError.array()[0],
        });
    }

    next();
}

export default validateRequest;