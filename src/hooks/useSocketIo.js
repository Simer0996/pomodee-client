import { io } from 'socket.io-client';

const socket = io(
  process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://pomodee-server.herokuapp.com/',
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

socket.on('disconnect', (reason) => {
  if (reason === 'ping timeout') {
    const onlineUsersContainer = document.getElementById('online-users');
    onlineUsersContainer.innerHTML = '';
  }
});

const useSocketIo = () => {
  const sendSignal = (name, message) => {
    socket.emit(name, message);
  };

  const receiveSignal = (name, callback) => {
    socket.on(name, callback);
  };

  return {
    sendSignal,
    receiveSignal,
    id: socket.id
  };
};

export default useSocketIo;
