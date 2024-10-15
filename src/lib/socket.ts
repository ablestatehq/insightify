import {io} from 'socket.io-client';
import {environments} from '../constants/environments';

export const createClientSocket = (jwt?: string) => {
  if (jwt) {
    return io(`${environments.BASE_URL}`, {
      auth: {
        strategy: 'jwt',
        token: jwt,
      }
    })
  }
  return io(`${environments.BASE_URL}`);
}