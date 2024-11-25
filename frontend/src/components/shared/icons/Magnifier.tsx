
import type { SVGProps } from "react";
const SvgMagnifier = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="currentColor"
    viewBox="0 0 35 35"
    {...props}
  >
    <path
      d="m28.65 28.771-6.67-7.188a10.37 10.37 0 0 0 2.257-6.49C24.237 9.529 19.922 5 14.619 5 9.314 5 5 9.528 5 15.094s4.315 10.094 9.619 10.094a9.2 9.2 0 0 0 5.51-1.827l6.713 7.235a1.22 1.22 0 0 0 1.774.037 1.365 1.365 0 0 0 .034-1.862M14.62 7.633c3.92 0 7.109 3.347 7.109 7.46 0 4.115-3.19 7.461-7.11 7.461s-7.109-3.346-7.109-7.46 3.19-7.46 7.11-7.46"
    />
  </svg>
);
export default SvgMagnifier;
