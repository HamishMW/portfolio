import { Icon } from 'components/Icon';
import { Loader } from 'components/Loader';
import RouterLink from 'next/link';
import { forwardRef } from 'react';
import { classes } from 'utils/style';
import styles from './Button.module.css';

export const Button = forwardRef(({ href, ...rest }, ref) => {
  const isExternalLink = href?.includes('://');

  if (isExternalLink || !href) {
    return <ButtonContent href={href} ref={ref} {...rest} />;
  }

  return (
    <RouterLink passHref href={href} scroll={false}>
      <ButtonContent ref={ref} {...rest} />
    </RouterLink>
  );
});

const ButtonContent = forwardRef(
  (
    {
      className,
      as,
      secondary,
      loading,
      loadingText = 'loading',
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      ...rest
    },
    ref
  ) => {
    const isExternalLink = href?.includes('://');
    const defaultComponent = href ? 'a' : 'button';
    const Component = as || defaultComponent;

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        href={isExternalLink ? href : undefined}
        rel={rel || isExternalLink ? 'noopener noreferrer' : undefined}
        target={target || isExternalLink ? '_blank' : undefined}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className={styles.icon}
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && <span className={styles.text}>{children}</span>}
        {!!iconEnd && (
          <Icon
            className={styles.icon}
            data-end={!iconOnly}
            data-shift={iconHoverShift}
            icon={iconEnd}
          />
        )}
        {loading && <Loader className={styles.loader} size={32} text={loadingText} />}
      </Component>
    );
  }
);
