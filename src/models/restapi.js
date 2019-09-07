import axios from 'axios';
import {
  baseurl
} from '../../app.json';
import { GetUser } from '../lib';
import AsyncStorage from '@react-native-community/async-storage';
// .. get request
const GET = async (url, options, extra) => {

  let requestURL = `${baseurl}${url}`;
  let headers = {
    lang: "en",
    client_id: 2
  };

  if (extra && extra.authenticationUser) {
    const token = await GetUser();
    headers.Authorization = `Bearer ${token}`;
  }

  const lang = await AsyncStorage.getItem('lang');
  if (requestURL.includes('?')) {
    requestURL += `&lang=${lang}`;
  } else {
    requestURL += `?lang=${lang}`;
  }

  if (__DEV__){
    console.log(`[${requestURL}]`);
    console.log(headers);
  }

  axios
    .get(requestURL, {
      headers: headers
    })
    .then(response => {
      if (options.success) {
        options.success(response.data);
      }
    })
    .catch(error => {

      if (options.error) {
        options.error(error);
      }
    });
}

// .. post request
const POST = async(url, params, options, extra) => {
  let headers = {
    lang: "en",
    client_id: 2
  };
  let requestURL = `${baseurl}${url}`;

  if (extra && extra.authenticationUser) {
    const token = await GetUser();
    headers.Authorization = `Bearer ${token}`;
  }

  // const lang = await AsyncStorage.getItem('lang');
  // if (requestURL.includes('?')) {
  //   requestURL += `&lang=${lang}`;
  // } else {
  //   requestURL += `?lang=${lang}`;
  // }

  if (__DEV__){
    console.log(params);
    console.log(`[${requestURL}]`);
  }

  axios
    .post(requestURL, params, {
      headers: headers
    })
    .then(response => {
      if (options.success) {
        try {
          const { data } = response;
          options.success(data);
        } catch(error){}
      }
    })
    .catch((error) => {
      console.log('[Error in request] : ', error.response);

      if (options.error) {
        options.error(error, error.response);
      }
    });
}

export { GET, POST };