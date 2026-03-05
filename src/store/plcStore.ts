import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PLCState {
  ip: string;
  brand: string;
  setPLCConfig: (ip: string, brand: string) => void;
  clearPLCConfig: () => void;
}

export const usePLCStore = create<PLCState>()(
  persist(
    (set) => ({
      ip: "",
      brand: "Keyence",

      setPLCConfig: (ip: string, brand: string) => {
        set({ ip, brand });
      },

      clearPLCConfig: () => {
        set({ ip: "", brand: "Keyence" });
      },
    }),
    {
      name: "plc-storage", // nombre de la clave en localStorage
    },
  ),
);
