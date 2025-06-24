import type { SVGProps } from 'react';
const SvgHomePage2 = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      fill="none"
      className="w-full h-full"
      viewBox="0 0 100 100"
      {...props}
   >
      <rect x="17" y="38" width="67" height="43" rx="7" stroke-width="5" className="stroke-primary" />
      <line
         x1="25.5"
         y1="28.5"
         x2="74.5"
         y2="28.5"
         stroke-width="5"
         className="stroke-primary"
         stroke-linecap="round"
      />
      <line
         x1="30.5"
         y1="18.5"
         x2="69.5"
         y2="18.5"
         stroke-width="5"
         className="stroke-primary"
         stroke-linecap="round"
      />
   </svg>
);
export default SvgHomePage2;
