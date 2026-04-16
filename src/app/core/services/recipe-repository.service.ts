import { Injectable } from '@angular/core';
import { RECIPES } from '../../data/recipes';
import { Recipe, RecipeCategory } from '../../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepositoryService {
  private readonly recipes = RECIPES;

  getAll(): readonly Recipe[] {
    return this.recipes;
  }

  getById(id: number): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  getFeatured(limit: number): readonly Recipe[] {
    return this.recipes.slice(0, limit);
  }

  getNewest(limit: number): readonly Recipe[] {
    return [...this.recipes].sort((left, right) => right.id - left.id).slice(0, limit);
  }

  getPopular(limit: number): readonly Recipe[] {
    return [...this.recipes]
      .sort((left, right) => (left.cookingTime + left.calories / 10) - (right.cookingTime + right.calories / 10))
      .slice(0, limit);
  }

  getRandom(): Recipe {
    return this.recipes[Math.floor(Math.random() * this.recipes.length)];
  }

  getByCategory(category: RecipeCategory): readonly Recipe[] {
    return this.recipes.filter((recipe) => recipe.category === category);
  }

  getByIds(ids: readonly number[]): readonly Recipe[] {
    return ids
      .map((recipeId) => this.getById(recipeId))
      .filter((recipe): recipe is Recipe => recipe !== undefined);
  }

  getTotalCount(): number {
    return this.recipes.length;
  }

  getDrinkCount(): number {
    return this.recipes.filter((recipe) => recipe.isDrink).length;
  }

  getAverageCookingTime(): number {
    const totalMinutes = this.recipes.reduce(
      (accumulator, recipe) => accumulator + recipe.cookingTime,
      0,
    );

    return Math.round(totalMinutes / this.recipes.length);
  }

  getAverageCalories(): number {
    const totalCalories = this.recipes.reduce(
      (accumulator, recipe) => accumulator + recipe.calories,
      0,
    );

    return Math.round(totalCalories / this.recipes.length);
  }
}
