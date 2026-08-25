import express from 'express'
import path from 'path'
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },

    filename: (req, file, callback) => {
        const extname = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
})

const filterFiles = (req, file, callback) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png||image\/webp/;

    const extname = path.extname(file.originalname);
    const mimetype = file.mimetype;

    if(filetypes.test(extname) && mimetypes.test(mimetype)) {
        callback(null, true);
    } 
    else {
        callback(new Error('Images only!'), false);
    }
}

const upload = multer({storage, filterFiles})
const singleImageUpload = upload.single('image');

router.post('/', (req, res) => {
    singleImageUpload(req, res, (err) => {
        if(err) {
            res.status(400).send({message: err.message});
        }
        else if (req.file) {
            res.status(200).send({
                message: 'Image uploaded successfully', 
                image: `/${req.file.path}`,
            });
        }
        else {
            res.status(400).send({message: 'No image uploaded'});
        }
    })
})

// Controllers



// Middlewares

//* Routes


export default router;