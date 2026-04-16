export type RecipeCategory = 'breakfast' | 'soup' | 'main' | 'dessert' | 'drink';
export type RecipeDifficulty = 'easy' | 'medium' | 'hard';

export interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  category: RecipeCategory;
  cookingTime: number;
  difficulty: RecipeDifficulty;
  isDrink: boolean;
  ingredients: readonly string[];
  steps: readonly string[];
  servings: number;
  tags: readonly string[];
}

export const RECIPE_CATEGORIES: readonly RecipeCategory[] = [
  'breakfast',
  'soup',
  'main',
  'dessert',
  'drink',
];

export const RECIPE_DIFFICULTIES: readonly RecipeDifficulty[] = ['easy', 'medium', 'hard'];

export const RECIPE_CATEGORY_LABELS: Readonly<Record<RecipeCategory, string>> = {
  breakfast: 'Завтрак',
  soup: 'Суп',
  main: 'Основное',
  dessert: 'Десерт',
  drink: 'Напиток',
};

export const RECIPE_DIFFICULTY_LABELS: Readonly<Record<RecipeDifficulty, string>> = {
  easy: 'Легко',
  medium: 'Средне',
  hard: 'Сложно',
};
