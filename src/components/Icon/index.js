import classNames from 'classnames';
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg';
import { ReactComponent as Dribbble } from 'assets/icons/dribbble.svg';
import { ReactComponent as Github } from 'assets/icons/github.svg';
import { ReactComponent as Error } from 'assets/icons/error.svg';
import { ReactComponent as Menu } from 'assets/icons/menu.svg';
import { ReactComponent as ArrowRight } from 'assets/icons/arrow-right.svg';
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as Send } from 'assets/icons/send.svg';
import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as Figma } from 'assets/icons/figma.svg';
import './index.css';

export const icons = {
  twitter: Twitter,
  dribbble: Dribbble,
  github: Github,
  error: Error,
  menu: Menu,
  arrowRight: ArrowRight,
  chevronRight: ChevronRight,
  close: Close,
  send: Send,
  play: Play,
  pause: Pause,
  figma: Figma,
};

const Icon = ({ icon, style, className, ...rest }) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent aria-hidden className={classNames('icon', className)} {...rest} />
  );
};

export default Icon;
