import axios from 'axios'

export const IMAGE_PREFIX = 'jakai-image'

export const getImage = (image) => {
    try {
      const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
      return img;
    } catch {
      return null;
    }
};

export const deleteFile = (file, imagePrefix) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deleteFile/${IMAGE_PREFIX}`, {
        params: file
      })
      .then(() => 
        {return}
      )
      .catch((err) => err && console.log(err));
};

export const getUploadParams = ({ meta }) => {
    return { url: `${process.env.REACT_APP_BACKEND_URL}/fileUpload/${IMAGE_PREFIX}` };
};