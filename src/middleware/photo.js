const multer = require("multer")
// const path = require('path');

const storage = multer.diskStorage({
    filename: function (res, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage, 
    limits: { fileSize: 10 * Math.pow(1024, 4) },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jfif') {
            req.isFileValid = true
            cb(null, true)
        } else {
            req.isFileValid = false
            req.isFileValidMessage = 'Please input image file (JPG/PNG/JPEG)'
            cb(null, false)
        }
    }
})

module.exports = upload