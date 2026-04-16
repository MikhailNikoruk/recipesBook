import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeRepositoryService } from '../../core/services/recipe-repository.service';
import { InfoBadgeComponent } from '../../shared/components/info-badge/info-badge.component';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';

interface HomeHighlight {
  readonly title: string;
  readonly description: string;
}

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, InfoBadgeComponent, RecipeCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly recipeRepository = inject(RecipeRepositoryService);

  protected readonly featuredRecipes = this.recipeRepository.getFeatured(3);
  protected readonly highlights: readonly HomeHighlight[] = [
    {
      title: 'Быстрые фильтры',
      description: 'Поиск по названию, категории, сложности, типу рецепта и времени приготовления.',
    },
    {
      title: 'Полные карточки',
      description: 'Для каждого рецепта есть ингредиенты, шаги, время, сложность и рекомендуемые порции.',
    },
    {
      title: 'Чистая архитектура',
      description: 'Standalone-компоненты, сильная типизация и чёткое разделение по слоям.',
    },
  ];

  protected readonly totalRecipes = String(this.recipeRepository.getTotalCount());
  protected readonly totalDrinks = String(this.recipeRepository.getDrinkCount());
  protected readonly averageTime = `${this.recipeRepository.getAverageCookingTime()} мин`;
  protected readonly lastOpenedRecipeId = signal<number | null>(null);

  protected rememberOpenedRecipe(recipeId: number): void {
    this.lastOpenedRecipeId.set(recipeId);
  }
}
