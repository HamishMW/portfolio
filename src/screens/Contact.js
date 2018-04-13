import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { TransitionGroup, Transition } from 'react-transition-group';
import HeadTag from 'react-head';
import Input from '../components/Input';
import Button, { RouterButton } from '../components/Button';
import { Media } from '../utils/StyleUtils';
import Firebase from '../utils/Firebase';

export default class Contact extends PureComponent {
  state = {
    emailValue: '',
    messageValue: '',
    sending: false,
    complete: false,
  }

  updateEmail = event => {
    this.setState({emailValue: event.target.value});
  }

  updateMessage = event => {
    this.setState({messageValue: event.target.value});
  }

  onSubmit = event => {
    const { emailValue, messageValue, sending } = this.state;
    event.preventDefault();

    if (!sending) {
      this.setState({sending: true});

      Firebase.database().ref('messages').push({
        email: emailValue,
        message: messageValue,
      }).then(() => {
        this.setState({complete: true, sending: false});
      }).catch((error) => {
        this.setState({sending: false});
        alert(error);
      });
    }
  }

  render() {
    const { emailValue, messageValue, sending, complete } = this.state;

    return (
      <ContactWrapper>
        <HeadTag tag="title">Contact me</HeadTag>
        <HeadTag
          tag="meta"
          name="description"
          content="Send me a message if you're interested in discussing a
          project or if you just want to say hi"
        />

        <TransitionGroup component={React.Fragment}>
          {!complete &&
            <Transition appear timeout={1600} mountOnEnter unmountOnExit>
              {(status) => (
                <ContactForm autoComplete="off" onSubmit={this.onSubmit}>
                  <ContactTitle status={status} delay={50}>Say hello</ContactTitle>
                  <ContactDivider status={status} delay={100} />
                  <ContactInput
                    status={status}
                    delay={200}
                    onChange={this.updateEmail}
                    label="Your Email"
                    id="email"
                    type="email"
                    hasValue={!!emailValue}
                    value={emailValue}
                    maxLength={320}
                    required
                  />
                  <ContactInput
                    status={status}
                    delay={300}
                    onChange={this.updateMessage}
                    label="Message"
                    id="message"
                    hasValue={!!messageValue}
                    value={messageValue}
                    maxLength={2000}
                    required
                    multiline
                  />
                  <ContactButton
                    disabled={sending}
                    sending={sending}
                    loading={sending}
                    status={status}
                    delay={400}
                    icon="send"
                    type="submit"
                  >
                    Send Message
                  </ContactButton>
                </ContactForm>
              )}
            </Transition>
          }
          {complete &&
            <Transition appear timeout={0} mountOnEnter unmountOnExit>
              {(status) => (
                <ContactComplete>
                  <ContactCompleteTitle
                    status={status}
                    delay="0"
                  >
                    Message Sent
                  </ContactCompleteTitle>
                  <ContactCompleteText status={status} delay="200">
                    I'll get back to you within a couple days, sit tight
                  </ContactCompleteText>
                  <ContactCompleteButton
                    secondary
                    to="/"
                    status={status}
                    delay="400"
                    icon="chevronRight"
                  >
                    Back to homepage
                  </ContactCompleteButton>
                </ContactComplete>
              )}
            </Transition>
          }
        </TransitionGroup>
      </ContactWrapper>
    );
  }
}

const ContactWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding-left: 80px;

  @media (max-width: ${Media.tablet}) {
    padding-left: 60px;
  }

  @media (max-width: ${Media.mobile}) {
    padding-left: 0;
  }

  @media (max-width: ${Media.mobile}), (max-height: ${Media.mobile}) {
    padding-left: 0;
  }
`;

const ContactForm = styled.form`
  max-width: 440px;
  width: 100%;
  padding: 0 20px;
  padding-top: 120px;
  padding-bottom: 120px;

  @media (max-width: ${Media.mobile}) {
    padding-bottom: 300px;
  }
`;

const ContactTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 40px;
  margin-top: 0;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay}ms;
  transform: translate3d(0, 90px, 0);
  opacity: 0;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.status === 'exiting' &&`
    transition-duration: 0.4s;
    transition-delay: 0s;
    transform: translate3d(0, -40px, 0);
    opacity: 0;
  `}
`;

const ContactDivider = styled.div`
  margin-bottom: 80px;
  width: 100%;
  height: 1px;
  background: ${props => props.theme.colorPrimary(1)};
  position: relative;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay}ms;
  transform: translate3d(0, 90px, 0);
  opacity: 0;

  &:before {
    content: '';
    height: 10px;
    width: 90px;
    background: ${props => props.theme.colorPrimary(1)};
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      10px 100%,
      0 0
    );
  }

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.status === 'exiting' &&`
    transition-duration: 0.4s;
    transition-delay: 0s;
    transform: translate3d(0, -40px, 0);
    opacity: 0;
  `}
`;

const ContactInput = styled(Input)`
  padding-bottom: 40px;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay}ms;
  transform: translate3d(0, 80px, 0);
  opacity: 0;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.status === 'exiting' &&`
    transition-duration: 0.4s;
    transition-delay: 0s;
    transform: translate3d(0, -40px, 0);
    opacity: 0;
  `}
`;

const AnimFadeIn = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const ContactButton = styled(Button)`
  margin-top: 20px;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-delay: ${props => props.status === 'entered' ? '0ms' : `${props.delay}ms`};
  transition-duration: ${props => props.status === 'entered' ? '0.4s' : '0.8s'};
  transform: translate3d(0, 80px, 0);
  opacity: 0;

  ${props => props.sending &&`
    svg {
      transition: transform ${props.curveFastoutSlowin}, opacity 0.3s ease 0.8s;
      transition-duration: 0.8s;
      transform: translate3d(150px, 0, 0);
      opacity: 0;
    }

    div {
      opacity: 0;
      animation: ${AnimFadeIn} 0.5s ease 0.6s forwards;
    }
  `}

  ${props => (props.status === 'entering' ||
    props.status === 'entered') &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.status === 'exiting' &&`
    transition-duration: 0.4s;
    transition-delay: 0s;
    transform: translate3d(0, -40px, 0);
    opacity: 0;
  `}
`;

const ContactComplete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ContactCompleteTitle = styled.h1`
  font-weight: 500;
  font-size: 32px;
  margin: 0;
  text-align: center;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay}ms;
  transform: translate3d(0, 80px, 0);
  opacity: 0;

  ${props => props.status === 'entered' &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ContactCompleteText = styled.p`
  font-size: 18px;
  text-align: center;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay}ms;
  transform: translate3d(0, 80px, 0);
  opacity: 0;

  ${props => props.status === 'entered' &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ContactCompleteButton = styled(RouterButton)`
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay}ms;
  transform: translate3d(0, 80px, 0);
  opacity: 0;
  left: -5px;
  position: relative;

  ${props => props.status === 'entered' &&`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;
