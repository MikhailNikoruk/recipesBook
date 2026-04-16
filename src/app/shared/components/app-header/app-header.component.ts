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
          <span class="app-header__logo-frame" aria-hidden="true">
            <img class="app-header__logo" src="images/bookbites-logo.svg" alt="Логотип BookBites">
          </span>
          <span class="app-header__brand-copy">
            <strong>BookBites</strong>
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
            <svg class="app-header__icon-svg" aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="5.5" stroke="currentColor" stroke-width="2.2" />
              <path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
            </svg>
          </a>
          <a class="app-header__icon-button app-header__icon-button--favorite" routerLink="/favorites" aria-label="Открыть избранное">
            <svg class="app-header__icon-svg app-header__icon-svg--favorite" aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20.4 10.6 19.15C5.6 14.68 2.5 11.9 2.5 8.5 2.5 5.72 4.68 3.5 7.45 3.5c1.57 0 3.08.73 4.05 1.89A5.32 5.32 0 0 1 15.55 3.5c2.77 0 4.95 2.22 4.95 5 0 3.4-3.1 6.18-8.1 10.65L12 20.4Z"
                stroke="currentColor"
                stroke-width="1.9"
                stroke-linejoin="round"
              />
            </svg>
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
        gap: 0.95rem;
        min-width: 0;
      }

      .app-header__logo-frame {
        display: inline-grid;
        place-items: center;
        width: 4.15rem;
        height: 4.15rem;
        flex: 0 0 auto;
        border: 1px solid var(--card-border);
        border-radius: 1.35rem;
        background:
          linear-gradient(180deg, var(--surface-elevated) 0%, var(--surface-strong) 100%);
        box-shadow: var(--shadow-sm);
      }

      .app-header__logo {
        width: 3.3rem;
        height: 3.3rem;
        object-fit: contain;
      }

      .app-header__brand-copy {
        display: grid;
        gap: 0.2rem;
        min-width: 0;
      }

      .app-header__brand-copy strong {
        font-size: 1.08rem;
        letter-spacing: -0.01em;
      }

      .app-header__brand-copy small {
        color: var(--text-secondary);
        font-size: 0.82rem;
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

      .app-header__icon-svg {
        width: 1.35rem;
        height: 1.35rem;
        flex: 0 0 auto;
      }

      .app-header__icon-svg--favorite {
        width: 1.45rem;
        height: 1.45rem;
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
        .app-header {
          padding: 0.6rem 0.85rem 0;
        }

        .app-header__shell {
          gap: 0.9rem;
          padding: 0.9rem;
          border-radius: 22px;
        }

        .app-header__brand {
          justify-content: flex-start;
          gap: 0.8rem;
        }

        .app-header__logo-frame {
          width: 3.4rem;
          height: 3.4rem;
          border-radius: 1rem;
        }

        .app-header__logo {
          width: 2.7rem;
          height: 2.7rem;
        }

        .app-header__brand-copy strong {
          font-size: 1rem;
        }

        .app-header__brand-copy small {
          font-size: 0.78rem;
        }

        .app-header__nav {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
          width: 100%;
        }

        .app-header__nav-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2.75rem;
          text-align: center;
          padding: 0.7rem 0.75rem;
        }

        .app-header__actions {
          width: 100%;
          justify-content: stretch;
          gap: 0.55rem;
        }

        .app-header__icon-button {
          width: 3rem;
          height: 3rem;
        }

        .app-header__cta {
          flex: 1 1 auto;
          width: auto;
          min-height: 3rem;
        }
      }
    `,
  ],
})
export class AppHeaderComponent {
  private readonly favoriteRecipesService = inject(FavoriteRecipesService);

  protected readonly favoriteCount = computed(() => this.favoriteRecipesService.count());
}
