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
import RouterLink from 'next/link';
import { Fragment, useState } from 'react';
import styles from './Articles.module.css';

const ArticlesPost = ({ slug, title, abstract, date, featured, banner, timecode }) => {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article className={styles.post} data-featured={featured}>
      <RouterLink href={`/articles/${slug}`} scroll={false}>
        <a
          data-featured={!!featured}
          className={styles.postContent}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {featured && (
            <Text className={styles.postLabel} size="s">
              Featured
            </Text>
          )}
          {featured && !!banner && (
            <div className={styles.postImage}>
              <Image
                play={!reduceMotion ? hovered : undefined}
                src={{ src: banner }}
                placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
                alt=""
                role="presentation"
              />
            </div>
          )}
          <div className={styles.postDetails}>
            <div aria-hidden className={styles.postDate}>
              <Divider notchWidth="64px" notchHeight="8px" />
              {new Date(date).toLocaleDateString('default', {
                year: 'numeric',
                month: 'long',
              })}
            </div>
            <Heading level={featured ? 2 : 4}>{title}</Heading>
            <Text size="m" as="p">
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
          {featured && (
            <Text aria-hidden className={styles.postTag} size="s">
              477
            </Text>
          )}
        </a>
      </RouterLink>
    </article>
  );
};

export const Articles = ({ posts, featured }) => {
  return (
    <article className={styles.articles}>
      <Meta
        title="Articles"
        description="A collection of technical design and development articles."
      />
      <Section className={styles.content}>
        <header className={styles.header}>
          <Heading className={styles.heading} level={5} as="h1">
            <DecoderText text="Latest articles" />
          </Heading>
          <Barcode />
        </header>
        <ArticlesPost {...featured} />
        <div className={styles.list}>
          {posts.map(({ slug, ...post }, index) => (
            <Fragment key={slug}>
              {index !== 0 && <hr className={styles.divider} />}
              <ArticlesPost slug={slug} {...post} />
            </Fragment>
          ))}
        </div>
      </Section>
      <Footer />
    </article>
  );
};
