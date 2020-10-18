import React from 'react';
import './StoryContainer.css';

export const StoryContainer = ({ padding, stretch, gutter, vertical, children }) => (
  <div
    className="story-container"
    style={{
      padding,
      gap: gutter,
      flexDirection: vertical ? 'column' : 'row',
      alignItems: stretch ? 'stretch' : 'flex-start',
      justifyContent: stretch ? 'stretch' : 'flex-start',
    }}
  >
    {children}
  </div>
);
