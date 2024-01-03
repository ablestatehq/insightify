import { io } from 'socket.io-client';

// const socket = io('https://insightify-server.onrender.com')
const socket = io('https://be.ablestate.cloud/');
// const socket = io('https://insightify-admin.ablestate.cloud/api')

export default socket;