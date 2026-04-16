import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="search-bar" (submit)="handleSubmit($event)">
      <span class="search-bar__icon" aria-hidden="true">⌕</span>
      <input
        class="search-bar__input"
        type="search"
        [placeholder]="placeholder()"
        [ngModel]="value()"
        (ngModelChange)="valueChange.emit($event)"
        name="query"
      >
      <button class="search-bar__button" type="submit">{{ buttonLabel() }}</button>
    </form>
  `,
  styles: [
    `
      .search-bar {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 0.75rem;
        align-items: center;
        padding: 0.55rem 0.65rem;
        border: 1px solid var(--input-border);
        border-radius: 22px;
        background: var(--input-bg);
        box-shadow: var(--shadow-sm);
      }

      .search-bar__icon {
        color: var(--text-secondary);
        padding-left: 0.3rem;
      }

      .search-bar__input {
        min-width: 0;
        border: 0;
        background: transparent;
        color: var(--input-text);
        outline: none;
      }

      .search-bar__input::placeholder {
        color: var(--input-placeholder);
      }

      .search-bar__button {
        padding: 0.8rem 1rem;
        border: 1px solid var(--button-primary-border);
        border-radius: 16px;
        background: var(--button-primary-bg);
        color: var(--button-primary-text);
        font-weight: 700;
        cursor: pointer;
      }

      .search-bar:focus-within {
        border-color: var(--input-border-focus);
        box-shadow: 0 0 0 3px var(--input-ring);
      }

      .search-bar__button:hover,
      .search-bar__button:focus-visible {
        background: var(--button-primary-bg-hover);
        border-color: var(--button-primary-bg-hover);
      }

      @media (max-width: 640px) {
        .search-bar {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class SearchBarComponent {
  placeholder = input('Найти рецепт или ингредиент');
  buttonLabel = input('Найти');
  value = input('');
  valueChange = output<string>();
  submitted = output<string>();

  protected handleSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.emit(this.value().trim());
  }
}
