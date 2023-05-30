const multer = require("multer")
const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

const multerStorage = new multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(
      {
        message: "unsupported File format",
      },
      false
    )
  }
}

const uploadPhotoMulterMemorySingle = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 500000, files: 1 },
})

const uploadPhotoMulterMemoryMultiple = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 500000, files: 3 },
})

// const productImageResize = async (req, res, next) => {
//   // console.log("productImageResize : ", req.files)
//   if (!req.files) return next()
//   req.body.images = []
//   await Promise.all(
//     req.files.map(async (file) => {
//       await sharp(file.path)
//         .resize(900, 900)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/images/products/${file.filename}`)
//       req.body.images.push(`public/images/products/${file.filename}`)

//       fs.unlinkSync(`public/images/${file.filename}`)
//     })
//   )
//   next()
// }

// const blogImageResize = async (req, res, next) => {
//   if (!req.files) return next()
//   await Promise.all(
//     req.files.map(async (file) => {
//       await sharp(file.path)
//         .resize(300, 300)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/images/blogs/${file.filename}`)
//       //   fs.unlinkSync(`public/images/blogs/${file.filename}`)
//     })
//   )
//   next()
// }

module.exports = {
  uploadPhotoMulterMemorySingle,
  uploadPhotoMulterMemoryMultiple,
}
