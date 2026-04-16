import { Directive, computed, input } from '@angular/core';
import { RecipeDifficulty } from '../../models/recipe.model';

interface DifficultyStyle {
  readonly background: string;
  readonly border: string;
  readonly color: string;
}

const DIFFICULTY_STYLES: Readonly<Record<RecipeDifficulty, DifficultyStyle>> = {
  easy: {
    background: 'var(--tag-difficulty-easy-bg)',
    border: 'var(--tag-difficulty-easy-bg)',
    color: 'var(--tag-difficulty-easy-text)',
  },
  medium: {
    background: 'var(--tag-difficulty-medium-bg)',
    border: 'var(--tag-difficulty-medium-bg)',
    color: 'var(--tag-difficulty-medium-text)',
  },
  hard: {
    background: 'var(--tag-difficulty-hard-bg)',
    border: 'var(--tag-difficulty-hard-bg)',
    color: 'var(--tag-difficulty-hard-text)',
  },
};

@Directive({
  selector: '[appRecipeDifficultyColor]',
  host: {
    '[style.background]': 'background()',
    '[style.borderColor]': 'borderColor()',
    '[style.color]': 'textColor()',
    '[style.boxShadow]': '"inset 0 0 0 1px " + borderColor()',
  },
})
export class RecipeDifficultyColorDirective {
  difficulty = input.required<RecipeDifficulty>({ alias: 'appRecipeDifficultyColor' });

  protected readonly background = computed(() => DIFFICULTY_STYLES[this.difficulty()].background);
  protected readonly borderColor = computed(() => DIFFICULTY_STYLES[this.difficulty()].border);
  protected readonly textColor = computed(() => DIFFICULTY_STYLES[this.difficulty()].color);
}
