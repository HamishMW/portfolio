import React, { useState, useContext, useCallback } from 'react';
import styled, { css } from 'styled-components/macro';
import { TransitionGroup, Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet-async';
import { AppContext } from '../app/App';
import Input from '../components/Input';
import DecoderText from '../components/DecoderText';
import { Button, RouterButton } from '../components/Button';
import { media, AnimFade, sectionPadding } from '../utils/styleUtils';
import Svg from '../components/Svg';
import { useScrollToTop, useFormInput } from '../utils/hooks';

const sendMessageUrl = 'https://us-central1-hamishw-e3b37.cloudfunctions.net/app/sendMessage';
const prerender = navigator.userAgent === 'ReactSnap';
const initDelay = 300;

function getStatusError(status) {
  if (status === 200) return false;

  const genericErrorMessage = 'There was a problem sending your message';

  const statuses = {
    500: 'There was a problem with the server, try again later',
    404: 'There was a problem connecting to the server. Make sure you are connected to the internet',
  };

  return statuses[status] || genericErrorMessage;
}

function Contact() {
  const { status, currentTheme } = useContext(AppContext);
  const email = useFormInput('');
  const message = useFormInput('');
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  useScrollToTop(status);

  const onSubmit = useCallback(async event => {
    event.preventDefault();
    if (sending) return;

    try {
      setSending(true);

      const response = await fetch(sendMessageUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          message: message.value,
        }),
      });

      const errorStatus = getStatusError(response.status);
      if (errorStatus) throw new Error(errorStatus);

      setComplete(true);
      setSending(false);
    } catch (error) {
      setSending(false);
      alert(error.message);
    }
  }, [email.value, message.value, sending]);

  return (
    <ContactWrapper status={status}>
      <Helmet
        title="Contact me"
        meta={[{
          name: 'description',
          content: 'Send me a message if you’re interested in discussing a project or if you just want to say hi',
        }]}
      />
      <TransitionGroup component={React.Fragment}>
        {!complete &&
          <Transition appear mountOnEnter unmountOnExit timeout={1600}>
            {status => (
              <ContactForm method="post" onSubmit={onSubmit} role="form">
                <ContactTitle status={status} delay={50}>
                  <DecoderText
                    text="Say hello"
                    start={status !== 'exited' && !prerender}
                    offset={140}
                  />
                </ContactTitle>
                <ContactDivider status={status} delay={100} />
                <ContactFields>
                  <ContactInput
                    {...email}
                    status={status}
                    delay={200}
                    autoComplete="email"
                    label="Your Email"
                    type="email"
                    maxLength={320}
                    required
                  />
                  <ContactInput
                    {...message}
                    status={status}
                    delay={300}
                    autoComplete="off"
                    label="Message"
                    maxLength={5000}
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
                </ContactFields>
              </ContactForm>
            )}
          </Transition>
        }
        {complete &&
          <Transition appear timeout={10} mountOnEnter unmountOnExit>
            {status => (
              <ContactComplete>
                <ContactCompleteTitle status={status} delay={10}>
                  Message Sent
                </ContactCompleteTitle>
                <ContactCompleteText status={status} delay={200}>
                  I’ll get back to you within a couple days, sit tight
                </ContactCompleteText>
                <ContactCompleteButton
                  secondary
                  to="/"
                  status={status}
                  delay={400}
                  icon="chevronRight"
                >
                  Back to homepage
                </ContactCompleteButton>
              </ContactComplete>
            )}
          </Transition>
        }
      </TransitionGroup>
      <ContactMeta>
        <Svg color={currentTheme.colorText} icon="message" />
      </ContactMeta>
    </ContactWrapper>
  );
}

const ContactWrapper = styled.section`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  ${sectionPadding}

  ${props => (props.status === 'entered' || props.status === 'exiting') && css`
    position: relative;
  `}
`;

const ContactForm = styled.form`
  max-width: 440px;
  width: 100%;
  padding: 40px 0;

  @media (max-width: ${media.mobile}) {
    padding: 120px 0 40px;
    align-self: flex-start;
  }
`;

const ContactFields = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 32px;
`;

const ContactTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 40px;
  line-height: 1;
  margin-top: 0;
  color: ${props => props.theme.colorTitle};
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay + initDelay}ms;
  transform: translate3d(0, 90px, 0);
  opacity: 0;
  height: 32px;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') && !prerender && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.status === 'exiting' && css`
    transition-duration: 0.4s;
    transition-delay: 0s;
    transform: translate3d(0, -40px, 0);
    opacity: 0;
  `}
`;

const ContactDivider = styled.div`
  margin-bottom: 62px;
  width: 100%;
  height: 1px;
  background: ${props => props.theme.colorPrimary};
  position: relative;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay + initDelay}ms;
  transform: translate3d(0, 90px, 0);
  opacity: 0;

  &:before {
    content: '';
    height: 10px;
    width: 90px;
    background: ${props => props.theme.colorPrimary};
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
    props.status === 'entered') && !prerender && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.status === 'exiting' && css`
    transition-duration: 0.4s;
    transition-delay: 0s;
    transform: translate3d(0, -40px, 0);
    opacity: 0;
  `}
`;

const ContactInput = styled(Input)`
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay + initDelay}ms;
  transform: translate3d(0, 80px, 0);
  opacity: 0;

  ${props => (props.status === 'entering' ||
    props.status === 'entered') && !prerender && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.status === 'exiting' && css`
    transition-duration: 0.4s;
    transition-delay: 0s;
    transform: translate3d(0, -40px, 0);
    opacity: 0;
  `}
`;

const ContactButton = styled(Button)`
  margin-top: 28px;
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-delay: ${props => props.status === 'entered' ? '0ms' : `${props.delay + initDelay}ms`};
  transition-duration: ${props => props.status === 'entered' ? '0.4s' : '0.8s'};
  transform: translate3d(0, 80px, 0);
  opacity: 0;
  justify-self: flex-start;

  ${props => props.sending && css`
    svg {
      transition: transform ${props.curveFastoutSlowin} 0.8s, opacity 0.3s ease 0.3s;
      transform: translate3d(150px, 0, 0);
      opacity: 0;
    }

    div {
      opacity: 0;
    }
  `}

  ${props => props.sending && css`
   div {
      animation: ${AnimFade} 0.5s ease 0.6s forwards;
    }
  `}

  ${props => props.status === 'entering' && css`
    &:hover {
      transform: translate3d(0, 0, 0);
    }
  `}

  ${props => (props.status === 'entering' ||
    props.status === 'entered') && !prerender && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}

  ${props => props.status === 'exiting' && css`
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
  padding: 30px 0;
  position: fixed;
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
  color: ${props => props.theme.colorTitle};
  transition-property: transform, opacity;
  transition-timing-function: ${props => props.theme.curveFastoutSlowin};
  transition-duration: 0.8s;
  transition-delay: ${props => props.delay}ms;
  transform: translate3d(0, 80px, 0);
  opacity: 0;

  ${props => props.status === 'entered' && css`
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

  ${props => props.status === 'entered' && css`
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
  padding-left: 3px;

  ${props => props.status === 'entered' && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

const ContactMeta = styled.div`
  position: fixed;
  right: ${props => props.theme.spacingOuter.desktop};
  bottom: ${props => props.theme.spacingOuter.desktop};
  transform: rotate(-90deg) translate3d(100%, 0, 0);
  transform-origin: bottom right;
  display: flex;
  align-items: center;
  flex-direction: row;
  opacity: 0;
  animation: ${css`${AnimFade}`} 0.8s ease 1s forwards;

  @media (max-width: ${media.tablet}) {
    right: ${props => props.theme.spacingOuter.tablet};
    bottom: ${props => props.theme.spacingOuter.tablet};
  }

  @media (max-width: ${media.mobile}) {
    display: none;
  }
`;

export default React.memo(Contact);
