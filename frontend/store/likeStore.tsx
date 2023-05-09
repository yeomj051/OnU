import { create } from 'zustand';

type Ingredient = {
  ingredientId: number;
  ingredientName: String;
  ingredientAmount: String;
};

type Like = {
  nutrientId: number;
  nutrientName: String;
  nutrientImageUrl: String;
  nutrientBrand: String;
  nutrientIngredientList: Array<Ingredient>;
};

type LikeState = {
  likeList: Array<Like>;

  setLikes: (newLike: Like) => void;
  removeLike: (nutrientId: number) => void;
  resetLikes: () => void;
};

export const likeStore = create<LikeState>((set) => ({
  likeList: [],

  setLikes: (newLike: Like): void =>
    set((state: LikeState): { likeList: Array<Like> } => ({
      likeList: [...state.likeList, newLike],
    })),

  removeLike: (likeId: number): void =>
    set((state: LikeState): { likeList: Array<Like> } => ({
      likeList: state.likeList.filter(
        (like: Like) => like.nutrientId !== likeId,
      ),
    })),

  resetLikes: (): void =>
    set(() => ({
      likeList: [],
    })),
}));
