import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckbox = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="currentColor"
    viewBox="0 0 35 35"
    {...props}
  >
    <path
      d="M24.304 13.88a1.318 1.318 0 0 0-1.864-1.865l-6.963 6.962-2.903-2.993a1.318 1.318 0 0 0-1.892 1.835l3.834 3.955a1.32 1.32 0 0 0 1.879.014z"
    />
    <path
      fillRule="evenodd"
      d="M8.273 3C5.388 3 3 5.388 3 8.273v18.454C3 29.612 5.388 32 8.273 32h18.454C29.612 32 32 29.612 32 26.727V8.273C32 5.388 29.612 3 26.727 3zM5.636 8.273c0-1.43 1.208-2.637 2.637-2.637h18.454c1.43 0 2.637 1.208 2.637 2.637v18.454c0 1.43-1.208 2.637-2.637 2.637H8.273c-1.43 0-2.637-1.208-2.637-2.637z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheckbox;
