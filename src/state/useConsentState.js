import create from 'zustand';
import { persist } from 'zustand/middleware';

const useConsentState = create(
  persist(
    (set) => ({
      ytConsent: false,
      setYouTube: (nYT) => {
        set(() => ({
          ytConsent: nYT,
        }));
      },
    }),
    {
      name: 'consent-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useConsentState;
