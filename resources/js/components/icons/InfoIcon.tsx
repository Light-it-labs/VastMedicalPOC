import type { IconProps } from "~/utils/types";

export const InfoIcon = ({ className }: IconProps) => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g clipPath="url(#clip0_2401_8979)">
      <path
        d="M7.99967 18.6673C11.6816 18.6673 14.6663 15.6825 14.6663 12.0007C14.6663 8.31875 11.6816 5.33398 7.99967 5.33398C4.31778 5.33398 1.33301 8.31875 1.33301 12.0007C1.33301 15.6825 4.31778 18.6673 7.99967 18.6673Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14.6667V12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9.33398H8.00667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2401_8979">
        <rect width="16" height="16" fill="white" transform="translate(0 4)" />
      </clipPath>
    </defs>
  </svg>
);
