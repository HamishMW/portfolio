import React from 'react';
import classNames from 'classnames';
import './index.css';

const Section = ({ as: Component = 'div', children, className }) => (
  <Component className={classNames('section', className)}>{children}</Component>
);

export default Section;
