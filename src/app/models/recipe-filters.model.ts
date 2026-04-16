import { RecipeCategory, RecipeDifficulty } from './recipe.model';

export type RecipeFormatFilter = 'all' | 'food' | 'drink';

export interface RecipeFilters {
  search: string;
  category: RecipeCategory | 'all';
  difficulty: RecipeDifficulty | 'all';
  format: RecipeFormatFilter;
  maxCookingTime: number | null;
}

export const MAX_COOKING_TIME_OPTIONS: readonly number[] = [20, 30, 45, 60];

export function createDefaultRecipeFilters(): RecipeFilters {
  return {
    search: '',
    category: 'all',
    difficulty: 'all',
    format: 'all',
    maxCookingTime: null,
  };
}
