import {io} from 'socket.io-client';
import {environments} from '../constants/environments';

export const socket = io(`${environments.BASE_URL}`);