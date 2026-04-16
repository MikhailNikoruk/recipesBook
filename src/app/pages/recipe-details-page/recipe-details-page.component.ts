import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssetUrlService } from '../../core/services/asset-url.service';
import { RecipeRepositoryService } from '../../core/services/recipe-repository.service';
import { RECIPE_CATEGORY_LABELS, RECIPE_DIFFICULTY_LABELS } from '../../models/recipe.model';
import { RecipeDifficultyColorDirective } from '../../shared/directives/recipe-difficulty-color.directive';
import { CookingTimePipe } from '../../shared/pipes/cooking-time.pipe';
import { InfoBadgeComponent } from '../../shared/components/info-badge/info-badge.component';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-details-page',
  imports: [
    RouterLink,
    InfoBadgeComponent,
    CookingTimePipe,
    RecipeDifficultyColorDirective,
    RecipeCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-details-page.component.html',
  styleUrl: './recipe-details-page.component.scss',
})
export class RecipeDetailsPageComponent {
  private readonly assetUrlService = inject(AssetUrlService);
  private readonly recipeRepository = inject(RecipeRepositoryService);

  id = input.required<string>();

  protected readonly categoryLabels = RECIPE_CATEGORY_LABELS;
  protected readonly difficultyLabels = RECIPE_DIFFICULTY_LABELS;
  protected readonly recipeId = computed(() => Number.parseInt(this.id(), 10));
  protected readonly recipe = computed(() => {
    const currentId = this.recipeId();

    if (Number.isNaN(currentId)) {
      return undefined;
    }

    return this.recipeRepository.getById(currentId);
  });

  protected readonly relatedRecipes = computed(() => {
    const currentRecipe = this.recipe();

    if (!currentRecipe) {
      return [];
    }

    return this.recipeRepository
      .getAll()
      .filter(
        (recipe) =>
          recipe.id !== currentRecipe.id &&
          (recipe.category === currentRecipe.category || recipe.isDrink === currentRecipe.isDrink),
      )
      .slice(0, 2);
  });
  protected readonly imageUrl = computed(() => {
    const currentRecipe = this.recipe();

    if (!currentRecipe) {
      return '';
    }

    return this.assetUrlService.resolve(currentRecipe.image);
  });
}
