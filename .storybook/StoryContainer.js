import React from 'react';
import './StoryContainer.css';

export const StoryContainer = ({ padding, gutter, fullWidth, children }) => (
  <div
    className="story-container"
    style={{
      padding,
      gridGap: gutter,
      gridAutoColumns: fullWidth ? '100%' : 'max-content',
    }}
  >
    {children}
  </div>
);
