import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet-async';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Notfound from 'assets/notfound.mp4';
import NotfoundPoster from 'assets/notfound.jpg';
import { reflow } from 'utils/transition';
import { Link } from 'react-router-dom';
import './index.css';

function NotFound() {
  return (
    <section className="404">
      <Helmet>
        <title tag="title">404 | Not Found</title>
        <meta name="description" content="404 page not found. This page doesn't exist" />
      </Helmet>
      <Transition appear in={true} timeout={0} onEnter={reflow}>
        {status => (
          <Fragment>
            <div className="404__details">
              <div className="404__text">
                <h1 className={classNames('404__title', `404__title--${status}`)}>404</h1>
                <h2
                  aria-hidden
                  className={classNames('404__subheading', `404__subheading--${status}`)}
                >
                  <DecoderText
                    text="Error: Redacted"
                    start={status !== 'exited'}
                    offset={100}
                  />
                </h2>
                <p
                  className={classNames(
                    '404__description',
                    `404__description--${status}`
                  )}
                >
                  This page could not be found. It either doesn’t exist or was deleted. Or
                  perhaps you don’t exist.
                </p>
                <Button
                  secondary
                  iconHoverShift
                  className={classNames('404__button', `404__button--${status}`)}
                  as={Link}
                  to="/"
                  icon="chevronRight"
                >
                  Back to homepage
                </Button>
              </div>
            </div>

            <div
              className={classNames(
                '404__video-container',
                `404__video-container--${status}`
              )}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className={classNames('404__video', `404__video--${status}`)}
                poster={NotfoundPoster}
              >
                <source src={Notfound} type="video/mp4" />
              </video>
              <a
                className={classNames('404__credit', `404__credit--${status}`)}
                href="https://twitter.com/ruinergame"
                target="_blank"
                rel="noopener noreferrer"
              >
                Animation from Ruiner
              </a>
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
  );
}

export default NotFound;
