import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="about-page page-section glass-panel">
      <div class="section-heading">
        <p class="section-heading__eyebrow">О проекте</p>
        <h1>Как устроен BookBites</h1>
        <p class="section-heading__text">
          Приложение собрано на Angular 21 с <code>bootstrapApplication</code>, standalone-компонентами,
          маршрутизацией, сигналами и чистым разделением доменной и UI-логики.
        </p>
      </div>

      <div class="about-page__grid">
        <article>
          <h2>Данные</h2>
          <p>Рецепты вынесены в типизированный файл с исходными данными и читаются через сервис-репозиторий.</p>
        </article>
        <article>
          <h2>Интерфейс</h2>
          <p>Повторно используются карточки рецептов, компактные инфоблоки, пользовательский pipe и атрибутивная директива.</p>
        </article>
        <article>
          <h2>Навигация</h2>
          <p>Есть главная, каталог, страница деталей по <code>:id</code>, раздел о проекте и собственная 404.</p>
        </article>
      </div>

      <a class="button-link" routerLink="/recipes">Перейти к каталогу</a>
    </section>
  `,
  styles: [
    `
      .about-page {
        display: grid;
        gap: 1.5rem;
        padding: 2rem;
      }

      .about-page__grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      .about-page__grid article {
        padding: 1.2rem;
        border: 1px solid var(--card-border);
        border-radius: var(--radius-lg);
        background: var(--card-bg);
      }

      .about-page__grid p {
        margin-top: 0.5rem;
        color: var(--text-secondary);
        line-height: 1.65;
      }
    `,
  ],
})
export class AboutPageComponent {}
