if (typeof Image == 'undefined')
{
    // web worker's do not have Image objects

    new Exception.ValueUndefined();
}

/**
 * Converts image to raw pixels data and returns it in raw image data.
 */
Image.prototype.toRawImage = function()
{
    var _this = this;

    var canvas = document.createElement('canvas');
    canvas.width = _this.width;
    canvas.height = _this.height;
    
    var context = canvas.getContext('2d');
    context.drawImage(_this, 0, 0, _this.width, _this.height);

    var rawImage = new namespace.core.RawImage(_this.src);
    rawImage.pixels = context.getImageData(0, 0, _this.width, _this.height).data;
    rawImage.width = _this.width;
    rawImage.height = _this.height;
   
    return rawImage;
};

/**
 * Converts image to PNG URL string.
 */
Image.toPNGString = function(buffer, width, height)
{
	var canvas = document.createElement('canvas');
	canvas.width = width;
    canvas.height = height;
    
    var imagedata = new ImageData(new Uint8ClampedArray(buffer), width, height);
    canvas.getContext('2d').putImageData(imagedata, 0, 0);
    
	return canvas.toDataURL('image/png');
};