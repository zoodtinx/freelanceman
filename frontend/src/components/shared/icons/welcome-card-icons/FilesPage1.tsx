import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFilesPage1 = (props: SVGProps<SVGSVGElement>) => (
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
         d="m37.824 45.8-2.328-4.836A7 7 0 0 0 29.19 37H21a7 7 0 0 0-7 7v30a7 7 0 0 0 7 7h40a7 7 0 0 0 7-7V52.8a7 7 0 0 0-7-7z"
      />
      <path
         className="stroke-primary"
         strokeWidth={5}
         d="M23 36.8V35a7 7 0 0 1 7-7h8.587a7 7 0 0 1 6.285 3.919l2.393 4.881H71a7 7 0 0 1 7 7V65a7 7 0 0 1-7 7h-2.706"
      />
      <path
         className="stroke-primary"
         strokeWidth={5}
         d="M33 27.8V26a7 7 0 0 1 7-7h8.189a7 7 0 0 1 6.307 3.964l2.328 4.836H80a7 7 0 0 1 7 7V56a7 7 0 0 1-7 7h-2.53"
      />
   </svg>
);
export default SvgFilesPage1;
