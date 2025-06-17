import type { SVGProps } from 'react';
const SvgHomePage4 = (props: SVGProps<SVGSVGElement>) => (
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
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={5}
         d="m52 46-6 22M35 48l-8 9.5 8 9.5M63 67l9-9.5-9-9.5"
      />
      <rect
         width={78}
         height={61}
         x={11}
         y={20}
         className="stroke-primary"
         strokeWidth={5}
         rx={7}
      />
      <path strokeWidth={5} className='stroke-primary' d="M11 33.5h79" />
   </svg>
);
export default SvgHomePage4;
