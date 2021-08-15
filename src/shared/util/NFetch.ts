import nodeFetch from 'node-fetch';
import { BadRequestException } from '@nestjs/common';
import { compact } from './format';

const request = (method, noMsg = false) => async (url, data = {}) => {
  const keys = Object.keys(data);
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const res = await (async () => {
    if (method === 'GET') {
      return !keys.length ? await nodeFetch(url, config) : await nodeFetch(`${url}?${ compact(keys.map(key => data[key] ? `${key}=${data[key]}` : '')).join('&') }`, config);
    } else {
      return await nodeFetch(url, {
        ...config,
        body: JSON.stringify(data)
      });
    }
  })().catch(e => {
    console.error(e);
    if (!noMsg) throw new BadRequestException(e);
  });

  return await res.json();
};

export default { get: request('GET'), post: request('POST'), put: request('PUT'), noMsgGet: request('GET', true), noMsgPost: request('POST', true) };
