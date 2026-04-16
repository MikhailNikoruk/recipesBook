import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteRecipesService } from '../../core/services/favorite-recipes.service';
import { RecipeRepositoryService } from '../../core/services/recipe-repository.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-favorites-page',
  imports: [EmptyStateComponent, RecipeCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="favorites-page page-section">
      <div class="section-heading">
        <p class="section-heading__eyebrow">Избранное</p>
        <h1 class="display-serif">Ваши сохранённые рецепты</h1>
        <p class="section-heading__text">
          Сюда попадают блюда и напитки, которые вы отметили сердцем на карточках каталога и страницы рецепта.
        </p>
      </div>

      @if (favoriteRecipes().length > 0) {
        <div class="recipe-grid">
          @for (recipe of favoriteRecipes(); track recipe.id) {
            <app-recipe-card [recipe]="recipe" />
          }
        </div>
      } @else {
        <app-empty-state
          title="Пока ничего не сохранено"
          message="Добавляйте рецепты в избранное из карточек каталога, чтобы быстро возвращаться к ним позже."
          actionLabel="Перейти в каталог"
          (action)="goToCatalog()"
        />
      }
    </section>
  `,
  styles: [
    `
      .favorites-page {
        display: grid;
        gap: 1.5rem;
      }

      .favorites-page h1 {
        max-width: 10ch;
        font-size: clamp(2.4rem, 4vw, 4rem);
      }
    `,
  ],
})
export class FavoritesPageComponent {
  private readonly favoriteRecipesService = inject(FavoriteRecipesService);
  private readonly recipeRepository = inject(RecipeRepositoryService);
  private readonly router = inject(Router);

  protected readonly favoriteRecipes = computed(() =>
    this.recipeRepository.getByIds(this.favoriteRecipesService.favorites()),
  );

  protected goToCatalog(): void {
    void this.router.navigate(['/recipes']);
  }
}
