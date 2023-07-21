import axios from 'axios';

export  const LoginData = async (formData, url) => {
  try {
    const response = await axios.post(url, formData);
    return response;
  } catch (error) {
    return error
  }
};

export  const postData = async (formData, url,ACCESS_TOKEN) => {
  try {
    const response = await axios.post(url, formData,{
      headers:{
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    return response;
  } catch (error) {
    return error
  }
};

export  const patchData = async (formData, url,ACCESS_TOKEN) => {
  try {
    const response = await axios.patch(url, formData,{
      headers:{
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    return response;
  } catch (error) {
    return error
    // throw new Error('Failed to fetch data from the API.');
  }
};

// export default fetchData;

export const fetchData = async (url,ACCESS_TOKEN) => {
  try{
    const res = await axios.get(url,{
      headers:{
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    })
    return res
  }catch(err){
    return err
  }
};

export const deleteData = async (url,ACCESS_TOKEN) => {

  try{
    const res = await axios.delete(url,{
      headers:{
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    })
    return res
  }catch(err){
    return "error"
  }
};
