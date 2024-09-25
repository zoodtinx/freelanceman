import * as React from "react";
import type { SVGProps } from "react";
const SvgCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="currentColor"
    viewBox="0 0 35 35"
    {...props}
  >
    <path
      d="M27.427 9.635a1.458 1.458 0 0 0-2.062-2.062L17.5 15.438 9.635 7.573a1.458 1.458 0 1 0-2.062 2.062l7.865 7.865-7.865 7.865a1.458 1.458 0 1 0 2.062 2.062l7.865-7.865 7.865 7.865a1.458 1.458 0 0 0 2.062-2.062L19.562 17.5z"
    />
  </svg>
);
export default SvgCross;
