import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type BadgeTone = 'neutral' | 'accent' | 'warm';

@Component({
  selector: 'app-info-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="info-badge" [class.info-badge--accent]="tone() === 'accent'" [class.info-badge--warm]="tone() === 'warm'">
      <span class="info-badge__label">{{ label() }}</span>
      <strong class="info-badge__value">{{ value() }}</strong>
    </div>
  `,
  styles: [
    `
      .info-badge {
        display: grid;
        gap: 0.2rem;
        min-width: 108px;
        padding: 0.8rem 0.9rem;
        border: 1px solid var(--card-border);
        border-radius: var(--radius-md);
        background: var(--badge-neutral-bg);
      }

      .info-badge--accent {
        background: var(--badge-accent-bg);
        color: var(--badge-accent-text);
      }

      .info-badge--warm {
        background: var(--badge-warm-bg);
        color: var(--badge-warm-text);
      }

      .info-badge__label {
        color: var(--text-secondary);
        font-size: 0.82rem;
      }

      .info-badge__value {
        font-size: 1rem;
      }
    `,
  ],
})
export class InfoBadgeComponent {
  label = input.required<string>();
  value = input.required<string>();
  tone = input<BadgeTone>('neutral');
}
