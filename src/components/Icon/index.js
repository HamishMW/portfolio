import React from 'react';
import classNames from 'classnames';
import Twitter from '/assets/icons/twitter.svg';
import Dribbble from '/assets/icons/dribbble.svg';
import Github from '/assets/icons/github.svg';
import Email from '/assets/icons/email.svg';
import Menu from '/assets/icons/menu.svg';
import ArrowRight from '/assets/icons/arrow-right.svg';
import ChevronRight from '/assets/icons/chevron-right.svg';
import Close from '/assets/icons/close.svg';
import Send from '/assets/icons/send.svg';
import Play from '/assets/icons/play.svg';
import Pause from '/assets/icons/pause.svg';
import Figma from '/assets/icons/figma.svg';
import './index.css';

export const icons = {
  twitter: Twitter,
  dribbble: Dribbble,
  github: Github,
  email: Email,
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
