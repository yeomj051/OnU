import { create } from 'zustand';

type like = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

type likeState = {
  likeList: Array<like>;

  setLikes: (newlike: like) => void;
  removeLike: (nutrientId: number) => void;
  resetLikes: () => void;
};

export const likeStore = create<likeState>((set) => ({
  likeList: [],

  setLikes: (newLike: like): void =>
    set((state: likeState): { likeList: Array<like> } => ({
      likeList: [...state.likeList, newLike],
    })),

  removeLike: (likeId: number): void =>
    set((state: likeState): { likeList: Array<like> } => ({
      likeList: state.likeList.filter(
        (like: like) => like.nutrientId !== likeId,
      ),
    })),

  resetLikes: (): void =>
    set(() => ({
      likeList: [],
    })),
}));
