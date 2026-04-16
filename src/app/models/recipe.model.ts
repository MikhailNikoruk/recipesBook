export type RecipeCategory =
  | 'breakfast'
  | 'soup'
  | 'main'
  | 'meat'
  | 'fish'
  | 'salad'
  | 'dessert'
  | 'drink';
export type RecipeDifficulty = 'easy' | 'medium' | 'hard';
export type RecipeDiet = 'vegetarian' | 'high-protein' | 'gluten-free' | 'light' | 'comfort';

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
  calories: number;
  diet: readonly RecipeDiet[];
  tags: readonly string[];
}

export const RECIPE_CATEGORIES: readonly RecipeCategory[] = [
  'breakfast',
  'soup',
  'main',
  'meat',
  'fish',
  'salad',
  'dessert',
  'drink',
];

export const RECIPE_DIFFICULTIES: readonly RecipeDifficulty[] = ['easy', 'medium', 'hard'];
export const RECIPE_DIETS: readonly RecipeDiet[] = [
  'vegetarian',
  'high-protein',
  'gluten-free',
  'light',
  'comfort',
];

export const RECIPE_CATEGORY_LABELS: Readonly<Record<RecipeCategory, string>> = {
  breakfast: 'Завтрак',
  soup: 'Суп',
  main: 'Основное',
  meat: 'Мясо',
  fish: 'Рыба',
  salad: 'Салат',
  dessert: 'Десерт',
  drink: 'Напиток',
};

export const RECIPE_DIFFICULTY_LABELS: Readonly<Record<RecipeDifficulty, string>> = {
  easy: 'Легко',
  medium: 'Средне',
  hard: 'Сложно',
};

export const RECIPE_DIET_LABELS: Readonly<Record<RecipeDiet, string>> = {
  vegetarian: 'Вегетарианское',
  'high-protein': 'Белковое',
  'gluten-free': 'Без глютена',
  light: 'Лёгкое',
  comfort: 'Комфортная еда',
};
