import { forwardRef, useId } from 'react';
import { classes } from '~/utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="45"
      height="29"
      viewBox="0 0 46 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M16 28.5 23.2 10 33 28.6a.8.8 0 0 0 1.6-.1l3.3-8.9V19l-8-15.3a6.7 6.7 0 0 0-6-3.6h-4.5l-.4.1c-.4.2-.6.7-.4 1.1l3.7 7-3.7 9-7.1-13.6a6.7 6.7 0 0 0-6-3.6H.4C0 .3 0 .8.1 1.2l14.4 27.4.4.3c.5.2 1 0 1.1-.4ZM42 8.8c.2 0 .3-.3.4-.4L45 1a.8.8 0 0 0-.8-1.1h-6.6a.8.8 0 0 0-.7 1.2l3.9 7.3c.2.4.7.5 1 .3Z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
