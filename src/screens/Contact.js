import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';

export default class Contact extends PureComponent {
  state = {
    emailValue: '',
    messageValue: '',
  }

  render() {
    const { emailValue, messageValue } = this.state;

    return (
      <ContactWrapper>
        <ContactForm autoComplete="off">
          <ContactDivider />
          <ContactInput
            onChange={event => this.setState({emailValue: event.target.value})}
            label="Your Email"
            id="email"
            type="email"
            hasValue={!!emailValue}
            value={emailValue}
            required
          />
          <ContactInput
            onChange={event => this.setState({messageValue: event.target.value})}
            label="Message"
            id="message"
            hasValue={!!messageValue}
            value={messageValue}
            required
            multiline
          />
          <Button icon="send" style={{marginTop: 20}} type="submit">Send Message</Button>
        </ContactForm>
      </ContactWrapper>
    );
  }
}

const ContactWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const ContactForm = styled.form`
  max-width: 440px;
  width: 100%;
  padding: 0 20px;
`;

const ContactDivider = styled.div`
  margin-bottom: 80px;
  width: 100%;
  height: 1px;
  background: ${props => props.theme.colorPrimary(1)};
  position: relative;

  &:before {
    content: '';
    height: 10px;
    width: 90px;
    background: ${props => props.theme.colorPrimary(1)};
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 0);
  }
`;

const ContactInput = styled(Input)`
  padding-bottom: 40px;
`;
