import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  createDefaultRecipeFilters,
  MAX_COOKING_TIME_OPTIONS,
  RecipeFilters,
} from '../../../models/recipe-filters.model';
import {
  RECIPE_CATEGORIES,
  RECIPE_CATEGORY_LABELS,
  RECIPE_DIFFICULTIES,
  RECIPE_DIFFICULTY_LABELS,
} from '../../../models/recipe.model';

@Component({
  selector: 'app-filter-panel',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  filters = input<RecipeFilters>(createDefaultRecipeFilters());
  filtersChange = output<RecipeFilters>();

  protected readonly categories = RECIPE_CATEGORIES;
  protected readonly categoryLabels = RECIPE_CATEGORY_LABELS;
  protected readonly difficulties = RECIPE_DIFFICULTIES;
  protected readonly difficultyLabels = RECIPE_DIFFICULTY_LABELS;
  protected readonly maxCookingTimeOptions = MAX_COOKING_TIME_OPTIONS;
  protected draft: RecipeFilters = createDefaultRecipeFilters();

  constructor() {
    effect(() => {
      this.draft = { ...this.filters() };
    });
  }

  protected emitChanges(): void {
    this.filtersChange.emit({ ...this.draft });
  }

  protected resetFilters(): void {
    this.draft = createDefaultRecipeFilters();
    this.emitChanges();
  }
}
