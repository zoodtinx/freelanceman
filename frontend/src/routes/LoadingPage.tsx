import SvgFreelancemanIcon from '@/components/shared/icons/FreelanceManIcon';

export const LoadingPage = () => {
   return (
      <div
         style={{ height: 'calc(var(--vh) * 100)' }}
         className="w-screen min-h-screen flex flex-col justify-center items-center bg-background gap-5"
      >
         <SvgFreelancemanIcon className="animate-bounce h-24 w-auto" />
      </div>
   );
};
