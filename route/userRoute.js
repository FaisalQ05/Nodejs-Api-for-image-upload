const express = require("express")
const {
  uploadImage,
  uploadSingleImageUsingMemory,
  uploadMultipleImageUsingMemory,
  uploadByUsingCloudinaryMulterStorage,
} = require("../controller/userController")
const {
  uploadPhotoMulter,
  productImageResize,
} = require("../middlerware/uploadImages")
const {
  uploadPhotoMulterMemorySingle, uploadPhotoMulterMemoryMultiple,
} = require("../middlerware/uploadImagesMemoryStorage")
const { uploadCloudinaryMulterStorage } = require("../utils/cloudinary")
const router = express.Router()

router.post(
  "/upload",
  uploadPhotoMulter.array("images", 2),
  productImageResize,
  uploadImage
)

router.post(
  "/uploadSingleImageMemory",
  uploadPhotoMulterMemorySingle.single("image"),
  uploadSingleImageUsingMemory
)

router.post(
  "/uploadMultipleImagesMemory",
  uploadPhotoMulterMemoryMultiple.array("images"),
  uploadMultipleImageUsingMemory
)

router.post(
  "/uploadCloudinaryMulterStorage",
  uploadCloudinaryMulterStorage.single('pic'),
  uploadByUsingCloudinaryMulterStorage
)

module.exports = router
