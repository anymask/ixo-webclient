import React from 'react';

const Location = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 24}
      viewBox="0 0 34 34"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4783 6C13.2213 6 9.77826 9.443 9.77826 13.7C9.77826 19.475 17.4783 28 17.4783 28C17.4783 28 25.1783 19.475 25.1783 13.7C25.1783 9.443 21.7353 6 17.4783 6ZM17.4783 16.45C15.9603 16.45 14.7283 15.218 14.7283 13.7C14.7283 12.182 15.9603 10.95 17.4783 10.95C18.9963 10.95 20.2283 12.182 20.2283 13.7C20.2283 15.218 18.9963 16.45 17.4783 16.45Z"
        fill={props.fill || '#fff'}
      />
    </svg>
  );
};

export default Location;
