import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { TransitionGroup, Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet-async';
import Input from 'components/Input';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import { Button } from 'components/Button';
import { useScrollRestore, useFormInput, useRouteTransition } from 'hooks';
import { reflow } from 'utils/transition';
import prerender from 'utils/prerender';
import { tokens, msToNum } from 'app/theme';
import { Link } from 'react-router-dom';
import Section from 'components/Section';
import './index.css';

const isProd = process.env.NODE_ENV === 'production';
const initDelay = tokens.base.durationS;
const functionsRegion = 'us-east-1';
const functionsEnv = isProd ? 'production' : 'dev';
const functionsEndpoint = isProd ? 'klcyd10c76' : '5h36icx3yj';
const functionsUrl = `https://${functionsEndpoint}.execute-api.${functionsRegion}.amazonaws.com/${functionsEnv}`;

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

function getDelay(delayMs, initDelayMs = `0ms`, multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return { '--delay': `${(msToNum(initDelayMs) + numDelay).toFixed(0)}ms` };
}

const Contact = () => {
  const { status } = useRouteTransition();
  const email = useFormInput('');
  const message = useFormInput('');
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  useScrollRestore();

  const onSubmit = useCallback(
    async event => {
      event.preventDefault();
      if (sending) return;

      try {
        setSending(true);

        const response = await fetch(`${functionsUrl}/functions/sendMessage`, {
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
        alert(error.message);
      }
    },
    [email.value, message.value, sending]
  );

  return (
    <Section className={classNames('contact', `contact--${status}`)}>
      <Helmet
        title="Contact me"
        meta={[
          {
            name: 'description',
            content:
              'Send me a message if you’re interested in discussing a project or if you just want to say hi',
          },
        ]}
      />
      <TransitionGroup component={null}>
        {!complete && (
          <Transition appear mountOnEnter unmountOnExit timeout={1600} onEnter={reflow}>
            {status => (
              <form className="contact__form" method="post" onSubmit={onSubmit}>
                <h1
                  className={classNames('contact__title', `contact__title--${status}`, {
                    'contact__title--hidden': prerender,
                  })}
                  style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
                >
                  <DecoderText
                    text="Say hello"
                    start={status !== 'exited' && !prerender}
                    offset={140}
                    delay={msToNum(tokens.base.durationS)}
                  />
                </h1>
                <Divider
                  className={classNames(
                    'contact__divider',
                    `contact__divider--${status}`,
                    { 'contact__divider--hidden': prerender }
                  )}
                  style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
                />
                <div className="contact__fields">
                  <Input
                    required
                    className={classNames('contact__input', `contact__input--${status}`, {
                      'contact__input--hidden': prerender,
                    })}
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
                    className={classNames('contact__input', `contact__input--${status}`, {
                      'contact__input--hidden': prerender,
                    })}
                    style={getDelay(tokens.base.durationS, initDelay)}
                    autoComplete="off"
                    label="Message"
                    maxLength={4096}
                    {...message}
                  />
                  <Button
                    className={classNames(
                      'contact__button',
                      `contact__button--${status}`,
                      {
                        'contact__button--hidden': prerender,
                        'contact__button--sending': sending,
                      }
                    )}
                    style={getDelay(tokens.base.durationM, initDelay)}
                    disabled={sending}
                    loading={sending}
                    loadingText="Sending..."
                    icon="send"
                    type="submit"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </Transition>
        )}
        {complete && (
          <Transition appear mountOnEnter unmountOnExit onEnter={reflow} timeout={0}>
            {status => (
              <div className="contact__complete" aria-live="polite">
                <h1
                  className={classNames(
                    'contact__complete-title',
                    `contact__complete-title--${status}`
                  )}
                >
                  Message Sent
                </h1>
                <p
                  className={classNames(
                    'contact__complete-text',
                    `contact__complete-text--${status}`
                  )}
                  style={getDelay(tokens.base.durationXS)}
                >
                  I’ll get back to you within a couple days, sit tight
                </p>
                <Button
                  secondary
                  className={classNames(
                    'contact__complete-button',
                    `contact__complete-button--${status}`
                  )}
                  style={getDelay(tokens.base.durationM)}
                  as={Link}
                  to="/"
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

export default Contact;
