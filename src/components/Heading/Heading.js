import './Heading.css';

import GothamBold from 'assets/fonts/gotham-bold.woff2';
import classNames from 'classnames';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

export const Heading = ({
  children,
  level = 1,
  as,
  align = 'auto',
  weight = 'medium',
  className,
  ...rest
}) => {
  const clampedLevel = Math.min(Math.max(level, 0), 4);
  const Component = as || `h${Math.max(clampedLevel, 1)}`;

  return (
    <Fragment>
      {/* Conditionally load the bold font weight because we use it less frequently */}
      {weight === 'bold' && (
        <Helmet>
          <link rel="preload" href={GothamBold} as="font" crossorigin="" />
          <style>
            {`
              @font-face {
                font-family: 'Gotham';
                font-weight: 700;
                src: url(${GothamBold}) format('woff2');
                font-display: swap;
              }
            `}
          </style>
        </Helmet>
      )}
      <Component
        className={classNames(
          className,
          'heading',
          `heading--align-${align}`,
          `heading--level-${clampedLevel}`,
          `heading--weight-${weight}`
        )}
        {...rest}
      >
        {children}
      </Component>
    </Fragment>
  );
};
