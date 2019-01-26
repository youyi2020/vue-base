import {baseUrl} from './../config/baseUrl'
import {instance as axios} from './interceptors'


export const nluDialogRequeset = (refText,env)=> {
  let params = {
    refText,
    env
  }
  return new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/dialog/nlu`,params).then(res => {
      if(res.data.code === '200'){
        resolve(res.data.result);
      }else {
        reject(res);
      }
    }).catch(err => {
      reject(err);
    });
  })
};