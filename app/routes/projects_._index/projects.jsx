import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Link as RouterLink, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { classes, cssProps } from '~/utils/style';
import styles from './projects.module.css';

function ProjectCard({ slug, title, description, category, year, index, featured }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={styles.project}
      data-featured={featured}
      style={cssProps({ delay: index * 100 + 200 })}
    >
      {featured && (
        <Text className={styles.projectLabel} size="s">
          Featured
        </Text>
      )}
      <RouterLink
        unstable_viewTransition
        prefetch="intent"
        to={`/projects/${slug}`}
        className={styles.projectLink}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={styles.projectDetails}>
          <div aria-hidden className={styles.projectMeta}>
            <Divider notchWidth="64px" notchHeight="8px" />
            <span className={styles.projectCategory}>{category}</span>
            <span className={styles.projectYear}>{year}</span>
          </div>
          <Heading as="h2" level={featured ? 3 : 4}>
            {title}
          </Heading>
          <Text size={featured ? 'l' : 'm'} as="p">
            {description}
          </Text>
          <div className={styles.projectFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              View project
            </Button>
          </div>
        </div>
      </RouterLink>
    </article>
  );
}

export function Projects() {
  const { projects } = useLoaderData();
  const featured = projects.filter(p => p.featured);
  const other = projects.filter(p => !p.featured);

  return (
    <div className={styles.projects}>
      <Section className={styles.content}>
        <header className={styles.header}>
          <Heading className={styles.heading} level={2} as="h1">
            <DecoderText text="Projects" />
          </Heading>
          <Text size="xl" as="p" className={styles.description}>
            A collection of UX case studies, design systems, and product work. From user
            research to shipped products, each project showcases a different aspect of the
            design process.
          </Text>
        </header>

        {featured.length > 0 && (
          <div className={styles.list}>
            <Heading level={3} as="h2" className={styles.sectionHeading}>
              Featured Projects
            </Heading>
            {featured.map((project, index) => (
              <ProjectCard key={project.slug} index={index} {...project} />
            ))}
          </div>
        )}

        {other.length > 0 && (
          <div className={styles.list}>
            <Heading level={3} as="h2" className={styles.sectionHeading}>
              More Projects
            </Heading>
            {other.map((project, index) => (
              <ProjectCard key={project.slug} index={index + featured.length} {...project} />
            ))}
          </div>
        )}
      </Section>
      <Footer />
    </div>
  );
}
