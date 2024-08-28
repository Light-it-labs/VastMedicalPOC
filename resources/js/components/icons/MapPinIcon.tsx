import type { IconProps } from "~/utils/types";

export const MapPinIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 5.5C10 8.5 6 11.5 6 11.5C6 11.5 2 8.5 2 5.5C2 4.43913 2.42143 3.42172 3.17157 2.67157C3.92172 1.92143 4.93913 1.5 6 1.5C7.06087 1.5 8.07828 1.92143 8.82843 2.67157C9.57857 3.42172 10 4.43913 10 5.5Z"
      stroke="#0C8FEB"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 7C6.82843 7 7.5 6.32843 7.5 5.5C7.5 4.67157 6.82843 4 6 4C5.17157 4 4.5 4.67157 4.5 5.5C4.5 6.32843 5.17157 7 6 7Z"
      stroke="#0C8FEB"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
