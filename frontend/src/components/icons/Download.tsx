import * as React from "react";
import type { SVGProps } from "react";
const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="currentColor"
    viewBox="0 0 35 35"
    {...props}
  >
    <path
      d="M16.564 23.709a1.32 1.32 0 0 0 1.872 0l6.59-6.591a1.323 1.323 0 1 0-1.871-1.872l-4.337 4.35V4.318a1.318 1.318 0 0 0-2.636 0v15.278l-4.337-4.35a1.324 1.324 0 0 0-1.872 1.872z"
    />
    <path
      d="M29.364 21.455a1.32 1.32 0 0 0-1.319 1.318v2.636a3.955 3.955 0 0 1-3.954 3.955H10.909a3.954 3.954 0 0 1-3.954-3.955v-2.636a1.318 1.318 0 1 0-2.637 0v2.636A6.59 6.59 0 0 0 10.91 32h13.182a6.59 6.59 0 0 0 6.59-6.59v-2.637a1.32 1.32 0 0 0-1.317-1.318"
    />
  </svg>
);
export default SvgDownload;
