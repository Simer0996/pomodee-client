import React from 'react';

import { Progress } from 'antd';
import styled from 'styled-components';
import { getLevel } from '../../util.js/getLevel';

const Container = styled.div`
  display: grid;
  width: 400px;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 0fr auto;
  .ant-progress {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: -2;
    padding-top: 8px;
    padding-left: 10px;
  }
  .img {
    grid-row-start: 1;
    grid-row-end: 3;
  }
  .score {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: -2;
    margin-top: 20px;
    margin-left: 10px;
  }
  strong {
    border-radius: 50px;
    background-color: #f34303;
    color: #fff;
    padding: 6px 10px;
  }
  @media screen and (max-width: 450px) {
    display: none;
  } ;
`;

const ProgressAvatar = ({ cycles }) => {
  const level = getLevel(cycles);
  const score = (cycles / level.max) * 100;

  return (
    <Container>
      <img className="img" alt="avatar" src={level.avatar} width="100" />
      <div className="score">
        <strong>
          {cycles} / {level.max}
        </strong>
      </div>
      <Progress
        strokeColor={{
          '0%': '#F34506',
          '100%': '#3928B1'
        }}
        percent={score}
        strokeWidth={15}
      />
    </Container>
  );
};

export default ProgressAvatar;
