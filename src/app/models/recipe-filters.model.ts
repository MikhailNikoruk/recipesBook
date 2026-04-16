import { RecipeCategory, RecipeDiet, RecipeDifficulty } from './recipe.model';

export type RecipeFormatFilter = 'all' | 'food' | 'drink';
export type RecipeViewMode = 'grid' | 'list';
export type RecipeSort = 'popular' | 'newest' | 'time-asc' | 'time-desc' | 'calories-asc' | 'name-asc';

export interface RecipeFilters {
  search: string;
  category: RecipeCategory | 'all';
  difficulty: RecipeDifficulty | 'all';
  diet: RecipeDiet | 'all';
  format: RecipeFormatFilter;
  ingredient: string;
  favoritesOnly: boolean;
  maxCookingTime: number | null;
}

export const MAX_COOKING_TIME_OPTIONS: readonly number[] = [20, 30, 45, 60];
export const RECIPE_SORT_OPTIONS: readonly { value: RecipeSort; label: string }[] = [
  { value: 'popular', label: 'Сначала популярные' },
  { value: 'newest', label: 'Сначала новые' },
  { value: 'time-asc', label: 'По времени: быстрее' },
  { value: 'time-desc', label: 'По времени: дольше' },
  { value: 'calories-asc', label: 'По калориям' },
  { value: 'name-asc', label: 'По названию' },
];

export function createDefaultRecipeFilters(): RecipeFilters {
  return {
    search: '',
    category: 'all',
    difficulty: 'all',
    diet: 'all',
    format: 'all',
    ingredient: '',
    favoritesOnly: false,
    maxCookingTime: null,
  };
}
