import React from 'react';
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg';
import { ReactComponent as Dribbble } from 'assets/icons/dribbble.svg';
import { ReactComponent as Github } from 'assets/icons/github.svg';
import { ReactComponent as Email } from 'assets/icons/email.svg';
import { ReactComponent as Menu } from 'assets/icons/menu.svg';
import { ReactComponent as ArrowRight } from 'assets/icons/arrow-right.svg';
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as Send } from 'assets/icons/send.svg';
import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as Figma } from 'assets/icons/figma.svg';

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

const Icon = ({ icon, style, className }) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent aria-hidden style={style} fill="currentColor" className={className} />
  );
};

export default Icon;
