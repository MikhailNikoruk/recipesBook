import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RecipeFilters } from '../../../models/recipe-filters.model';
import { SidebarFiltersComponent } from '../sidebar-filters/sidebar-filters.component';

@Component({
  selector: 'app-mobile-filter-drawer',
  imports: [SidebarFiltersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div class="mobile-filter-drawer">
        <button
          type="button"
          class="mobile-filter-drawer__backdrop"
          aria-label="Закрыть фильтры"
          (click)="closeRequested.emit()"
        ></button>

        <div class="mobile-filter-drawer__panel">
          <div class="mobile-filter-drawer__header">
            <strong>Фильтры каталога</strong>
            <button type="button" (click)="closeRequested.emit()">Закрыть</button>
          </div>

          <app-sidebar-filters
            [filters]="filters()"
            (filtersChange)="filtersChange.emit($event)"
            (resetRequested)="resetRequested.emit()"
          />
        </div>
      </div>
    }
  `,
  styles: [
    `
      .mobile-filter-drawer {
        position: fixed;
        inset: 0;
        z-index: 55;
      }

      .mobile-filter-drawer__backdrop {
        position: absolute;
        inset: 0;
        border: 0;
        background: var(--overlay);
      }

      .mobile-filter-drawer__panel {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: min(100%, 360px);
        padding: 1rem;
        background: var(--panel-bg);
        box-shadow: -22px 0 48px var(--overlay);
        overflow: auto;
      }

      .mobile-filter-drawer__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .mobile-filter-drawer__header button {
        padding: 0.6rem 0.9rem;
        border: 1px solid var(--button-secondary-border);
        border-radius: 999px;
        background: var(--button-secondary-bg);
        color: var(--button-secondary-text);
      }
    `,
  ],
})
export class MobileFilterDrawerComponent {
  open = input(false);
  filters = input.required<RecipeFilters>();
  filtersChange = output<RecipeFilters>();
  resetRequested = output<void>();
  closeRequested = output<void>();
}
