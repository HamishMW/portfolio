import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import { blurOnMouseUp } from 'utils/focus';
import './index.css';

const Link = ({ rel, target, children, secondary, className, href, as, ...rest }) => {
  const isAnchor = href?.includes('://') || href?.[0] === '#';
  const relValue = rel || isAnchor ? 'noreferrer noopener' : undefined;
  const targetValue = target || isAnchor ? '_blank' : undefined;
  const Component = as || isAnchor ? 'a' : RouterLink;

  return (
    <Component
      className={classNames('link', className, { 'link--secondary': secondary })}
      rel={relValue}
      href={isAnchor ? href : undefined}
      to={!isAnchor ? href : undefined}
      target={targetValue}
      onMouseUp={blurOnMouseUp}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Link;
