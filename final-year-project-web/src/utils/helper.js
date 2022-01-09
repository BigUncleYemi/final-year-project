import Axios from "axios";
import * as actionTypes from "../redux/constants/index";

function generateUUID() {
  let d = new Date().getTime();
  
  if( window.performance && typeof window.performance.now === "function" ) {
    d += performance.now();
  }
  
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    // eslint-disable-next-line
    return (c==='x' ? r : (r&0x3|0x8)).toString(16);
  });

  return uuid;
}

async function processImageToCloudinary(
  file,
  error,
  progress,
  cloudName,
  unsignedUploadPreset
) {
  // `fieldName` and `meta` are not used for now${moment().format('DDMMMYYYY')}

  try {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const data = new FormData();
    const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);

    data.append("upload_preset", unsignedUploadPreset);
    data.append("tags", ["browser_upload", userId]);
    data.append("file", file);
    let res = await Axios.post(`${url}`, data, {
      onUploadProgress: (progressEvent) => {
        progress(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    });
    return res.data.url;
  } catch (err) {
    error(err);
  }
};

export {
  generateUUID,
  processImageToCloudinary
};