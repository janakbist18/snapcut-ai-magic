import { create } from "zustand";

interface AppState {
  user: { email: string; credits: number; plan: string } | null;
  isProcessing: boolean;
  originalImage: string | null;
  processedImage: string | null;
  setUser: (user: AppState["user"]) => void;
  setProcessing: (v: boolean) => void;
  setOriginalImage: (url: string | null) => void;
  setProcessedImage: (url: string | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isProcessing: false,
  originalImage: null,
  processedImage: null,
  setUser: (user) => set({ user }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setOriginalImage: (originalImage) => set({ originalImage, processedImage: null }),
  setProcessedImage: (processedImage) => set({ processedImage }),
  reset: () => set({ originalImage: null, processedImage: null, isProcessing: false }),
}));
