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
  RECIPE_DIETS,
  RECIPE_DIET_LABELS,
  RECIPE_DIFFICULTIES,
  RECIPE_DIFFICULTY_LABELS,
} from '../../../models/recipe.model';

@Component({
  selector: 'app-sidebar-filters',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar-filters.component.html',
  styleUrl: './sidebar-filters.component.scss',
})
export class SidebarFiltersComponent {
  filters = input<RecipeFilters>(createDefaultRecipeFilters());
  filtersChange = output<RecipeFilters>();
  resetRequested = output<void>();

  protected readonly categories = RECIPE_CATEGORIES;
  protected readonly categoryLabels = RECIPE_CATEGORY_LABELS;
  protected readonly difficulties = RECIPE_DIFFICULTIES;
  protected readonly difficultyLabels = RECIPE_DIFFICULTY_LABELS;
  protected readonly diets = RECIPE_DIETS;
  protected readonly dietLabels = RECIPE_DIET_LABELS;
  protected readonly timeOptions = MAX_COOKING_TIME_OPTIONS;
  protected draft: RecipeFilters = createDefaultRecipeFilters();

  constructor() {
    effect(() => {
      this.draft = { ...this.filters() };
    });
  }

  protected applyChanges(): void {
    this.filtersChange.emit({ ...this.draft });
  }

  protected reset(): void {
    this.draft = createDefaultRecipeFilters();
    this.filtersChange.emit(this.draft);
    this.resetRequested.emit();
  }
}
