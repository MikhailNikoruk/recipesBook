import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="site-footer">
      <div class="site-footer__inner page-section">
        <div>
          <strong>Книга рецептов</strong>
          <p>Учебный SPA-проект на Angular 21 со standalone-архитектурой и строгой типизацией.</p>
        </div>

        <div class="site-footer__links">
          <a routerLink="/">Главная</a>
          <a routerLink="/recipes">Каталог</a>
          <a routerLink="/about">О проекте</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .site-footer {
        padding: 0 1rem 1rem;
      }

      .site-footer__inner {
        display: flex;
        justify-content: space-between;
        gap: 1.25rem;
        padding: 1.4rem 1.5rem;
        border: 1px solid var(--line);
        border-radius: var(--radius-xl);
        background: rgba(255, 255, 255, 0.72);
      }

      .site-footer__inner p {
        margin-top: 0.4rem;
        max-width: 52ch;
        color: var(--text-soft);
      }

      .site-footer__links {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 0.85rem;
        font-weight: 700;
      }

      .site-footer__links a {
        color: var(--brand-dark);
      }

      @media (max-width: 720px) {
        .site-footer__inner {
          flex-direction: column;
        }
      }
    `,
  ],
})
export class FooterComponent {}
