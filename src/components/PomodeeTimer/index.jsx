import React, { useEffect, useState, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Howl, Howler } from 'howler';
import bell from '../PomodeeTimer/bell-ringing-05.mp3';
import styled from 'styled-components';
import { BsPlayFill, BsPause } from 'react-icons/bs';
import { VscRefresh } from 'react-icons/vsc';
import { IoClose } from 'react-icons/io5';
import { addCycle, saveCycles } from '../../services/auth.services';
import useSocketIo from '../../hooks/useSocketIo';

const TimerCountDown = styled.h1`
  font-weight: 700;
  font-size: 5rem;
  margin: 0px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-8%);
  h1 {
    color: ${(props) => (props.isSignedIn ? '#281998' : '#fff')};
  }
  .timer-refresh-button {
    stroke-width: 1;
  }
  .timer-cancel-button {
    stroke-width: 7;
  }
  .timer-pause-button {
    stroke-width: 1;
    transform: translateX(5px);
  }
  .timer-play-button {
    transform: translateX(10px);
  }
  @media screen and (max-width: 450px) {
    margin-top: -10%;
    transform: translateX(0);
  }
`;

const CountDown = ({ remainingTime }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(`${Math.floor(remainingTime / 60)} : ${remainingTime % 60}`);
  }, [remainingTime]);

  return <TimerCountDown>{time}</TimerCountDown>;
};

const PomodeeTimer = ({ signalType, hasControl, roomName, handleActionSendSignal, user, isSignedIn }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(25);
  const [timer, setTimer] = useState('');
  const { sendSignal, receiveSignal } = useSocketIo();
  const [key, setKey] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  /* Add a new cycle when a cycle completes: STARTS here - Hiroshi */
  const isFirstRender = useRef(false);

  receiveSignal('time', (time) => {
    setTimeRemaining(time);
  });

  useEffect(() => {
    isFirstRender.current = true;
  }, []); // Don't add a cycle at the first render

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Completion success message
    console.log(`${user.username} has completed a new cycle at ${Date.now()}`);

    // Add timestamp to each completed cycle

    const cycleData = {
      email: user.email,
      cycleData: {
        completedAt: Date.now(),
        completedBy: user.email
      }
    };

    const userCycles = {
      username: user.username,
      cycles: Math.floor(cycles / 30)
    };
    handleActionSendSignal({ action: 'play', roomName: roomName });
    addCycle(cycleData);
    saveCycles(userCycles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Math.floor(cycles / 30)]);

  /* Add a new cycle when a cycle completes: ENDS here - Hiroshi */

  useEffect(() => {
    if (isSignedIn && signalType === 'pause') {
      pause();
    }

    if (isSignedIn && signalType === 'play') {
      play();
    }

    if (isSignedIn && signalType === 'stop') {
      close();
    }

    if (isSignedIn && signalType === 'reset') {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, signalType]);

  useEffect(() => {
    if (timer === 0) {
      const changeTime = () => {
        sendSignal('time', { remainingTime: null, roomName });
        setKey((prevKey) => prevKey + 1);
        play();
        if (duration === 25) {
          setDuration(5);
          return;
        }

        setDuration(25);
      };
      changeTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const reset = () => {
    setKey((prevKey) => prevKey + 1);
    setDuration(25);
    setIsPlaying(false);
    clearInterval(intervalId);
    setCycles(0);
    sendSignal('time', { remainingTime: null, roomName });
    setIntervalId(null);
    handleActionSendSignal({ action: 'reset', roomName: roomName });
  };

  const close = () => {
    setKey((prevKey) => prevKey + 1);
    setDuration(25);
    setIsPlaying(false);
    clearInterval(intervalId);
    sendSignal('time', { remainingTime: null, roomName });
    setIntervalId(null);
    handleActionSendSignal({ action: 'stop', roomName: roomName });
  };

  const play = (value) => {
    var sound = new Howl({
      src: bell
    });
    sound.play();
    setIsPlaying(true);

    if (isSignedIn && !intervalId) {
      handleActionSendSignal({ action: 'play', roomName: roomName });

      const interval = setInterval(() => {
        setCycles((cycles) => cycles + 1);
      }, 1000);
      setIntervalId(interval);
    }

    if (!value) {
      Howler.volume(1.0);
      return;
    }
    Howler.volume(0);
  };

  const pause = () => {
    setIsPlaying(false);
    setIsPlaying(false);
    setIntervalId(null);
    clearInterval(intervalId);
    handleActionSendSignal({ action: 'pause', roomName: roomName });
  };

  return (
    <Container isSignedIn={isSignedIn}>
      {timeRemaining && !hasControl && (
        <p>
          You will join the next cycle in <b>{timeRemaining}</b>, please sit tight
        </p>
      )}
      {isSignedIn && (
        <div
          style={{
            background: '#BF8033',
            height: 60,
            width: 60,
            textAlign: 'center',
            borderRadius: 50,
            lineHeight: 1.2,
            fontSize: 50,
            fontWeight: 'bold',
            transform: 'translate(100px, 25px)',
            color: '#fff'
          }}
        >
          {Math.floor(cycles / 30)}
        </div>
      )}
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        key={key}
        colors={[isSignedIn ? 'url(#your-unique-id)' : '#fff']}
        size={300}
        strokeWidth={20}
        trailColor={isSignedIn ? '#EAEAEA' : '#281998'}
        onUpdate={(remainingTime) => {
          setTimer(remainingTime);
          if (isPlaying) sendSignal('time', { remainingTime, roomName });
        }}
        onComplete={() => ({ shouldRepeat: true, delay: 5 })}
      >
        {CountDown}
      </CountdownCircleTimer>
      <div
        style={{
          display: 'flex',
          marginTop: 30,
          marginLeft: 10,
          cursor: 'pointer',
          width: '40%',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        {user && (
          <button style={{ border: 'none', background: 'transparent' }} onClick={reset} disabled={!hasControl}>
            <VscRefresh color={isSignedIn ? '#281998' : '#fff'} size={60} className="timer-refresh-button" />
          </button>
        )}

        {!isPlaying ? (
          <button style={{ border: 'none', background: 'transparent' }} onClick={play} disabled={!hasControl}>
            <BsPlayFill color={isSignedIn ? '#281998' : '#fff'} size={120} className="timer-play-button" />
          </button>
        ) : (
          <button style={{ border: 'none', background: 'transparent' }} onClick={pause} disabled={!hasControl}>
            <BsPause color={isSignedIn ? '#281998' : '#fff'} size={120} className="timer-pause-button" />
          </button>
        )}
        <button style={{ border: 'none', background: 'transparent' }} onClick={close} disabled={!hasControl}>
          <IoClose color={isSignedIn ? '#281998' : '#fff'} size={100} className="timer-cancel-button" />
        </button>
      </div>
      <svg>
        <defs>
          <linearGradient id="your-unique-id" x1="1" y1="0" x2="0" y2="0">
            <stop offset="5%" stopColor="#3928B1" />
            <stop offset="95%" stopColor="#F34506" />
          </linearGradient>
        </defs>
      </svg>
    </Container>
  );
};

export default PomodeeTimer;
