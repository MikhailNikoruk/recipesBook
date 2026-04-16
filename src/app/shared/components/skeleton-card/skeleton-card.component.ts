import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RecipeViewMode } from '../../../models/recipe-filters.model';

@Component({
  selector: 'app-skeleton-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="skeleton-card" [class.skeleton-card--list]="viewMode() === 'list'">
      <div class="skeleton-card__image"></div>
      <div class="skeleton-card__content">
        <div class="skeleton-card__line skeleton-card__line--short"></div>
        <div class="skeleton-card__line skeleton-card__line--title"></div>
        <div class="skeleton-card__line"></div>
        <div class="skeleton-card__line skeleton-card__line--medium"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .skeleton-card {
        display: grid;
        overflow: hidden;
        border-radius: 24px;
        background: var(--card-bg);
        border: 1px solid var(--card-border);
      }

      .skeleton-card--list {
        grid-template-columns: 220px minmax(0, 1fr);
      }

      .skeleton-card__image,
      .skeleton-card__line {
        background: linear-gradient(90deg, var(--skeleton-base), var(--skeleton-highlight), var(--skeleton-base));
        background-size: 200% 100%;
        animation: shimmer 1.3s linear infinite;
      }

      .skeleton-card__image {
        aspect-ratio: 16 / 10;
      }

      .skeleton-card__content {
        display: grid;
        gap: 0.75rem;
        padding: 1.25rem;
      }

      .skeleton-card__line {
        height: 0.95rem;
        border-radius: 999px;
      }

      .skeleton-card__line--short { width: 30%; }
      .skeleton-card__line--title { width: 72%; height: 1.35rem; }
      .skeleton-card__line--medium { width: 56%; }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `,
  ],
})
export class SkeletonCardComponent {
  viewMode = input<RecipeViewMode>('grid');
}
