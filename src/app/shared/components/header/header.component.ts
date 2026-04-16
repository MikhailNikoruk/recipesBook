import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <div class="site-header__inner page-section glass-panel">
        <a class="site-header__brand" routerLink="/">
          <span class="site-header__brand-mark">KR</span>
          <span>
            <strong>Книга рецептов</strong>
            <small>Angular 21 SPA</small>
          </span>
        </a>

        <nav class="site-header__nav" aria-label="Основная навигация">
          <a
            class="site-header__link"
            routerLink="/"
            routerLinkActive="site-header__link--active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            Главная
          </a>
          <a class="site-header__link" routerLink="/recipes" routerLinkActive="site-header__link--active">
            Каталог
          </a>
          <a class="site-header__link" routerLink="/about" routerLinkActive="site-header__link--active">
            О проекте
          </a>
        </nav>

        <a class="button-link site-header__cta" routerLink="/recipes">Открыть рецепты</a>
      </div>
    </header>
  `,
  styles: [
    `
      .site-header {
        padding: 1rem;
      }

      .site-header__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.25rem;
        padding: 1rem 1.25rem;
      }

      .site-header__brand {
        display: flex;
        align-items: center;
        gap: 0.9rem;
      }

      .site-header__brand span {
        display: grid;
      }

      .site-header__brand strong {
        font-size: 1.05rem;
      }

      .site-header__brand small {
        color: var(--text-soft);
      }

      .site-header__brand-mark {
        display: inline-grid;
        place-items: center;
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 18px;
        background: linear-gradient(135deg, var(--brand) 0%, #f0a35d 100%);
        color: #fff;
        font-weight: 800;
        letter-spacing: 0.04em;
      }

      .site-header__nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
      }

      .site-header__link {
        padding: 0.65rem 0.95rem;
        border-radius: 999px;
        color: var(--text-soft);
        font-weight: 700;
        transition: background-color 180ms ease;
      }

      .site-header__link:hover,
      .site-header__link:focus-visible,
      .site-header__link--active {
        background: rgba(255, 255, 255, 0.82);
        color: var(--text-main);
      }

      @media (max-width: 920px) {
        .site-header__inner {
          flex-direction: column;
          align-items: stretch;
        }

        .site-header__brand,
        .site-header__cta {
          justify-content: center;
        }
      }
    `,
  ],
})
export class HeaderComponent {}
