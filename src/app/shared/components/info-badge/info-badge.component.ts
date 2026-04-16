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
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.72);
      }

      .info-badge--accent {
        background: var(--accent-soft);
      }

      .info-badge--warm {
        background: var(--brand-soft);
      }

      .info-badge__label {
        color: var(--text-soft);
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
