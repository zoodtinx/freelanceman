import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface DarkModeState {
   mode: ThemeMode;
   toggle: () => void;
   setMode: (mode: ThemeMode) => void;
}

const getSystemTheme = (): ThemeMode => {
   if (typeof window === 'undefined') return 'light';
   return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
};

export const useDarkMode = create<DarkModeState>((set) => {
   const initialMode = getSystemTheme();

   if (typeof window !== 'undefined') {
      if (initialMode === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }

      window
         .matchMedia('(prefers-color-scheme: dark)')
         .addEventListener('change', (e) => {
            const newMode: ThemeMode = e.matches ? 'dark' : 'light';
            if (newMode === 'dark') {
               document.documentElement.classList.add('dark');
            } else {
               document.documentElement.classList.remove('dark');
            }
            set({ mode: newMode });
         });
   }

   return {
      mode: initialMode,
      toggle: () =>
         set((state) => {
            const newMode: ThemeMode = state.mode === 'dark' ? 'light' : 'dark';
            if (newMode === 'dark') {
               document.documentElement.classList.add('dark');
            } else {
               document.documentElement.classList.remove('dark');
            }
            return { mode: newMode };
         }),
      setMode: (mode: ThemeMode) => {
         if (mode === 'dark') {
            document.documentElement.classList.add('dark');
         } else {
            document.documentElement.classList.remove('dark');
         }
         set({ mode });
      },
   };
});
