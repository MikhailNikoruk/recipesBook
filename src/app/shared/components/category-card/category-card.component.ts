import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="category-card" [routerLink]="routerLink()" [queryParams]="queryParams()">
      <img [src]="image()" [alt]="title()">
      <div class="category-card__content">
        <span>{{ eyebrow() }}</span>
        <h3>{{ title() }}</h3>
        <p>{{ description() }}</p>
      </div>
    </a>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .category-card {
        display: grid;
        height: 100%;
        overflow: hidden;
        border: 1px solid var(--card-border);
        border-radius: 24px;
        background: var(--card-bg);
        box-shadow: var(--shadow-md);
      }

      .category-card img {
        width: 100%;
        aspect-ratio: 16 / 10;
        object-fit: cover;
        background: var(--surface-muted);
      }

      .category-card__content {
        display: flex;
        flex-direction: column;
        gap: 0.55rem;
        min-height: 100%;
        padding: 1.2rem;
      }

      .category-card__content span {
        color: var(--primary-active);
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .category-card__content h3 {
        font-size: 1.2rem;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .category-card__content p {
        color: var(--text-secondary);
        line-height: 1.6;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    `,
  ],
})
export class CategoryCardComponent {
  title = input.required<string>();
  eyebrow = input.required<string>();
  description = input.required<string>();
  image = input.required<string>();
  routerLink = input.required<string>();
  queryParams = input<Record<string, string | number | boolean | null> | undefined>(undefined);
}
