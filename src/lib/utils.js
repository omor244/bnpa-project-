import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const saveorupdateuser = async (userdata) => {


  const { data } = await axios.post('https://api.bnpa.bd/users', userdata)

  return data
}



export const Imageupload = async (imagedata) => {
  // 1. Safety check: If no data, return null
  if (!imagedata) return null;

  // 2. If it's already a URL string, don't upload again
  if (typeof imagedata === 'string') return imagedata;

  // 3. IMPORTANT: If it's an array (Gallery), we need to return it as is 
  // because your EditModal already loops through it.
  if (Array.isArray(imagedata)) return imagedata;

  // 4. If it's a File object, proceed with upload
  const fromdata = new FormData();
  fromdata.append('image', imagedata);

  try {
    const response = await axios.post(`https://api.bnpa.bd/upload-endpoint`, fromdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // The backend we built returns { url: "..." }
    return response.data.url;
  } catch (error) {
    console.error("Image Upload Error:", error);
    return null;
  }
};


