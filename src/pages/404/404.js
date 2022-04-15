import notFoundPoster from 'assets/notfound.jpg';
import notFoundVideo from 'assets/notfound.mp4';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Meta } from 'components/Meta';
import { Text } from 'components/Text';
import { Fragment } from 'react';
import { Transition } from 'react-transition-group';
import { reflow } from 'utils/transition';
import styles from './404.module.css';

export function Page404() {
  return (
    <section className={styles.page}>
      <Meta
        title="404 | Not Found"
        description="404 page not found. This page doesn't exist"
      />
      <Transition appear in={true} timeout={0} onEnter={reflow}>
        {status => (
          <Fragment>
            <div className={styles.details}>
              <div className={styles.text}>
                <Heading
                  className={styles.title}
                  data-status={status}
                  level={0}
                  weight="bold"
                >
                  404
                </Heading>
                <Heading
                  aria-hidden
                  className={styles.subheading}
                  data-status={status}
                  as="h2"
                  level={3}
                >
                  <DecoderText
                    text="Error: Redacted"
                    start={status !== 'exited'}
                    delay={300}
                  />
                </Heading>
                <Text className={styles.description} data-status={status}>
                  This page could not be found. It either doesn’t exist or was deleted. Or
                  perhaps you don’t exist.
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className={styles.button}
                  data-status={status}
                  href="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div className={styles.videoContainer} data-status={status}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className={styles.video}
                data-status={status}
                poster={notFoundPoster.src}
              >
                <source src={notFoundVideo} type="video/mp4" />
              </video>
              <a
                className={styles.credit}
                data-status={status}
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
