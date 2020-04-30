const multer = require('multer')
const path = require('path')
const crypto = require('crypto')


module.exports = {
    storage: multer.diskStorage({
        dest: path.resolve(__dirname, '..', '..', 'uploads'),
        destination: (req, file, cb)=>{
            cb(null, (__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb)=>{
            file.originalname =  file.originalname.split(' ').join('+');
            crypto.randomBytes(16,(error, hash)=>{
                req.key = hash.toString('hex') + Date.now() + '-'+file.originalname
                cb(null, req.key)
            })
        }
    })
}