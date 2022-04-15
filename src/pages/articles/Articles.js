import { Image } from 'components/Image';
import { Section } from 'components/Section';
import Head from 'next/head';
import RouterLink from 'next/link';
import { Fragment, useState } from 'react';
import styles from './Articles.module.css';

const ArticlesPost = ({
  slug,
  title,
  description,
  banner,
  bannerPlaceholder,
  bannerAlt,
  date,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article className={styles.post}>
      <RouterLink href={`/articles/${slug}`}>
        <a
          className={styles.postContent}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.postImageWrapper}>
            <Image
              play={hovered}
              className={styles.postImage}
              src={banner}
              placeholder={{ src: bannerPlaceholder }}
              alt={bannerAlt}
            />
            <div className={styles.postImageTag}>K256</div>
          </div>
          <div className={styles.postText}>
            <span className={styles.postDate}>
              {new Date(date).toLocaleDateString('default', {
                year: 'numeric',
                month: 'long',
              })}
            </span>
            <h2 className={styles.postTitle}>{title}</h2>
            <p className={styles.postDescription}>{description}</p>
          </div>
        </a>
      </RouterLink>
    </article>
  );
};

export const Articles = ({ posts }) => {
  return (
    <div className={styles.articles}>
      <Head>
        <title>{`Articles | Hamish Williams Designer`}</title>
        <meta
          name="description"
          content="A collection of technical design and development articles."
        />
      </Head>
      <Section className={styles.content}>
        <div className={styles.column}>
          {posts.map(({ slug, ...post }, index) => (
            <Fragment key={slug}>
              {index !== 0 && <hr className={styles.divider} />}
              <ArticlesPost slug={slug} {...post} />
            </Fragment>
          ))}
        </div>
      </Section>
    </div>
  );
};
