import React from 'react';

const Monogram = ({className, color, highlight}) => (
  <svg className={className} fill={color || "white"} width="45" height="29" viewBox="0 0 45 29">
    <title>Hamish Williams Designer</title>
    <defs>
      <clipPath id="monogram-clip">
        <path d="M23.203 10.112l-7.18 18.35c-.167.433-.652.648-1.084.482-.19-.073-.35-.212-.44-.39L.092 1.23C-.12.82.033.313.443.097.57.033.7 0 .84 0h4.6c2.497 0 4.786 1.39 5.94 3.605l7.12 13.662 3.655-9.15-3.63-6.887c-.214-.41-.06-.917.35-1.133.12-.064.256-.097.39-.097h4.6c2.497 0 4.786 1.39 5.94 3.605L37.8 18.95c.11.21.124.462.04.686l-3.39 8.824c-.168.434-.65.65-1.084.483-.19-.073-.345-.212-.44-.39l-9.72-18.442zM42.277 8.36c-.07.19-.208.35-.387.446-.406.22-.914.07-1.135-.34L36.848 1.24c-.067-.123-.1-.26-.1-.4 0-.463.374-.838.836-.838h6.578c.1 0 .198.018.29.052.435.16.656.643.496 1.077l-2.67 7.23z" />
      </clipPath>
    </defs>
    <rect clipPath="url(#monogram-clip)" fill={color || 'white'} width="100%" height="100%" />
    {highlight &&
      <g clipPath="url(#monogram-clip)">
        <rect fill={highlight || 'white'} width="100%" height="100%" />
      </g>
    }
  </svg>
);

export default Monogram;