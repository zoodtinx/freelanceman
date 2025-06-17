import type { SVGProps } from 'react';
const SvgActionsPage1 = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      fill='none'
      className='w-full h-full'
      viewBox="0 0 100 100" 
      {...props}
   >
      <path
      className='stroke-primary'
         strokeWidth={5}
         d="M64.5 19H68a7 7 0 0 1 7 7v51a7 7 0 0 1-7 7H31a7 7 0 0 1-7-7V26a7 7 0 0 1 7-7h4"
      />
      <path
      className='stroke-primary'
         strokeWidth={5}
         d="M35 19a5 5 0 0 1 5-5h19a5 5 0 0 1 0 10H40a5 5 0 0 1-5-5Z"
      />
      <path
      className='stroke-primary'
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={5}
         d="m40 53 7 6.5L60 44"
      />
   </svg>
);
export default SvgActionsPage1;
