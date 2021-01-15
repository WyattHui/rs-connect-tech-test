const
  DOMAIN = process.env.DOMAIN,
  createImageKey = doc => {
    return `${doc.name}-${doc.width}x${doc.height}.${doc.fileExtension}`;
  };

module.exports = {
  createImageKey,
  postHandleImage: doc => {
    let {id, name, width, height} = doc;

    return {
      id, name, width, height,
      url: `http://${DOMAIN}/${createImageKey(doc)}`
    };
  },
  commonImage404: res => {
    res.status(404);
    return res.send({message: 'Image object not found'});
  }
};
