import type { SVGProps } from 'react';
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={35}
      fill="currentColor"
      viewBox="0 0 35 35"
      {...props}
   >
      <path d="M31.3158 14.3158H19.6842V2.68421C19.6842 1.20408 18.4801 0 17 0C15.5199 0 14.3158 1.20408 14.3158 2.68421V14.3158H2.68421C1.20408 14.3158 0 15.5199 0 17C0 18.4801 1.20408 19.6842 2.68421 19.6842H14.3158V31.3158C14.3158 32.7959 15.5199 34 17 34C18.4801 34 19.6842 32.7959 19.6842 31.3158V19.6842H31.3158C32.7959 19.6842 34 18.4801 34 17C34 15.5199 32.7959 14.3158 31.3158 14.3158Z" />
   </svg>
);
export default SvgPlus;
