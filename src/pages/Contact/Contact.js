import './Contact.css';

import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Icon } from 'components/Icon';
import { Input } from 'components/Input';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { useFormInput, useRouteTransition, useScrollRestore } from 'hooks';
import { useCallback, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Transition, TransitionGroup } from 'react-transition-group';
import { prerender } from 'utils/prerender';
import { cssProps, msToNum, numToMs } from 'utils/style';
import { isVisible, reflow } from 'utils/transition';

const initDelay = tokens.base.durationS;

function getStatusError({
  status,
  errorMessage,
  fallback = 'There was a problem with your request',
}) {
  if (status === 200) return false;

  const statuses = {
    500: 'There was a problem with the server, try again later',
    404: 'There was a problem connecting to the server. Make sure you are connected to the internet',
  };

  if (errorMessage) {
    return errorMessage;
  }

  return statuses[status] || fallback;
}

function getDelay(delayMs, initDelayMs = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(initDelayMs) + numDelay).toFixed(0)) });
}

export const Contact = () => {
  const { status } = useRouteTransition();
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  const [statusError, setStatusError] = useState('');
  useScrollRestore();

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      setStatusError('');

      if (sending) return;

      try {
        setSending(true);

        const response = await fetch('https://api.hamishw.com/message', {
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

        const responseMessage = await response.json();

        const statusError = getStatusError({
          status: response?.status,
          errorMessage: responseMessage?.error,
          fallback: 'There was a problem sending your message',
        });

        if (statusError) throw new Error(statusError);

        setComplete(true);
        setSending(false);
      } catch (error) {
        setSending(false);
        setStatusError(error.message);
      }
    },
    [email.value, message.value, sending]
  );

  return (
    <Section className="contact" data-status={status}>
      <Helmet>
        <title>Contact | Hamish Williams</title>
        <meta
          name="description"
          content="Send me a message if you’re interested in discussing a project or if you just want to say hi"
        />
      </Helmet>
      <TransitionGroup component={null}>
        {!complete && (
          <Transition appear mountOnEnter unmountOnExit timeout={1600} onEnter={reflow}>
            {status => (
              <form className="contact__form" method="post" onSubmit={onSubmit}>
                <Heading
                  className="contact__title"
                  data-status={status}
                  data-hidden={prerender}
                  level={3}
                  as="h1"
                  style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
                >
                  <DecoderText
                    text="Say hello"
                    start={status !== 'exited' && !prerender}
                    delay={300}
                  />
                </Heading>
                <Divider
                  className="contact__divider"
                  data-status={status}
                  data-hidden={prerender}
                  style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
                />
                <Input
                  required
                  className="contact__input"
                  data-status={status}
                  data-hidden={prerender}
                  style={getDelay(tokens.base.durationXS, initDelay)}
                  autoComplete="email"
                  label="Your Email"
                  type="email"
                  maxLength={512}
                  {...email}
                />
                <Input
                  required
                  multiline
                  className="contact__input"
                  data-status={status}
                  data-hidden={prerender}
                  style={getDelay(tokens.base.durationS, initDelay)}
                  autoComplete="off"
                  label="Message"
                  maxLength={4096}
                  {...message}
                />
                <TransitionGroup component={null}>
                  {!!statusError && (
                    <Transition timeout={msToNum(tokens.base.durationM)}>
                      {errorStatus => (
                        <div
                          className="contact__form-error"
                          data-status={errorStatus}
                          style={cssProps({
                            height: isVisible(errorStatus)
                              ? errorRef.current?.getBoundingClientRect().height
                              : 0,
                          })}
                        >
                          <div className="contact__form-error-content" ref={errorRef}>
                            <div className="contact__form-error-message">
                              <Icon className="contact__form-error-icon" icon="error" />
                              {statusError}
                            </div>
                          </div>
                        </div>
                      )}
                    </Transition>
                  )}
                </TransitionGroup>
                <Button
                  className="contact__button"
                  data-status={status}
                  data-hidden={prerender}
                  data-sending={sending}
                  style={getDelay(tokens.base.durationM, initDelay)}
                  disabled={sending}
                  loading={sending}
                  loadingText="Sending..."
                  icon="send"
                  type="submit"
                >
                  Send Message
                </Button>
              </form>
            )}
          </Transition>
        )}
        {complete && (
          <Transition appear mountOnEnter unmountOnExit onEnter={reflow} timeout={0}>
            {status => (
              <div className="contact__complete" aria-live="polite">
                <Heading
                  level={3}
                  as="h3"
                  className="contact__complete-title"
                  data-status={status}
                >
                  Message Sent
                </Heading>
                <Text
                  size="l"
                  className="contact__complete-text"
                  data-status={status}
                  style={getDelay(tokens.base.durationXS)}
                >
                  I’ll get back to you within a couple days, sit tight
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className="contact__complete-button"
                  data-status={status}
                  style={getDelay(tokens.base.durationM)}
                  href="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </Button>
              </div>
            )}
          </Transition>
        )}
      </TransitionGroup>
    </Section>
  );
};
