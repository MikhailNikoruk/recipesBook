import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collection-banner',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="collection-banner">
      <img [src]="image()" [alt]="title()">
      <div class="collection-banner__content">
        <span>{{ eyebrow() }}</span>
        <h3>{{ title() }}</h3>
        <p>{{ description() }}</p>
        <a class="collection-banner__link" [routerLink]="routerLink()" [queryParams]="queryParams()">{{ linkLabel() }}</a>
      </div>
    </article>
  `,
  styles: [
    `
      .collection-banner {
        display: grid;
        grid-template-columns: minmax(240px, 0.92fr) minmax(0, 1fr);
        overflow: hidden;
        border: 1px solid var(--card-border);
        border-radius: 28px;
        background: var(--card-bg);
        box-shadow: var(--shadow-md);
      }

      .collection-banner img {
        width: 100%;
        height: 100%;
        min-height: 220px;
        object-fit: cover;
        background: var(--surface-muted);
      }

      .collection-banner__content {
        display: grid;
        align-content: center;
        gap: 0.65rem;
        padding: 1.5rem;
      }

      .collection-banner__content span {
        color: var(--primary-active);
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }

      .collection-banner__content p {
        color: var(--text-secondary);
        line-height: 1.65;
      }

      .collection-banner__link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        margin-top: 0.35rem;
        min-height: 2.75rem;
        padding: 0.8rem 1rem;
        border: 1px solid var(--button-primary-border);
        border-radius: 999px;
        background: var(--button-secondary-bg);
        color: var(--text-primary);
        font-weight: 800;
        transition:
          background-color 180ms ease,
          border-color 180ms ease,
          color 180ms ease,
          box-shadow 180ms ease,
          transform 180ms ease;
      }

      .collection-banner__link:hover,
      .collection-banner__link:focus-visible {
        transform: translateY(-1px);
        background: linear-gradient(135deg, var(--button-primary-bg) 0%, var(--button-primary-hover) 100%);
        border-color: var(--button-primary-bg-hover);
        color: var(--button-primary-text-hover);
        box-shadow: var(--shadow-sm);
      }

      @media (max-width: 760px) {
        .collection-banner {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CollectionBannerComponent {
  eyebrow = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  image = input.required<string>();
  routerLink = input.required<string>();
  linkLabel = input('Открыть подборку');
  queryParams = input<Record<string, string | number | boolean | null> | undefined>(undefined);
}
