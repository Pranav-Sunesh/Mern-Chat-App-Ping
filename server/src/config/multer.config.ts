import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, path.join(__dirname, '../../public/images/temp'));
    },
    filename: function(req, res, cb){
        cb(null, 'temp.jpg');
    }
});
export const upload = multer({storage}); 