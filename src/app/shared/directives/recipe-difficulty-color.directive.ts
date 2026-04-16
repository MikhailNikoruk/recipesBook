import { Directive, computed, input } from '@angular/core';
import { RecipeDifficulty } from '../../models/recipe.model';

interface DifficultyStyle {
  readonly background: string;
  readonly border: string;
  readonly color: string;
}

const DIFFICULTY_STYLES: Readonly<Record<RecipeDifficulty, DifficultyStyle>> = {
  easy: {
    background: 'rgba(190, 223, 178, 0.55)',
    border: '#7da56a',
    color: '#305023',
  },
  medium: {
    background: 'rgba(255, 221, 170, 0.6)',
    border: '#d69b37',
    color: '#6d4308',
  },
  hard: {
    background: 'rgba(245, 188, 188, 0.65)',
    border: '#c95a5a',
    color: '#6f1f1f',
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
