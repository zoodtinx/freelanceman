import * as React from "react";
import type { SVGProps } from "react";
const SvgDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="currentColor"
    viewBox="0 0 35 35"
    {...props}
  >
    <path
      d="M17.5 8.75a3.281 3.281 0 1 0 0-6.562 3.281 3.281 0 0 0 0 6.562M17.5 20.781a3.281 3.281 0 1 0 0-6.562 3.281 3.281 0 0 0 0 6.562M17.5 32.813a3.281 3.281 0 1 0 0-6.563 3.281 3.281 0 0 0 0 6.563"
    />
  </svg>
);
export default SvgDots;
