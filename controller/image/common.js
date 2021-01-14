const
  DOMAIN = process.env.DOMAIN;

module.exports = {
  postHandleImage: doc => {
    let {id, name, width, height} = doc,
      file = doc.file || {},
      originalname = file.originalname || '',
      extension = originalname.split('.')[1] || 'jpg';

    return {
      id, name, width, height,
      url: `http://${DOMAIN}/${name}-${width}x${height}.${extension}`
    };
  },
  commonImage404: res => {
    res.status(404);
    return res.send({message: 'Image object not found'});
  }
};
