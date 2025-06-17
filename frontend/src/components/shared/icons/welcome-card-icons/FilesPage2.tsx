import type { SVGProps } from 'react';
const SvgFilesPage2 = (props: SVGProps<SVGSVGElement>) => (
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
         d="M24.676 68.05c-7 0-12.676-5.715-12.676-12.766 0-5.962 4.058-10.97 9.545-12.373a11 11 0 0 1-.038-.925c0-6.169 4.966-11.17 11.092-11.17 2.269 0 4.38.687 6.137 1.865 1.6-8.336 8.886-14.63 17.63-14.63 9.918 0 17.958 8.096 17.958 18.084q0 .648-.045 1.285C81.502 38.662 87 44.997 87 52.625S81.502 66.588 74.28 67.83"
      />
      <path
         className="stroke-primary"
         strokeLinecap="round"
         strokeWidth={5}
         d="m47.684 58.684 4.095-3.738a8.355 8.355 0 0 1 11.816 11.816L59.5 70.5M50.5 80l-3.616 3.473A8.355 8.355 0 1 1 35.07 71.657l3.615-3.473M54.046 64.631l-9.293 9.293"
      />
   </svg>
);
export default SvgFilesPage2;
