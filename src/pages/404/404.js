import './404.css';

import NotfoundPoster from 'assets/notfound.jpg';
import Notfound from 'assets/notfound.mp4';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Transition } from 'react-transition-group';
import { reflow } from 'utils/transition';

export function Page404() {
  return (
    <section className="page-404">
      <Helmet>
        <title tag="title">404 | Not Found</title>
        <meta name="description" content="404 page not found. This page doesn't exist" />
      </Helmet>
      <Transition appear in={true} timeout={0} onEnter={reflow}>
        {status => (
          <Fragment>
            <div className="page-404__details">
              <div className="page-404__text">
                <Heading className="page-404__title" data-status={status} level={0}>
                  404
                </Heading>
                <Heading
                  aria-hidden
                  className="page-404__subheading"
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
                <Text className="page-404__description" data-status={status}>
                  This page could not be found. It either doesn’t exist or was deleted. Or
                  perhaps you don’t exist.
                </Text>
                <Button
                  secondary
                  iconHoverShift
                  className="page-404__button"
                  data-status={status}
                  href="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div className="page-404__video-container" data-status={status}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="page-404__video"
                data-status={status}
                poster={NotfoundPoster}
              >
                <source src={Notfound} type="video/mp4" />
              </video>
              <a
                className="page-404__credit"
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
