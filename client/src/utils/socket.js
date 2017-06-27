import io from 'socket.io-client';
import config from '../serverConfig'
const socket = io(config.socketURL);

export default socket 