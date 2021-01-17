module.exports = (deg, image) => {
  // Restore simple rotate of jimp v0.5.6
  // https://github.com/oliver-moran/jimp/issues/821

  if (deg % 90 !== 0) {
    return image;
  }

  let steps = Math.round(deg / 90) % 4;
  steps += steps < 0 ? 4 : 0;

  if (steps === 0) {
    return image;
  }

  const srcBuffer = image.bitmap.data;
  const len = srcBuffer.length;
  const dstBuffer = Buffer.allocUnsafe(len);

  let tmp;

  if (steps === 2) {
    // Upside-down
    for (let srcOffset = 0; srcOffset < len; srcOffset += 4) {
      tmp = srcBuffer.readUInt32BE(srcOffset, true);
      dstBuffer.writeUInt32BE(tmp, len - srcOffset - 4, true);
    }
  } else {
    // Clockwise or counter-clockwise rotation by 90 degree
    rotate90degrees(image.bitmap, dstBuffer, steps === 1);

    tmp = image.bitmap.width;
    image.bitmap.width = image.bitmap.height;
    image.bitmap.height = tmp;
  }

  image.bitmap.data = dstBuffer;

  return image;

  function rotate90degrees(bitmap, dstBuffer, clockwise) {
    const dstOffsetStep = clockwise ? -4 : 4;
    let dstOffset = clockwise ? dstBuffer.length - 4 : 0;

    let tmp;
    let x;
    let y;
    let srcOffset;

    for (x = 0; x < bitmap.width; x++) {
      for (y = bitmap.height - 1; y >= 0; y--) {
        srcOffset = (bitmap.width * y + x) << 2;
        tmp = bitmap.data.readUInt32BE(srcOffset, true);
        dstBuffer.writeUInt32BE(tmp, dstOffset, true);
        dstOffset += dstOffsetStep;
      }
    }
  }
};
