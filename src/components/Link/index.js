import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import { blurOnMouseUp } from 'utils/focus';
import './index.css';

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg'];

const Link = ({ rel, target, children, secondary, className, href, as, ...rest }) => {
  const isValidExtension = VALID_EXT.includes(href?.split('.').pop());
  const isAnchor = href?.includes('://') || href?.[0] === '#' || isValidExtension;
  const relValue = rel || (isAnchor ? 'noreferrer noopener' : undefined);
  const targetValue = target || (isAnchor ? '_blank' : undefined);
  const Component = as || (isAnchor ? 'a' : RouterLink);

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
