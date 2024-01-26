import notFoundPoster from '~/assets/notfound.jpg';
import notFoundVideo from '~/assets/notfound.mp4';
import { Button } from '~/components/Button';
import { DecoderText } from '~/components/DecoderText';
import { Heading } from '~/components/Heading';
import { Text } from '~/components/Text';
import { Transition } from '~/components/Transition';
import { Fragment } from 'react';
import styles from './Error.module.css';

export function Error({ error }) {
  console.log({ error });
  const getMessage = () => {
    switch (error.status) {
      case 404:
        return {
          summary: 'Error: redacted',
          message:
            'This page could not be found. It either doesn’t exist or was deleted. Or perhaps you don’t exist.',
        };
      default:
        return {
          summary: 'Error: anomaly',
          message: error.data || error.toString(),
        };
    }
  };

  const { summary, message } = getMessage();

  return (
    <section className={styles.page}>
      <Transition in>
        {visible => (
          <Fragment>
            <div className={styles.details}>
              <div className={styles.text}>
                {!!error.status && (
                  <Heading
                    className={styles.title}
                    data-visible={visible}
                    level={0}
                    weight="bold"
                  >
                    {error.status}
                  </Heading>
                )}
                {!error.status && (
                  <Heading
                    className={styles.title}
                    data-visible={visible}
                    as="h1"
                    level={2}
                  >
                    Flatlined
                  </Heading>
                )}
                <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-visible={visible}
                  as="h2"
                  level={3}
                >
                  <DecoderText text={summary} start={visible} delay={300} />
                </Heading>
                <Text className={styles.description} data-visible={visible} as="p">
                  {message}
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={styles.button}
                  data-visible={visible}
                  href="/"
                  icon="chevron-right"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div className={styles.videoContainer} data-visible={visible}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
                data-visible={visible}
                poster={notFoundPoster.src}
              >
                <source src={notFoundVideo} type="video/mp4" />
              </video>
              <a
                className={styles.credit}
                data-visible={visible}
                href="https://www.imdb.com/title/tt0113568/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animation from Ghost in the Shell (1995)
              </a>
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
  );
}
