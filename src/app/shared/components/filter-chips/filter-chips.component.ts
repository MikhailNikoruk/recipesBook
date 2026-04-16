import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface FilterChipItem {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-filter-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-chips">
      @for (chip of chips(); track chip.id) {
        <button type="button" class="filter-chips__chip" (click)="chipSelected.emit(chip.id)">
          {{ chip.label }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      .filter-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .filter-chips__chip {
        padding: 0.7rem 0.95rem;
        border: 1px solid var(--chip-border);
        border-radius: 999px;
        background: var(--chip-bg);
        color: var(--chip-text);
        cursor: pointer;
        font-weight: 700;
      }

      .filter-chips__chip:hover,
      .filter-chips__chip:focus-visible {
        background: var(--chip-bg-hover);
        color: var(--text-primary);
      }
    `,
  ],
})
export class FilterChipsComponent {
  chips = input.required<readonly FilterChipItem[]>();
  chipSelected = output<string>();
}
