const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const { Readable } = require("stream")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const cloudinaryUploadImage = async (fileToUpload, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      fileToUpload,
      { resource_type: "auto", folder: `Ebuy/${folder}` },
      (err, result) => {
        // console.log("result : ", result)
        resolve({ url: result.secure_url })
      }
    )
  })
}

const cloudinaryUploadImageStream = async (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const writeStream = cloudinary.uploader.upload_stream(
      { folder: `Ebuy/${folder}`, resource_type: "auto" },
      (err, result) => {
        if (err) reject(err)
        // console.log("result : ", result)
        resolve({ url: result.secure_url })
      }
    )
    const readStream = new Readable({
      read() {
        this.push(buffer)
        this.push(null)
      },
    })
    readStream.pipe(writeStream)
  })
}

// multer-storage-cloudinary

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Dev",
  },
})

const uploadCloudinaryMulterStorage = multer({ storage: storage })

module.exports = {
  cloudinaryUploadImage,
  cloudinaryUploadImageStream,
  uploadCloudinaryMulterStorage,
}
