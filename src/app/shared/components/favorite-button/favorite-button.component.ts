import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { FavoriteRecipesService } from '../../../core/services/favorite-recipes.service';

@Component({
  selector: 'app-favorite-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="favorite-button"
      type="button"
      [class.favorite-button--active]="isActive()"
      [attr.aria-pressed]="isActive()"
      [attr.aria-label]="isActive() ? 'Убрать из избранного' : 'Добавить в избранное'"
      (click)="toggle()"
    >
      <span aria-hidden="true">{{ isActive() ? '♥' : '♡' }}</span>
    </button>
  `,
  styles: [
    `
      .favorite-button {
        display: inline-grid;
        place-items: center;
        width: 2.9rem;
        height: 2.9rem;
        border: 1px solid var(--button-secondary-border);
        border-radius: 999px;
        background: var(--button-secondary-bg);
        color: var(--text-primary);
        cursor: pointer;
        font-size: 1rem;
      }

      .favorite-button--active {
        background: var(--color-danger-soft);
        color: var(--favorite);
        border-color: var(--favorite);
      }
    `,
  ],
})
export class FavoriteButtonComponent {
  private readonly favoriteRecipesService = inject(FavoriteRecipesService);

  recipeId = input.required<number>();
  changed = output<number>();

  protected readonly isActive = computed(() => this.favoriteRecipesService.isFavorite(this.recipeId()));

  protected toggle(): void {
    this.favoriteRecipesService.toggle(this.recipeId());
    this.changed.emit(this.recipeId());
  }
}
