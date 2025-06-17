import type { SVGProps } from 'react';
const SvgHomePage3 = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      fill='none'
      className='w-full h-full'
      viewBox="0 0 100 100" 
      {...props}
   >
      <rect
         width={24}
         height={37}
         x={7}
         y={49}
         className='stroke-primary'
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={5}
         rx={6}
      />
      <path
         className='stroke-primary'
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={5}
         d="M41 73h45a7 7 0 0 0 7-7V24a7 7 0 0 0-7-7H23a7 7 0 0 0-7 7v15.5M41 60h39M42.5 85.5h24M49.5 75.5v10M59.5 85.5v-10"
      />
   </svg>
);
export default SvgHomePage3;
