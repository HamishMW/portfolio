import ArrowDown from 'assets/arrow-down.svg';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useParallax, useScrollToHash } from 'hooks';
import RouterLink from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { clamp } from 'utils/clamp';
import { formatDate } from 'utils/date';
import { cssProps, msToNum, numToMs } from 'utils/style';
import styles from './Post.module.css';

export const Post = ({ children, title, date, abstract, banner, timecode, ogImage }) => {
  const scrollToHash = useScrollToHash();
  const imageRef = useRef();
  const [dateTime, setDateTime] = useState(null);
  
  useEffect(() => {
    setDateTime(formatDate(date));
  }, [date, dateTime]);

  useParallax(0.004, value => {
    if (!imageRef.current) return;
    imageRef.current.style.setProperty('--blurOpacity', clamp(value, 0, 1));
  });

  const handleScrollIndicatorClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <article className={styles.post}>
      <Meta title={title} prefix="" description={abstract} ogImage={ogImage} />
      <Section>
        {banner && (
          <div className={styles.banner} ref={imageRef}>
            <div className={styles.bannerImage}>
              <Image
                role="presentation"
                src={{ src: banner }}
                placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
                alt=""
              />
            </div>
            <div className={styles.bannerImageBlur}>
              <Image
                role="presentation"
                src={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
                placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
                alt=""
              />
            </div>
          </div>
        )}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <Transition in timeout={msToNum(tokens.base.durationM)}>
              {visible => (
                <div className={styles.date}>
                  <Divider notchWidth="64px" notchHeight="8px" collapsed={!visible} />
                  <Text className={styles.dateText} data-visible={visible}>
                    {dateTime}
                  </Text>
                </div>
              )}
            </Transition>
            <Heading level={2} as="h1" className={styles.title} aria-label={title}>
              {title.split(' ').map((word, index) => (
                <span className={styles.titleWordWrapper} key={`${word}-${index}`}>
                  <span
                    className={styles.titleWord}
                    style={cssProps({ delay: numToMs(index * 100 + 100) })}
                    index={index}
                  >
                    {word}
                    {index !== title.split(' ').length - 1 ? ' ' : ''}
                  </span>
                </span>
              ))}
            </Heading>
            <div className={styles.details}>
              <RouterLink href="#postContent">
                <a
                  className={styles.arrow}
                  aria-label="Scroll to post content"
                  onClick={handleScrollIndicatorClick}
                >
                  <ArrowDown aria-hidden />
                </a>
              </RouterLink>
              <div className={styles.timecode}>{timecode}</div>
            </div>
          </div>
        </header>
      </Section>
      <Section className={styles.wrapper} id="postContent" tabIndex={-1}>
        <Text as="div" size="l" className={styles.content}>
          {children}
        </Text>
      </Section>
      <Footer />
    </article>
  );
};
