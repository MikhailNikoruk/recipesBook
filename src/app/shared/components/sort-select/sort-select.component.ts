import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeSort } from '../../../models/recipe-filters.model';

@Component({
  selector: 'app-sort-select',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="sort-select">
      <span>Сортировка</span>
      <select [ngModel]="value()" (ngModelChange)="valueChange.emit($event)" name="sort">
        @for (option of options(); track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
    </label>
  `,
  styles: [
    `
      .sort-select {
        display: grid;
        gap: 0.35rem;
      }

      .sort-select span {
        color: var(--text-secondary);
        font-size: 0.82rem;
        font-weight: 700;
      }

      .sort-select select {
        min-width: 220px;
        padding: 0.8rem 0.95rem;
        border: 1px solid var(--input-border);
        border-radius: 18px;
        background: var(--input-bg);
        color: var(--input-text);
      }

      .sort-select select:focus-visible {
        border-color: var(--input-border-focus);
        box-shadow: 0 0 0 3px var(--input-ring);
      }
    `,
  ],
})
export class SortSelectComponent {
  value = input.required<RecipeSort>();
  options = input.required<readonly { value: RecipeSort; label: string }[]>();
  valueChange = output<RecipeSort>();
}
