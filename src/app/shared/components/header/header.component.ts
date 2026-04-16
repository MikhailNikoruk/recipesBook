import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <div class="site-header__top">
        <div class="page-section site-header__top-inner">
          <span>Редакционная версия кулинарного SPA, вдохновлённая большими рецепт-сайтами</span>
          <a routerLink="/about">Что и почему мы изменили</a>
        </div>
      </div>

      <div class="site-header__inner page-section">
        <div class="site-header__main glass-panel">
          <a class="site-header__brand" routerLink="/">
            <img class="site-header__brand-mark" src="images/bookbites-logo.svg" alt="Логотип BookBites">
            <span>
              <strong>BookBites</strong>
              <small>Домашняя кухня, напитки и продуманные подборки</small>
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
              Рецепты
            </a>
            <a class="site-header__link" routerLink="/about" routerLinkActive="site-header__link--active">
              О проекте
            </a>
          </nav>

          <a class="button-link site-header__cta" routerLink="/recipes">Открыть каталог</a>
        </div>

        <div class="site-header__topics">
          <a routerLink="/recipes">Завтраки</a>
          <a routerLink="/recipes">Супы</a>
          <a routerLink="/recipes">Ужины на будни</a>
          <a routerLink="/recipes">Десерты</a>
          <a routerLink="/recipes">Напитки</a>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .site-header {
        padding: 0 1rem 1rem;
      }

      .site-header__top {
        border-bottom: 1px solid var(--header-border);
        background: var(--header-bg);
      }

      .site-header__top-inner {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
        min-height: 2.75rem;
        color: var(--text-secondary);
        font-size: 0.88rem;
      }

      .site-header__top-inner a {
        color: var(--primary-active);
        font-weight: 700;
      }

      .site-header__inner {
        display: grid;
        gap: 0.8rem;
        padding-top: 1rem;
      }

      .site-header__main {
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
        color: var(--text-secondary);
      }

      .site-header__brand-mark {
        width: 2.8rem;
        height: 2.8rem;
        object-fit: contain;
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
        color: var(--text-secondary);
        font-weight: 700;
        transition: background-color 180ms ease;
      }

      .site-header__link:hover,
      .site-header__link:focus-visible,
      .site-header__link--active {
        background: var(--chip-bg-hover);
        color: var(--text-primary);
      }

      .site-header__topics {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .site-header__topics a {
        padding: 0.55rem 0.9rem;
        border-radius: 999px;
        border: 1px solid var(--chip-border);
        background: var(--chip-bg);
        color: var(--chip-text);
        font-size: 0.92rem;
        font-weight: 700;
      }

      @media (max-width: 920px) {
        .site-header__top-inner,
        .site-header__main {
          flex-direction: column;
          align-items: stretch;
        }

        .site-header__brand,
        .site-header__cta {
          justify-content: center;
        }

        .site-header__nav,
        .site-header__topics {
          justify-content: center;
        }
      }
    `,
  ],
})
export class HeaderComponent {}
