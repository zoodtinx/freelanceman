
import type { SVGProps } from "react";
const SvgTick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="currentColor"
    viewBox="0 0 35 35"
    {...props}
  >
    <path
      d="M33.27 5.5c-.583-.583-1.458-.583-2.04 0L13.291 23.438 6.77 16.917c-.584-.584-1.459-.584-2.042 0-.583.583-.583 1.458 0 2.041l7.542 7.542c.291.292.583.438 1.02.438s.73-.146 1.021-.438L33.272 7.542c.583-.584.583-1.459 0-2.042"
    />
  </svg>
);
export default SvgTick;
