import Barcode from 'assets/barcode.svg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from 'hooks';
import RouterLink from 'next/link';
import { useState } from 'react';
import { formateDate } from 'utils/date';
import { cssProps } from 'utils/style';
import styles from './Articles.module.css';

const ArticlesPost = ({
  slug,
  title,
  abstract,
  date,
  featured,
  banner,
  timecode,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article
      className={styles.post}
      data-featured={!!featured}
      style={cssProps({ delay: index * 100 + 200 })}
    >
      {featured && (
        <Text className={styles.postLabel} size="s">
          Featured
        </Text>
      )}
      {featured && !!banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={{ src: banner }}
            placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
            alt=""
            role="presentation"
          />
        </div>
      )}
      <RouterLink href={`/articles/${slug}`} scroll={false}>
        <a
          className={styles.postLink}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.postDetails}>
            <div aria-hidden className={styles.postDate}>
              <Divider notchWidth="64px" notchHeight="8px" />
              {formateDate(date)}
            </div>
            <Heading as="h2" level={featured ? 2 : 4}>
              {title}
            </Heading>
            <Text size={featured ? 'l' : 's'} as="p">
              {abstract}
            </Text>
            <div className={styles.postFooter}>
              <Button secondary iconHoverShift icon="chevronRight" as="div">
                Read article
              </Button>
              <Text className={styles.timecode} size="s">
                {timecode}
              </Text>
            </div>
          </div>
        </a>
      </RouterLink>
      {featured && (
        <Text aria-hidden className={styles.postTag} size="s">
          477
        </Text>
      )}
    </article>
  );
};

export const Articles = ({ posts, featured }) => {
  const { width } = useWindowSize();
  const singleColumnWidth = 1140;
  const isSingleColumn = width <= singleColumnWidth;

  const list = (
    <div className={styles.list}>
      <header className={styles.header}>
        <Heading className={styles.heading} level={5} as="h1">
          <DecoderText text="Latest articles" />
        </Heading>
        <Barcode />
      </header>
      {posts.map(({ slug, ...post }, index) => (
        <ArticlesPost key={slug} slug={slug} index={index} {...post} />
      ))}
      {posts.map(({ slug, ...post }, index) => (
        <ArticlesPost key={slug} slug={slug} index={index} {...post} />
      ))}
      {posts.map(({ slug, ...post }, index) => (
        <ArticlesPost key={slug} slug={slug} index={index} {...post} />
      ))}
    </div>
  );

  return (
    <article className={styles.articles}>
      <Meta
        title="Articles"
        description="A collection of technical design and development articles."
      />
      <Section className={styles.content}>
        {!isSingleColumn && (
          <div className={styles.grid}>
            {list}
            <ArticlesPost {...featured} />
          </div>
        )}
        {isSingleColumn && (
          <div className={styles.grid}>
            <ArticlesPost {...featured} />
            {list}
          </div>
        )}
      </Section>
      <Footer />
    </article>
  );
};
