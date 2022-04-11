import './Divider.css';

import { classes, cssProps, numToMs } from 'utils/style';

export const Divider = ({
  lineWidth,
  lineHeight,
  notchWidth,
  notchHeight,
  collapseDelay,
  collapsed,
  className,
  style,
  ...rest
}) => (
  <div
    className={classes('divider', className)}
    style={cssProps(
      {
        lineWidth: lineWidth,
        lineHeight: lineHeight,
        notchWidth: notchWidth,
        notchHeight: notchHeight,
        collapseDelay: numToMs(collapseDelay),
      },
      style
    )}
    {...rest}
  >
    <div className="divider__line" data-collapsed={collapsed} />
    <div
      className="divider__notch"
      data-collapsed={collapsed}
      style={cssProps({ collapseDelay: numToMs(collapseDelay + 160) })}
    />
  </div>
);

Divider.defaultProps = {
  lineWidth: '100%',
  lineHeight: '2px',
  notchWidth: '90px',
  notchHeight: '10px',
  collapsed: false,
  collapseDelay: 0,
};
