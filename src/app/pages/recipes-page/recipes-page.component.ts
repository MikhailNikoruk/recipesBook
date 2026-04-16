import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RecipeRepositoryService } from '../../core/services/recipe-repository.service';
import {
  createDefaultRecipeFilters,
  RecipeFilters,
} from '../../models/recipe-filters.model';
import { Recipe } from '../../models/recipe.model';
import { FilterPanelComponent } from '../../shared/components/filter-panel/filter-panel.component';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipes-page',
  imports: [FilterPanelComponent, RecipeCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent {
  private readonly recipeRepository = inject(RecipeRepositoryService);

  protected readonly allRecipes = this.recipeRepository.getAll();
  protected readonly filters = signal<RecipeFilters>(createDefaultRecipeFilters());
  protected readonly lastOpenedRecipeId = signal<number | null>(null);
  protected readonly filteredRecipes = computed(() =>
    this.allRecipes.filter((recipe) => this.matchesFilters(recipe, this.filters())),
  );

  protected updateFilters(filters: RecipeFilters): void {
    this.filters.set(filters);
  }

  protected resetFilters(): void {
    this.filters.set(createDefaultRecipeFilters());
  }

  protected rememberOpenedRecipe(recipeId: number): void {
    this.lastOpenedRecipeId.set(recipeId);
  }

  private matchesFilters(recipe: Recipe, filters: RecipeFilters): boolean {
    const normalizedSearch = filters.search.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      recipe.name.toLowerCase().includes(normalizedSearch) ||
      recipe.description.toLowerCase().includes(normalizedSearch) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

    const matchesCategory = filters.category === 'all' || recipe.category === filters.category;
    const matchesDifficulty =
      filters.difficulty === 'all' || recipe.difficulty === filters.difficulty;
    const matchesFormat =
      filters.format === 'all' ||
      (filters.format === 'drink' && recipe.isDrink) ||
      (filters.format === 'food' && !recipe.isDrink);
    const matchesTime =
      filters.maxCookingTime === null || recipe.cookingTime <= filters.maxCookingTime;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesFormat && matchesTime;
  }
}
