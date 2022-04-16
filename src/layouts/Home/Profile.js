import KatakanaProfile from 'assets/katakana-profile.svg';
import profileImgLarge from 'assets/profile-large.jpg';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import profileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Fragment, useState } from 'react';
import { Transition } from 'react-transition-group';
import { media } from 'utils/style';
import { reflow } from 'utils/transition';
import styles from './Profile.module.css';

const ProfileText = ({ status, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-status={status} level={3} id={titleId}>
      <DecoderText text="Hi there" start={status !== 'exited'} delay={500} />
    </Heading>
    <Text className={styles.description} data-status={status} size="l">
      I’m Hamish, currently I live in Sydney working as a senior product designer at{' '}
      <Link href="https://www.qwilr.com">Qwilr</Link>. My projects include UX design, UI
      animations, and icon illustration. Being comfortable with code allows me to rapidly
      prototype and validate experiences. If you’re interested in the tools and software I
      use check out my <Link href="/uses">uses page</Link>.
    </Text>
    <Text className={styles.description} data-status={status} size="l">
      In my spare time I like to practice Brazilian Jiu Jitsu, play video games, and{' '}
      <Link href="/projects/volkihar-knight">make mods</Link>. I’m always down for hearing
      about new projects, so feel free to drop me a line.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0} onEnter={reflow}>
        {status => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText status={status} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-status={status}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-status={status}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  src={profileImg}
                  srcSet={`${profileImg.src} 480w, ${profileImgLarge.src} 960w`}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me standing in front of the Torii on Miyajima, an island off the coast of Hiroshima in Japan"
                />
                <KatakanaProfile className={styles.svg} data-status={status} />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
