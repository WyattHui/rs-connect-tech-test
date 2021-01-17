const
  express = require('express'),
  {basicAuth} = require('./middleware/authenticate'),
  multer = require('multer'),
  upload = multer(),
  {
    deleteImageById,
    getImages,
    getImageById,
    greyscaleImage,
    resizeImage,
    rotateImage,
    uploadImage
  } = require('./controller/image'),
  router = express.Router(),
  imagesRouter = express.Router();

router.get('/ping', (req, res) => {
  res.send();
});
imagesRouter.get('/', getImages);
imagesRouter.get('/:id', getImageById);
imagesRouter.delete('/:id', basicAuth, deleteImageById);
router.use('/images', imagesRouter);
router.post('/upload', basicAuth, upload.single('fileData'), uploadImage);
router.get('/resize/:id', resizeImage);
router.put('/rotate/:id', rotateImage);
router.put('/greyscale/:id', greyscaleImage);

module.exports = router;
