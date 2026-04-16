import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="empty-state-card">
      <span class="empty-state-card__eyebrow">{{ eyebrow() }}</span>
      <h2>{{ title() }}</h2>
      <p>{{ message() }}</p>
      @if (actionLabel()) {
        <button type="button" class="button-link" (click)="action.emit()">{{ actionLabel() }}</button>
      }
    </section>
  `,
  styles: [
    `
      .empty-state-card {
        display: grid;
        gap: 0.9rem;
        justify-items: center;
        padding: 2rem;
        border: 1px dashed var(--card-border-strong);
        border-radius: 24px;
        background: var(--card-bg);
        text-align: center;
      }

      .empty-state-card__eyebrow {
        color: var(--primary-active);
        font-size: 0.82rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .empty-state-card p {
        max-width: 52ch;
        color: var(--text-secondary);
        line-height: 1.65;
      }
    `,
  ],
})
export class EmptyStateComponent {
  eyebrow = input('Ничего не найдено');
  title = input.required<string>();
  message = input.required<string>();
  actionLabel = input<string>();
  action = output<void>();
}
