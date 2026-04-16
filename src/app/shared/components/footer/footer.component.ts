import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="site-footer">
      <div class="site-footer__inner page-section">
        <div class="site-footer__brand">
          <strong>BookBites</strong>
          <p>
            SPA на Angular 21 с более редакционной подачей: подборки, community-блоки и насыщенная
            домашняя визуальная система.
          </p>
        </div>

        <div class="site-footer__column">
          <span>Навигация</span>
          <div class="site-footer__links">
            <a routerLink="/">Главная</a>
            <a routerLink="/recipes">Каталог</a>
            <a routerLink="/about">О проекте</a>
          </div>
        </div>

        <div class="site-footer__column">
          <span>Фокус проекта</span>
          <ul>
            <li>Оригинальный контент рецептов</li>
            <li>Standalone-архитектура</li>
            <li>Макет в духе больших кулинарных хабов</li>
          </ul>
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
        display: grid;
        gap: 1.5rem;
        grid-template-columns: minmax(0, 1.5fr) repeat(2, minmax(180px, 0.7fr));
        padding: 1.6rem 1.7rem;
        border: 1px solid var(--card-border);
        border-radius: var(--radius-xl);
        background: var(--card-bg);
        box-shadow: var(--shadow-sm);
      }

      .site-footer__brand p {
        margin-top: 0.4rem;
        max-width: 52ch;
        color: var(--text-secondary);
        line-height: 1.65;
      }

      .site-footer__column {
        display: grid;
        gap: 0.75rem;
      }

      .site-footer__column span {
        color: var(--primary-active);
        font-size: 0.82rem;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .site-footer__links {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
        font-weight: 700;
      }

      .site-footer__column ul {
        list-style: none;
        display: grid;
        gap: 0.55rem;
        color: var(--text-secondary);
      }

      .site-footer__links a {
        color: var(--primary-active);
      }

      @media (max-width: 720px) {
        .site-footer__inner {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class FooterComponent {}
