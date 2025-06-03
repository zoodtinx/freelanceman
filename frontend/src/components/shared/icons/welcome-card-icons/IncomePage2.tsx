import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIncomePage2 = (props: SVGProps<SVGSVGElement>) => (
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
         d="M75 44.703V36.43L57.713 20H33a7 7 0 0 0-7 7v48a7 7 0 0 0 7 7h9.66"
      />
      <path
         className="stroke-primary"
         strokeLinejoin="round"
         strokeWidth={5}
         d="M75 37H57V20zM74.517 55.845a4.952 4.952 0 0 1 7.003 7.003L61.135 83.232 50.866 86.5l3.267-10.27z"
      />
   </svg>
);
export default SvgIncomePage2;
