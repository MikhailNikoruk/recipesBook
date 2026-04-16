import { Directive, computed, signal } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  host: {
    '(mouseenter)': 'setHovered(true)',
    '(mouseleave)': 'setHovered(false)',
    '(focusin)': 'setHovered(true)',
    '(focusout)': 'setHovered(false)',
    '[style.transform]': 'transform()',
    '[style.boxShadow]': 'shadow()',
    '[style.borderColor]': 'borderColor()',
    '[style.transition]': '"transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease"',
  },
})
export class HighlightOnHoverDirective {
  private readonly hovered = signal(false);

  protected readonly transform = computed(() =>
    this.hovered() ? 'translateY(-4px)' : 'translateY(0)',
  );
  protected readonly shadow = computed(() =>
    this.hovered() ? 'var(--shadow-interactive)' : 'var(--shadow-md)',
  );
  protected readonly borderColor = computed(() =>
    this.hovered() ? 'var(--chip-selected-border)' : 'var(--card-border)',
  );

  protected setHovered(value: boolean): void {
    this.hovered.set(value);
  }
}
