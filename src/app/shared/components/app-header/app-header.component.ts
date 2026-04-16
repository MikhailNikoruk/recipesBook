import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoriteRecipesService } from '../../../core/services/favorite-recipes.service';

@Component({
  selector: 'app-app-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="app-header">
      <div class="app-header__shell page-section">
        <a class="app-header__brand" routerLink="/">
          <span class="app-header__logo">KR</span>
          <span class="app-header__brand-copy">
            <strong>Книга рецептов</strong>
            <small>Каталог блюд и напитков</small>
          </span>
        </a>

        <nav class="app-header__nav" aria-label="Основная навигация">
          <a
            class="app-header__nav-link"
            routerLink="/"
            routerLinkActive="app-header__nav-link--active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            Главная
          </a>
          <a class="app-header__nav-link" routerLink="/recipes" routerLinkActive="app-header__nav-link--active">
            Каталог
          </a>
          <a class="app-header__nav-link" routerLink="/categories" routerLinkActive="app-header__nav-link--active">
            Категории
          </a>
          <a class="app-header__nav-link" routerLink="/favorites" routerLinkActive="app-header__nav-link--active">
            Избранное
          </a>
          <a class="app-header__nav-link" routerLink="/about" routerLinkActive="app-header__nav-link--active">
            О проекте
          </a>
        </nav>

        <div class="app-header__actions">
          <a class="app-header__icon-button" routerLink="/recipes" aria-label="Открыть поиск">
            <span aria-hidden="true">⌕</span>
          </a>
          <a class="app-header__icon-button app-header__icon-button--favorite" routerLink="/favorites" aria-label="Открыть избранное">
            <span aria-hidden="true">♡</span>
            @if (favoriteCount() > 0) {
              <span class="app-header__favorite-count">{{ favoriteCount() }}</span>
            }
          </a>
          <a class="button-link app-header__cta" routerLink="/recipes">Открыть каталог</a>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      .app-header {
        position: sticky;
        top: 0;
        z-index: 40;
        padding: 0.75rem 1rem 0;
      }

      .app-header__shell {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 1.25rem;
        align-items: center;
        padding: 0.85rem 1rem;
        border: 1px solid var(--header-border);
        border-radius: 24px;
        background: var(--header-bg);
        box-shadow: var(--header-shadow);
        backdrop-filter: blur(18px);
      }

      .app-header__brand {
        display: inline-flex;
        align-items: center;
        gap: 0.8rem;
        min-width: 0;
      }

      .app-header__logo {
        display: inline-grid;
        place-items: center;
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 18px;
        background: var(--button-primary-bg);
        color: var(--button-primary-text);
        font-weight: 800;
      }

      .app-header__brand-copy {
        display: grid;
        gap: 0.15rem;
        min-width: 0;
      }

      .app-header__brand-copy strong {
        font-size: 1rem;
      }

      .app-header__brand-copy small {
        color: var(--text-secondary);
        font-size: 0.8rem;
      }

      .app-header__nav {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.35rem;
      }

      .app-header__nav-link {
        padding: 0.7rem 0.9rem;
        border-radius: 999px;
        color: var(--text-secondary);
        font-weight: 700;
      }

      .app-header__nav-link:hover,
      .app-header__nav-link:focus-visible,
      .app-header__nav-link--active {
        background: var(--chip-bg-hover);
        color: var(--text-primary);
        box-shadow: inset 0 -2px 0 var(--primary);
      }

      .app-header__actions {
        display: flex;
        align-items: center;
        gap: 0.65rem;
      }

      .app-header__icon-button {
        position: relative;
        display: inline-grid;
        place-items: center;
        width: 2.9rem;
        height: 2.9rem;
        border: 1px solid var(--header-icon-border);
        border-radius: 999px;
        background: var(--header-icon-bg);
        color: var(--text-primary);
        font-size: 1.1rem;
      }

      .app-header__favorite-count {
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
        min-width: 1.2rem;
        height: 1.2rem;
        padding-inline: 0.25rem;
        border-radius: 999px;
        background: var(--favorite);
        color: var(--text-inverse);
        font-size: 0.72rem;
        font-weight: 700;
        line-height: 1.2rem;
        text-align: center;
      }

      @media (max-width: 1040px) {
        .app-header__shell {
          grid-template-columns: 1fr;
        }

        .app-header__brand,
        .app-header__actions,
        .app-header__nav {
          justify-content: center;
        }
      }

      @media (max-width: 640px) {
        .app-header__cta {
          width: auto;
        }
      }
    `,
  ],
})
export class AppHeaderComponent {
  private readonly favoriteRecipesService = inject(FavoriteRecipesService);

  protected readonly favoriteCount = computed(() => this.favoriteRecipesService.count());
}
