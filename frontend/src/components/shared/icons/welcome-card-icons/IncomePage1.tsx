import type { SVGProps } from 'react';
const SvgIncomePage1 = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      fill="none"
      className="w-full h-full"
      viewBox="0 0 100 100"
      {...props}
   >
      <path
         className="stroke-primary"
         strokeWidth={5}
         d="M21 42v35a7 7 0 0 0 7 7h43a7 7 0 0 0 7-7V54.25a7 7 0 0 0-7-7H35.51"
      />
      <path
         className="stroke-primary"
         strokeLinecap="round"
         strokeWidth={5}
         d="M30.888 36H26.5a5.5 5.5 0 0 0-5.5 5.5v0a5.5 5.5 0 0 0 5.5 5.5H72v-4a7 7 0 0 0-7-7h-1.847"
      />
      <path
         className="stroke-primary"
         strokeWidth={5}
         d="M63 65.5a5.5 5.5 0 0 1 5.5-5.5H78v11h-9.5a5.5 5.5 0 0 1-5.5-5.5Z"
      />
      <path
         className="stroke-primary"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={5}
         d="M47 35 36 24.964M47 35l11-10.036M47 35V12"
      />
   </svg>
);
export default SvgIncomePage1;
