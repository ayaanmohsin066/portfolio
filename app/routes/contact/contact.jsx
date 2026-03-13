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
import styles from './contact.module.css';

const MAX_NAME_LENGTH = 128;
const MAX_EMAIL_LENGTH = 256;
const MAX_SUBJECT_LENGTH = 256;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send me a message if you are interested in discussing a project or if you just want to say hi',
  });
};

export const Contact = () => {
  const errorRef = useRef();
  const name = useFormInput('');
  const email = useFormInput('');
  const subject = useFormInput('');
  const message = useFormInput('');
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'sending' | 'success' | { error: string }
  const initDelay = tokens.base.durationS;

  const handleSubmit = async e => {
    e.preventDefault();
    const nameVal = name.value.trim();
    const emailVal = email.value.trim();
    const subjectVal = subject.value.trim();
    const messageVal = message.value.trim();

    if (!emailVal || !EMAIL_PATTERN.test(emailVal)) {
      setSubmitStatus({ error: 'Please enter a valid email address.' });
      return;
    }
    if (!messageVal) {
      setSubmitStatus({ error: 'Please enter a message.' });
      return;
    }

    setSubmitStatus('sending');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!publicKey || !serviceId || !templateId) {
        throw new Error(
          'EmailJS is not configured. Add VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID to your environment.'
        );
      }
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(serviceId, templateId, {
        from_name: nameVal || 'Anonymous',
        from_email: emailVal,
        subject: subjectVal || 'Portfolio contact',
        message: messageVal,
      }, publicKey);
      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus({
        error: err.message || 'Something went wrong. Please try again.',
      });
    }
  };

  const sending = submitStatus === 'sending';
  const success = submitStatus === 'success';
  const errors = submitStatus && typeof submitStatus === 'object' && submitStatus.error;

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!success} timeout={1600}>
        {({ status, nodeRef }) => (
          <div ref={nodeRef} className={styles.formWrap}>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />

            <div className={styles.contactDetails} data-status={status}>
              <Text size="s" className={styles.contactDetailsTitle}>
                Get in touch
              </Text>
              <p className={styles.contactDetail}>
                <strong>Email:</strong>{' '}
                <a href="mailto:ayaanmohsin15945@gmail.com" className={styles.contactLink}>
                  ayaanmohsin15945@gmail.com
                </a>
              </p>
              <p className={styles.contactDetail}>
                <strong>Instagram:</strong>{' '}
                <a
                  href="https://www.instagram.com/ayaan_mohsin1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  @ayaan_mohsin1
                </a>
              </p>
              <p className={styles.contactDetail}>
                <strong>LinkedIn:</strong>{' '}
                <a
                  href="https://www.linkedin.com/in/ayaan-mohsin-119b57236"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  Ayaan Mohsin
                </a>
              </p>
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
              style={getDelay(tokens.base.durationXS, initDelay, 0.5)}
            >
              <Input
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay)}
                label="Name"
                name="name"
                type="text"
                maxLength={MAX_NAME_LENGTH}
                {...name}
              />
              <Input
                required
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay)}
                autoComplete="email"
                label="Email"
                type="email"
                name="email"
                maxLength={MAX_EMAIL_LENGTH}
                {...email}
              />
              <Input
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationXS, initDelay)}
                label="Subject"
                name="subject"
                type="text"
                maxLength={MAX_SUBJECT_LENGTH}
                {...subject}
              />
              <Input
                required
                multiline
                className={styles.input}
                data-status={status}
                style={getDelay(tokens.base.durationS, initDelay)}
                autoComplete="off"
                label="Message"
                name="message"
                maxLength={MAX_MESSAGE_LENGTH}
                {...message}
              />
              <Transition
                unmount
                in={!!errors}
                timeout={msToNum(tokens.base.durationM)}
              >
                {({ status: errorStatus, nodeRef }) => (
                  <div
                    className={styles.formError}
                    ref={nodeRef}
                    data-status={errorStatus}
                    style={cssProps({
                      height: errorStatus ? errorRef.current?.offsetHeight : 0,
                    })}
                  >
                    <div className={styles.formErrorContent} ref={errorRef}>
                      <div className={styles.formErrorMessage}>
                        <Icon className={styles.formErrorIcon} icon="error" />
                        {errors}
                      </div>
                    </div>
                  </div>
                )}
              </Transition>
              <Button
                className={styles.button}
                data-status={status}
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
          </div>
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
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I'll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
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

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
