import { forwardRef, useId } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (

<svg
    aria-hidden
    className={classes(styles.monogram, className)}
    width="46" height="29"
    viewBox="-20 -10 300 40"
    ref={ref}
    {...props}>
    <path d="M105.5-.5h3a219.748 219.748 0 0 1 6 19 185.59 185.59 0 0 0 11-1c1.874-14.847 2.874-15.18 3-1a4730.776 4730.776 0 0 0 78-12l4 1a3268.727 3268.727 0 0 0 14 18v4a153435.985 153435.985 0 0 0-117 80l-1-1.5A757.342 757.342 0 0 0 117 52.5a5535.551 5535.551 0 0 0-28.5 58h-1a1414.39 1414.39 0 0 1 4-28c-25.08 4.15-50.08 8.816-75 14a189.654 189.654 0 0 1-17-20v-3a5869.905 5869.905 0 0 0 106-74Zm0 24h18a137.836 137.836 0 0 1-5 21.5l-48 16a295.714 295.714 0 0 0 24 4 60.013 60.013 0 0 0-2 13.5 670.076 670.076 0 0 1-61-3.5A7551.731 7551.731 0 0 1 97 24.5c3.238 2.749 6.071 2.415 8.5-1Zm24 0c21.261.822 42.594 1.322 64 1.5L131 71.5a552.243 552.243 0 0 1-1.5-48Z"/>
</svg>

  );
});

/*    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="46"
      height="29"
      viewBox="0 0 46 29"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M16.525 28.462l7.18-18.35.003-.001 9.72 18.442a.838.838 0 001.524-.093l3.39-8.824a.846.846 0 00-.04-.686L30.307 3.605A6.698 6.698 0 0024.367 0h-4.6a.84.84 0 00-.74 1.23l3.63 6.887-3.655 9.15-7.12-13.662A6.698 6.698 0 005.942 0h-4.6a.842.842 0 00-.748 1.23L15 28.554a.839.839 0 001.524-.092zM42.392 8.806a.835.835 0 00.387-.446v.001l2.67-7.23a.838.838 0 00-.785-1.129h-6.578a.837.837 0 00-.736 1.238l3.907 7.226c.22.41.729.56 1.135.34z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg> */
