import { create } from 'zustand';

type Ingredient = {
  ingredientId: number;
  ingredientName: string;
  ingredientAmount: string;
};

type have = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
  nutrientIngredientList: Array<Ingredient>;
};

type haveState = {
  haveList: Array<have>;

  sethaves: (newhave: have) => void;
  removehave: (nutrientId: number) => void;
  resethaves: () => void;
};

export const haveStore = create<haveState>((set) => ({
  haveList: [],

  sethaves: (newhave: have): void =>
    set((state: haveState): { haveList: Array<have> } => ({
      haveList: [...state.haveList, newhave],
    })),

  removehave: (haveId: number): void =>
    set((state: haveState): { haveList: Array<have> } => ({
      haveList: state.haveList.filter(
        (have: have) => have.nutrientId !== haveId,
      ),
    })),

  resethaves: (): void =>
    set(() => ({
      haveList: [],
    })),
}));
