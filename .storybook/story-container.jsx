import './story-container.css';

export const StoryContainer = ({
  padding = 32,
  stretch,
  gutter = 32,
  vertical,
  children,
  style,
}) => (
  <div
    className="storyContainer"
    style={{
      padding,
      gap: gutter,
      flexDirection: vertical ? 'column' : 'row',
      alignItems: stretch ? 'stretch' : 'flex-start',
      justifyContent: stretch ? 'stretch' : 'flex-start',
      ...style,
    }}
  >
    {children}
  </div>
);
