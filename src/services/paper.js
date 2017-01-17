import {request} from '../angler';
import qs from 'qs';

const URL_PAPERS='';

export async function query(params) {
  return request(URL_PAPERS+'?'+`${qs.stringify(params)}`);
}

export async function save(params) {
  delete params.payload.showTitleModal;
  delete params.payload.edition;
  return request(URL_PAPERS,{
    credentials: 'include',
    method: params.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(params.payload)
  });
}

export async function remove(params) {
  return request(URL_PAPERS,{
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(params)
  });
}

