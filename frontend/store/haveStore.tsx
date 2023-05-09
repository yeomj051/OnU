import { create } from 'zustand';

type Have = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

type HaveState = {
  HaveList: Array<Have>;

  setHaves: (newHave: Have) => void;
  removeHave: (nutrientId: number) => void;
  resetHaves: () => void;
};

export const HaveStore = create<HaveState>((set) => ({
  HaveList: [],

  setHaves: (newHave: Have): void =>
    set((state: HaveState): { HaveList: Array<Have> } => ({
      HaveList: [...state.HaveList, newHave],
    })),

  removeHave: (HaveId: number): void =>
    set((state: HaveState): { HaveList: Array<Have> } => ({
      HaveList: state.HaveList.filter(
        (Have: Have) => Have.nutrientId !== HaveId,
      ),
    })),

  resetHaves: (): void =>
    set(() => ({
      HaveList: [],
    })),
}));
