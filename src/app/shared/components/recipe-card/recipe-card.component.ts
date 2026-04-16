import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  RECIPE_CATEGORY_LABELS,
  RECIPE_DIFFICULTY_LABELS,
  Recipe,
} from '../../../models/recipe.model';
import { HighlightOnHoverDirective } from '../../directives/highlight-on-hover.directive';
import { RecipeDifficultyColorDirective } from '../../directives/recipe-difficulty-color.directive';
import { CookingTimePipe } from '../../pipes/cooking-time.pipe';
import { InfoBadgeComponent } from '../info-badge/info-badge.component';

@Component({
  selector: 'app-recipe-card',
  imports: [
    RouterLink,
    InfoBadgeComponent,
    CookingTimePipe,
    RecipeDifficultyColorDirective,
    HighlightOnHoverDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  recipe = input.required<Recipe>();
  detailsRequested = output<number>();

  protected readonly categoryLabels = RECIPE_CATEGORY_LABELS;
  protected readonly difficultyLabels = RECIPE_DIFFICULTY_LABELS;

  protected requestDetails(): void {
    this.detailsRequested.emit(this.recipe().id);
  }
}
