import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import emailjs from 'emailjs-com';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you’re interested in discussing a project or if you just want to say hi',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export const Contact = () => {
  const formRef = useRef();
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const sendEmail = async e => {
    e.preventDefault();
    setSending(true);
    setErrors({});

    if (!EMAIL_PATTERN.test(email.value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      setSending(false);
      return;
    }

    if (!message.value) {
      setErrors(prev => ({ ...prev, message: 'Please enter a message.' }));
      setSending(false);
      return;
    }

    try {
      await emailjs.sendForm(
        'service_9rs5kge',
        'template_bj4jmig',
        formRef.current,
        'G_qK-Fm3aXV0byN2S'
      );
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setErrors({ form: 'Failed to send message. Please try again.' });
    }
    setSending(false);
  };

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!success} timeout={1600}>
        {({ status, nodeRef }) => (
          <form ref={formRef} className={styles.form} onSubmit={sendEmail}>
            <Heading className={styles.title} data-status={status} level={3} as="h1">
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider className={styles.divider} data-status={status} />
            <Input
              required
              className={styles.input}
              data-status={status}
              autoComplete="email"
              label="Your email"
              type="email"
              name="email"
              {...email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              autoComplete="off"
              label="Message"
              name="message"
              {...message}
            />
            {errors.email && <div className={styles.formError}>{errors.email}</div>}
            {errors.message && <div className={styles.formError}>{errors.message}</div>}
            {errors.form && <div className={styles.formError}>{errors.form}</div>}
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              type="submit"
            >
              Send message
            </Button>
          </form>
        )}
      </Transition>
      <Transition unmount in={success}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text size="l" as="p" className={styles.completeText} data-status={status}>
              I’ll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              href="/"
              className={styles.completeButton}
              data-status={status}
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};
