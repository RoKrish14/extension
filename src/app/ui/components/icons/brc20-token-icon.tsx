import { Square, SquareProps } from 'leather-styles/jsx';

import { Svg } from '../svg';

export function Brc20TokenIcon({ size = 'xl', ...rest }: SquareProps) {
  return (
    <Square size={size} {...rest}>
      <Svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_3035_49755)">
          <circle cx="18" cy="18" r="18" fill="url(#paint0_radial_3035_49755)" />
          <path
            d="M6.87207 16.875V8.29129H10.2696C11.3196 8.29129 12.0771 8.52379 12.5421 8.98879C12.8946 9.34129 13.0708 9.82504 13.0708 10.44C13.0708 10.935 12.9583 11.355 12.7333 11.7C12.5158 12.0375 12.2046 12.2588 11.7996 12.3638C12.3471 12.4538 12.7671 12.675 13.0596 13.0275C13.3596 13.3725 13.5096 13.8225 13.5096 14.3775C13.5096 14.7675 13.4383 15.12 13.2958 15.435C13.1608 15.75 12.9771 16.005 12.7446 16.2C12.4146 16.4625 12.0358 16.6425 11.6083 16.74C11.1883 16.83 10.7908 16.875 10.4158 16.875H6.87207ZM10.1683 11.8575C10.5808 11.8575 10.8958 11.7675 11.1133 11.5875C11.3308 11.4 11.4396 11.1338 11.4396 10.7888C11.4396 10.4513 11.3383 10.2038 11.1358 10.0463C11.0158 9.94129 10.8546 9.86629 10.6521 9.82129C10.4571 9.76879 10.2096 9.74254 9.90957 9.74254H8.49207V11.8575H10.1683ZM10.2133 15.4238C10.4983 15.4238 10.7533 15.4013 10.9783 15.3563C11.2108 15.3113 11.4058 15.2213 11.5633 15.0863C11.7733 14.9138 11.8783 14.6363 11.8783 14.2538C11.8783 13.8113 11.7433 13.5225 11.4733 13.3875C11.2033 13.245 10.8433 13.1738 10.3933 13.1738H8.49207V15.4238H10.2133Z"
            fill="white"
          />
          <path
            d="M21.1173 16.875H19.396L18.0348 13.4438H16.1223V16.875H14.5023V8.29129H18.2035C19.0435 8.29129 19.7073 8.50129 20.1948 8.92129C20.6823 9.33379 20.926 9.96754 20.926 10.8225C20.926 11.3775 20.806 11.8538 20.566 12.2513C20.3335 12.6488 20.0035 12.9488 19.576 13.1513L21.1173 16.875ZM16.1223 9.74254V12.0263H17.9785C18.4135 12.0263 18.7435 11.9288 18.9685 11.7338C19.201 11.5388 19.3173 11.2538 19.3173 10.8788C19.3173 10.5113 19.201 10.23 18.9685 10.035C18.736 9.84004 18.406 9.74254 17.9785 9.74254H16.1223Z"
            fill="white"
          />
          <path
            d="M25.8699 17.0325C24.9549 17.0325 24.1861 16.8338 23.5636 16.4363C22.9411 16.0313 22.4761 15.4913 22.1686 14.8163C21.8611 14.1413 21.7074 13.395 21.7074 12.5775C21.7074 11.76 21.8611 11.0175 22.1686 10.35C22.4761 9.67504 22.9411 9.13879 23.5636 8.74129C24.1861 8.33629 24.9549 8.13379 25.8699 8.13379C26.9049 8.13379 27.7411 8.39254 28.3786 8.91004C29.0161 9.42754 29.3949 10.1175 29.5149 10.98H27.7486C27.6736 10.53 27.4636 10.185 27.1186 9.94504C26.7736 9.70504 26.3424 9.58504 25.8249 9.58504C25.0524 9.58504 24.4524 9.85879 24.0249 10.4063C23.6049 10.9463 23.3949 11.67 23.3949 12.5775C23.3949 13.4925 23.6049 14.2238 24.0249 14.7713C24.4524 15.3113 25.0524 15.5813 25.8249 15.5813C26.3499 15.5813 26.7811 15.4575 27.1186 15.21C27.4561 14.955 27.6661 14.58 27.7486 14.085H29.5149C29.3949 14.9925 29.0161 15.7125 28.3786 16.245C27.7486 16.77 26.9124 17.0325 25.8699 17.0325Z"
            fill="white"
          />
          <path
            d="M11.6646 28.125V26.8988L14.3534 24.5363C14.8859 24.0713 15.2796 23.6475 15.5346 23.265C15.7971 22.875 15.9284 22.485 15.9284 22.095C15.9284 21.69 15.8196 21.3713 15.6021 21.1388C15.3921 20.8988 15.0659 20.7788 14.6234 20.7788C13.6634 20.7788 13.1571 21.3713 13.1046 22.5563H11.6084C11.6459 21.5363 11.9234 20.7563 12.4409 20.2163C12.9659 19.6688 13.7009 19.395 14.6459 19.395C15.1859 19.395 15.6659 19.5 16.0859 19.71C16.5059 19.9125 16.8321 20.2088 17.0646 20.5988C17.3046 20.9813 17.4246 21.4313 17.4246 21.9488C17.4246 22.6163 17.2296 23.2425 16.8396 23.8275C16.4571 24.405 15.9734 24.9563 15.3884 25.4813L14.0496 26.6738H17.7959V28.125H11.6646Z"
            fill="white"
          />
          <path
            d="M21.6732 28.2825C19.5732 28.2825 18.5232 26.79 18.5232 23.805C18.5232 22.2825 18.7932 21.165 19.3332 20.4525C19.8732 19.74 20.6419 19.3838 21.6394 19.3838C23.7319 19.3838 24.7782 20.8763 24.7782 23.8613C24.7782 26.8088 23.7432 28.2825 21.6732 28.2825ZM21.6394 26.8313C22.1269 26.8313 22.5019 26.6063 22.7644 26.1563C23.0269 25.7063 23.1582 24.9338 23.1582 23.8388C23.1582 22.7438 23.0232 21.9713 22.7532 21.5213C22.4832 21.0713 22.1044 20.8463 21.6169 20.8463C21.1294 20.8463 20.7619 21.0713 20.5144 21.5213C20.2669 21.9638 20.1432 22.7325 20.1432 23.8275C20.1432 24.93 20.2707 25.7063 20.5257 26.1563C20.7807 26.6063 21.1519 26.8313 21.6394 26.8313Z"
            fill="white"
          />
        </g>
        <defs>
          <radialGradient
            id="paint0_radial_3035_49755"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(-6.09579 -10.5122) rotate(52.1588) scale(68.6185 68.3841)"
          >
            <stop stopColor="#FFE600" />
            <stop offset="0.692401" stopColor="#FF417A" />
            <stop offset="1" stopColor="#A50031" />
          </radialGradient>
          <clipPath id="clip0_3035_49755">
            <rect width="36" height="36" rx="4" fill="white" />
          </clipPath>
        </defs>
      </Svg>
    </Square>
  );
}
