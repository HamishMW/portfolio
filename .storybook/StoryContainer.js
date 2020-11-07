import './StoryContainer.css';

export const StoryContainer = ({
  padding = 32,
  stretch,
  gutter = 32,
  vertical,
  children,
}) => (
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
