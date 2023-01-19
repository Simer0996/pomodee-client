import React from 'react';
import AvatarImg from '../../components/AvatarImg';

const OnlineUsers = ({ onlinePeople, sendSignal, admin }) => {
  return (
    <>
      {onlinePeople.map((onlineuser) => (
        <div
          key={onlineuser.id}
          id="online-user"
          style={{
            textAlign: 'center ',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: admin ? 'pointer' : 'default'
          }}
          onClick={() => {
            if (admin) {
              sendSignal('admin', { roomName: onlineuser.roomName, id: onlineuser.id });
            }
          }}
        >
          <AvatarImg style={{ borderRadius: 50 }} height="70" width="70" avatarId={onlineuser.avatar || 1} />
          <p style={{ fontSize: 15 }}>{onlineuser.username}</p>
        </div>
      ))}
    </>
  );
};

export default OnlineUsers;
