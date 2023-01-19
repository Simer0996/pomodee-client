import React from 'react';

const Bell = ({ size = 20, ...other }) => {
  return (
    <svg
      size={size}
      {...other}
      width="28"
      height="34"
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_122_259)">
        <path
          d="M12.893 11.3657H1.10695C0.4956 11.3657 0 11.8893 0 12.5351C0 13.1809 0.4956 13.7045 1.10695 13.7045H12.893C13.5044 13.7045 14 13.1809 14 12.5351C14 11.8893 13.5044 11.3657 12.893 11.3657Z"
          fill="#3928B1"
        />
        <path
          d="M6.99908 0C8.28753 0 9.52321 0.540699 10.4343 1.50315C11.3453 2.4656 11.8572 3.77096 11.8572 5.13208V11.4317H2.14966V5.13208C2.14966 3.77255 2.6603 2.46857 3.56949 1.50639C4.47869 0.544199 5.71214 0.00242772 6.99908 0V0Z"
          fill="#3928B1"
        />
        <path
          d="M6.99916 17.0001C7.53675 16.9997 8.05902 16.8109 8.48415 16.4633C8.90927 16.1157 9.21323 15.6289 9.34839 15.0793C9.36572 15.0026 9.36636 14.9229 9.35028 14.846C9.33419 14.7691 9.30179 14.697 9.25552 14.6352C9.20925 14.5735 9.15031 14.5236 9.08315 14.4894C9.01599 14.4552 8.94236 14.4375 8.86779 14.4377H5.13053C5.056 14.4375 4.98239 14.4551 4.91528 14.4893C4.84816 14.5235 4.7893 14.5734 4.74315 14.6353C4.697 14.6971 4.66479 14.7692 4.64893 14.8461C4.63308 14.923 4.63401 15.0028 4.65165 15.0793C4.78675 15.6286 5.09044 16.1152 5.51522 16.4627C5.93999 16.8103 6.46186 16.9993 6.99916 17.0001Z"
          fill="#3928B1"
        />
      </g>
      <defs>
        <clipPath id="clip0_122_259">
          <rect width="14" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Bell;
