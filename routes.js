const
  express = require('express'),
  pjson = require('./package.json'),
  {basicAuth} = require('./middleware/authenticate'),
  multer = require('multer'),
  upload = multer(),
  {
    deleteImageById,
    getImages,
    getImageById,
    greyscaleImage,
    invertImage,
    resizeImage,
    rotateImage,
    uploadImage
  } = require('./controller/image'),
  router = express.Router(),
  imagesRouter = express.Router();

router.get('/ping', (req, res) => {
  res.send();
});
router.get('/version', (req, res) => {
  res.send(pjson.version);
});
imagesRouter.get('/', getImages);
imagesRouter.get('/:id', getImageById);
imagesRouter.delete('/:id', basicAuth, deleteImageById);
router.use('/images', imagesRouter);
router.post('/upload', basicAuth, upload.single('fileData'), uploadImage);
router.get('/resize/:id', resizeImage);
router.put('/rotate/:id', rotateImage);
router.put('/greyscale/:id', greyscaleImage);
router.put('/invert/:id', invertImage);

module.exports = router;
