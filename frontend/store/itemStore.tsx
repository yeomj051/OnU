import { create } from 'zustand';

type Item = {
  id: number; //itemId
  name: string; //제품명
  manufacturer?: string; //제조사
  imgUrl: string; //썸네일 이미지
  itemUrl: string; //상세정보 링크
};

type ItemState = {
  items: Array<Item>;

  setItems: (newItem: Item) => void;
  removeItem: (id: number) => void;
  resetItems: () => void;
};

export const itemStore = create<ItemState>((set) => ({
  items: [],

  setItems: (newItem: Item): void =>
    set((state: ItemState): { items: Array<Item> } => ({
      items: [...state.items, newItem],
    })),

  removeItem: (itemId: number): void =>
    set((state: ItemState): { items: Array<Item> } => ({
      items: state.items.filter((item: Item) => item.id !== itemId),
    })),

  resetItems: (): void =>
    set(() => ({
      items: [],
    })),
}));
