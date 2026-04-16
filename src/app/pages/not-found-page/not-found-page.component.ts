import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="not-found page-section glass-panel">
      <p class="section-heading__eyebrow">404</p>
      <h1>Такой страницы нет</h1>
      <p>
        Проверьте адрес в строке браузера или вернитесь к списку рецептов, чтобы продолжить
        работу с каталогом.
      </p>
      <div class="not-found__actions">
        <a class="button-link" routerLink="/">На главную</a>
        <a class="button-link button-link--secondary" routerLink="/recipes">К рецептам</a>
      </div>
    </section>
  `,
  styles: [
    `
      .not-found {
        display: grid;
        gap: 1rem;
        justify-items: center;
        padding: 2rem;
        text-align: center;
      }

      .not-found p {
        max-width: 52ch;
        color: var(--text-soft);
        line-height: 1.7;
      }

      .not-found__actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.85rem;
      }
    `,
  ],
})
export class NotFoundPageComponent {}
