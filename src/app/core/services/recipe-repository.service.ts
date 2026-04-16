import { Injectable } from '@angular/core';
import { RECIPES } from '../../data/recipes';
import { Recipe } from '../../models/recipe.model';

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
}
