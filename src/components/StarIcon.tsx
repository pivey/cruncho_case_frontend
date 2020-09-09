import * as React from 'react';

const StarIcon = (props: any) => (
  <svg
    viewBox="0 0 64 64"
    aria-labelledby="title"
    aria-describedby="desc"
    {...props}
  >
    <path
      data-name="layer1"
      fill={props.fill}
      d="M64.04 24.805L41.504 22.13 32 1.511 22.494 22.13-.04 24.805l16.661 15.413-4.424 22.271L32 51.398l19.803 11.091-4.424-22.271L64.04 24.805z"
    />
  </svg>
);

export default StarIcon;
