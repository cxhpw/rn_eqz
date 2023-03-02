import { StateCreator } from 'zustand';

export type ErrorSlice = {
  error: any;
  setError: (error: any) => void;
};
export const createErrorSlice: StateCreator<ErrorSlice> = set => ({
  setError(error) {
    set(error);
  },
  error: {},
});
