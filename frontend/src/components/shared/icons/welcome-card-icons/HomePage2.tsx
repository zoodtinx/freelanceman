import type { SVGProps } from 'react';
const SvgHomePage2 = (props: SVGProps<SVGSVGElement>) => (
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
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={5}
         d="M10 48.185h11.666a5.906 5.906 0 0 0 5.906-5.907v-1.414c0-7.917 6.418-14.335 14.336-14.335v0c7.917 0 14.335 6.418 14.335 14.335v30.152C56.243 78.74 49.982 85 42.259 85H30.826c-7.416 0-13.427-6.011-13.427-13.427v0c0-7.415 6.011-13.426 13.427-13.426h24.29c8.284 0 15-6.716 15-15V30.904C70.116 23.225 63.89 17 56.21 17v0c-7.654 0-13.87 6.187-13.904 13.841l-.121 26.669c-.035 7.756 6.243 14.063 14 14.063H90m0 0s-4.408 4.562-6.936 6.93M90 71.573l-6.936-6.93"
      />
   </svg>
);
export default SvgHomePage2;
