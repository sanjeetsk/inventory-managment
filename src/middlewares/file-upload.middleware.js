import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename :(req, file, cb) =>{
        const name = Date.now() + '_' + file.originalname;
        cb(null, name);  // The image name will be the current timestamp_filename
    }
})

export const uploadFile = multer({
    storage: storageConfig,
})