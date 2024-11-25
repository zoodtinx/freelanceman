import type { SVGProps } from 'react';
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={35}
      fill="currentColor"
      viewBox="0 0 35 35"
      {...props}
   >
      <path d="M17.5 25.1955C17.0161 25.1955 16.5323 25.0107 16.1633 24.6419L4.55394 13.0324C3.81543 12.2939 3.81543 11.0966 4.55394 10.3583C5.29215 9.62013 6.48928 9.62013 7.22785 10.3583L17.5 20.6311L27.7722 10.3587C28.5107 9.62049 29.7077 9.62049 30.4459 10.3587C31.1847 11.0969 31.1847 12.2943 30.4459 13.0328L18.8366 24.6423C18.4675 25.0111 17.9837 25.1955 17.5 25.1955Z" />
   </svg>
);
export default SvgArrow;
