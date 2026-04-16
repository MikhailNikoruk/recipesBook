import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AssetUrlService } from '../../core/services/asset-url.service';
import { RecipeRepositoryService } from '../../core/services/recipe-repository.service';
import {
  RECIPE_CATEGORY_LABELS,
  RECIPE_DIET_LABELS,
  RECIPE_DIFFICULTY_LABELS,
} from '../../models/recipe.model';
import { FavoriteButtonComponent } from '../../shared/components/favorite-button/favorite-button.component';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { RecipeDifficultyColorDirective } from '../../shared/directives/recipe-difficulty-color.directive';
import { CookingTimePipe } from '../../shared/pipes/cooking-time.pipe';

@Component({
  selector: 'app-recipe-details-page',
  imports: [
    RouterLink,
    CookingTimePipe,
    FavoriteButtonComponent,
    RecipeCardComponent,
    RecipeDifficultyColorDirective,
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
  protected readonly dietLabels = RECIPE_DIET_LABELS;
  protected readonly checkedIngredients = signal<readonly string[]>([]);
  protected readonly shareMessage = signal('');
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
          (recipe.category === currentRecipe.category ||
            recipe.diet.some((diet) => currentRecipe.diet.includes(diet))),
      )
      .slice(0, 3);
  });
  protected readonly imageUrl = computed(() => {
    const currentRecipe = this.recipe();

    return currentRecipe ? this.assetUrlService.resolve(currentRecipe.image) : '';
  });

  constructor() {
    effect(() => {
      this.recipe();
      this.checkedIngredients.set([]);
      this.shareMessage.set('');
    });
  }

  protected toggleIngredient(ingredient: string, checked: boolean): void {
    this.checkedIngredients.update((items) =>
      checked ? [...items, ingredient] : items.filter((item) => item !== ingredient),
    );
  }

  protected isIngredientChecked(ingredient: string): boolean {
    return this.checkedIngredients().includes(ingredient);
  }

  protected async shareRecipe(): Promise<void> {
    const currentRecipe = this.recipe();

    if (!currentRecipe) {
      return;
    }

    const recipeUrl = globalThis.location?.href ?? '';

    try {
      if (typeof globalThis.navigator?.share === 'function') {
        await globalThis.navigator.share({
          title: currentRecipe.name,
          text: currentRecipe.description,
          url: recipeUrl,
        });
        this.shareMessage.set('Ссылка готова к отправке.');
      } else if (typeof globalThis.navigator?.clipboard?.writeText === 'function') {
        await globalThis.navigator.clipboard.writeText(recipeUrl);
        this.shareMessage.set('Ссылка скопирована в буфер обмена.');
      } else {
        this.shareMessage.set('Поделиться из браузера здесь нельзя.');
      }
    } catch {
      this.shareMessage.set('Не удалось поделиться рецептом.');
    }
  }

  protected printRecipe(): void {
    globalThis.print?.();
  }
}
