import type { SVGProps } from 'react';
const SvgMenuHamburger = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={35}
      viewBox="0 0 35 35"
      fill="currentColor"
      {...props}
   >
      <path d="M30.7917 19H4.20833C3.54133 19 3 18.328 3 17.5C3 16.672 3.54133 16 4.20833 16H30.7917C31.4587 16 32 16.672 32 17.5C32 18.328 31.4587 19 30.7917 19Z" />
      <path d="M30.7917 8H4.20833C3.54133 8 3 7.328 3 6.5C3 5.672 3.54133 5 4.20833 5H30.7917C31.4587 5 32 5.672 32 6.5C32 7.328 31.4587 8 30.7917 8Z" />
      <path d="M30.7917 30H4.20833C3.54133 30 3 29.328 3 28.5C3 27.672 3.54133 27 4.20833 27H30.7917C31.4587 27 32 27.672 32 28.5C32 29.328 31.4587 30 30.7917 30Z" />
   </svg>
);
export default SvgMenuHamburger;
