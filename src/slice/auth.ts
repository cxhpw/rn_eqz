import { StateCreator } from 'zustand';

type Auth = {
  signedIn: boolean;
  userInfo: UserInfo | null;
};
export type AuthSlice = {
  auth: Auth;
  set: (key: keyof Auth, value: boolean) => void;
  signOut: () => void;
};
export const createAuthSlice: StateCreator<AuthSlice> = (_set, _get) => {
  return {
    auth: {
      signedIn: false,
      userInfo: null,
    },
    set: (key, value) => {
      _set(prev => {
        const auth = { ...prev.auth };
        auth[`${key}`] = value;
        return {
          auth,
        };
      });
    },
    signOut: () => {
      _set({
        auth: {
          signedIn: false,
          userInfo: null,
        },
      });
    },
  };
};
