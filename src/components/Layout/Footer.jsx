import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 100px;
  text-align: center;
  transform: translateY(120px);
`;

const Footer = ({ isSignedIn }) => {
  return (
    <Container>
      <p className="copyright" style={{ color: isSignedIn ? '#000' : '#fff' }}>
        {new Date().getFullYear()} © Array[6]. All Rights Reserved.
      </p>
    </Container>
  );
};

export default Footer;
