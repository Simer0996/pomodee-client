import React, { useContext, useEffect, useState } from 'react';
import useSocketIo from '../../hooks/useSocketIo';
import Layout from '../../components/Layout';
import PomodeeTimer from '../../components/PomodeeTimer';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';

import './styles.css';
import OnlineUsers from './OnlineUsers';

const Container = styled.div`
  display: flex;
  .singed-out-pomodee-timer {
    transform: translateX(5%);
  }
  .singed-in-pomodee-timer {
    transform: translate(-10%, 10%);
  }
  @media screen and (min-width: 1200px) {
    .singed-in-pomodee-timer {
      position: absolute;
      left: 50%;
      top: 62%;
      transform: translate(-50%, -50%);
    }
    .singed-out-pomodee-timer {
      transform: translateX(20%);
      margin: 0 auto;
    }
  }
`;

const Home = () => {
  const { isSignedIn, user } = useContext(AuthContext);

  const { roomName } = useParams();
  const [sentSignal, setSentSignal] = useState(false);
  const history = useHistory();

  const { receiveSignal, sendSignal } = useSocketIo();
  const [signalType, setSignalType] = useState('');
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [hasControl, setHasControl] = useState(!roomName);

  console.log({ hasControl });

  receiveSignal('control', (control) => {
    setHasControl(control);
  });

  // when a user joins it receives the list of users from the backend
  receiveSignal('new user', (data) => {
    console.log(data);
    setOnlinePeople(data);
  });

  // when the timer controls are pressed
  receiveSignal('action', (type) => setSignalType(type));

  // sends signals when a button is pressed on the timer
  const handleActionSendSignal = (type) => {
    isSignedIn && sendSignal('action', type);
  };

  useEffect(() => {
    const userInfo = user
      ? {
          username: roomName ? user.username : '[admin] ' + user.username,
          email: user.email,
          avatar: user.avatar,
          roomName: roomName || user.username
        }
      : null;

    if (userInfo && !sentSignal) {
      sendSignal('join room', userInfo);
      setSentSignal(true);
    }
  }, [roomName, sendSignal, sentSignal, user]);

  useEffect(() => {
    if (user && !user.avatar) {
      history.replace('/profile');
    }
  }, [history, user]);

  return (
    <Layout>
      <Container>
        <PomodeeTimer
          user={user}
          hasControl={hasControl}
          isSignedIn={isSignedIn}
          className="pomodeeTimer"
          handleActionSendSignal={handleActionSendSignal}
          signalType={signalType}
          roomName={roomName || user.username}
        />
        {isSignedIn && (
          <div
            style={{
              display: 'flex',
              padding: 10,
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center '
            }}
            id="online-users"
          >
            <OnlineUsers sendSignal={sendSignal} admin={!roomName} onlinePeople={onlinePeople} />
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Home;
