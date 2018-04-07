import React from 'react';
import { Message, Header, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

const LandingPage = () =>
  <Container>
    <Header>Landing</Header>
    <Message>This App let you post and search by location youtube videos.</Message>
  </Container>

export default LandingPage;
