const {
  cloudinaryUploadImage,
  cloudinaryUploadImageStream,
} = require("../utils/cloudinary")
const fs = require("fs")
const cloudinary = require("cloudinary").v2
const DataURI = require("datauri/parser")
const path = require("path")
const sharp = require("sharp")
const { Readable } = require("stream")

// const uploadImage = async (req, res) => {
//   console.log(req.body.images)
//   const uploader = (path) => cloudinaryUploadImage(path, "products")
//   const urls = []
//   const files = req.files
//   for (const file of files) {
//     const { path } = file
//     const newpath = await uploader(path)
//     console.log(newpath)
//     urls.push(newpath)
//     // fs.unlinkSync(path)
//   }
//   const images = urls.map((file) => {
//     return file
//   })
//   res.json(images)
// }

const uploadImage = async (req, res) => {
  console.log(req.body.images)
  console.log(req.files)
  const uploader = (path) => cloudinaryUploadImage(path, "products")
  const urls = []
  const files = req.body.images
  for (const file of files) {
    console.log(file)
    const newpath = await uploader(file)
    console.log(newpath)
    urls.push(newpath)
    fs.unlinkSync(file)
  }
  const images = urls.map((file) => {
    return file
  })
  res.json(images)
}

//by using memory

// 1 -- By using datauri package

// const uploadSingleImageUsingMemory = async (req, res) => {
//   console.log(req.file)
//   //   console.log(req.files)
//   const bufferResize = await sharp(req.file.buffer)
//     .resize(900, 900)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toBuffer()
//   //   console.log(bufferResize)
//   let dUri = new DataURI()
//   //   console.log(path.extname(req.file.originalname))
//   dUri.format(path.extname(req.file.originalname).toString(), bufferResize)
//   let data = await cloudinaryUploadImage(dUri.content, "products")
//   res.json(data)
// }

// 2 -- by using stream

// const uploadSingleImageUsingMemory = async (req, res) => {
//   console.log(req.file)
//   //   console.log(req.files)
//   const bufferResize = await sharp(req.file.buffer)
//     .resize(900, 900)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toBuffer()
//   // const stream = cloudinary.uploader.upload_stream(
//   //   { folder: `Ebuy/faisal`, resource_type: "auto" },
//   //   (err, result) => {
//   //     // console.log("result : ", result)
//   //     return res.json({ URL: result.secure_url })
//   //   }
//   // )
//   // bufferToStream(bufferResize).pipe(stream)

// //   //by using custom function
// //   const data = await cloudinaryUploadImageStream(bufferResize, "aa")
// //   res.json(data)
// }

//3 -- By converting buffer to base64
const uploadSingleImageUsingMemory = async (req, res) => {
  console.log(req.file)
  //   console.log(req.files)
  const bufferResize = await sharp(req.file.buffer)
    .resize(900, 900)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toBuffer()
  const b64 = Buffer.from(bufferResize).toString("base64")
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64
  const cldRes = await cloudinaryUploadImage(dataURI, "bb")
  res.json(cldRes)
}

// 4 - upload By Using Cloudinary Multer Storage (package)
const uploadByUsingCloudinaryMulterStorage = async (req, res) => {
  return res.json({ picture: req.file.path })
}

const uploadMultipleImageUsingMemory = async (req, res) => {
  console.log(req.files)
  const uploader = (path) => cloudinaryUploadImage(path, "prd")
  const urls = []
  for (const file of req.files) {
    // console.log(file.buffer)
    const bufferResize = await sharp(file.buffer)
      .resize(900, 900)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer()
    let dUri = new DataURI()
    dUri.format(path.extname(file.originalname).toString(), bufferResize)
    // console.log(dUri.mimetype)
    let newPath = await uploader(dUri.content)
    console.log(newPath)
    urls.push(newPath)
  }
  res.json(urls)
}

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer)
      this.push(null)
    },
  })
  return readable
}

module.exports = {
  uploadImage,
  uploadSingleImageUsingMemory,
  uploadMultipleImageUsingMemory,
  uploadByUsingCloudinaryMulterStorage
}
