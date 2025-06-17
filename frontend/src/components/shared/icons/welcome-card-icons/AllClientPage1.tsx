import type { SVGProps } from 'react';
const SvgAllClientPage1 = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
   fill='none'
      className='w-full h-full'
      viewBox="0 0 100 100" 
      {...props}
   >
      <rect className='stroke-primary' width={77} height={53} x={11} y={30} strokeWidth={5} rx={7} />
      <path
         strokeWidth={5}
         className='stroke-primary'
         d="M64 30v-7a7 7 0 0 0-7-7H42a7 7 0 0 0-7 7v7M11 51l19.25 4.5 4.813 1.125L40.823 58M88 51l-19.25 4.5L58.176 58"
      />
      <rect className='stroke-primary' width={15} height={14} x={42} y={52} strokeWidth={5} rx={3} />
   </svg>
);
export default SvgAllClientPage1;
