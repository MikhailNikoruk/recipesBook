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
        <a [routerLink]="routerLink()" [queryParams]="queryParams()">{{ linkLabel() }}</a>
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

      .collection-banner__content a {
        width: fit-content;
        margin-top: 0.35rem;
        color: var(--primary-active);
        font-weight: 800;
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
