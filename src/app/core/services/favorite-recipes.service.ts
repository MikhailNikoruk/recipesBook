import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'recipe-book-favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoriteRecipesService {
  private readonly favoriteIds = signal<readonly number[]>(this.readInitialFavorites());

  readonly favorites = this.favoriteIds.asReadonly();

  isFavorite(recipeId: number): boolean {
    return this.favoriteIds().includes(recipeId);
  }

  toggle(recipeId: number): void {
    const next = this.isFavorite(recipeId)
      ? this.favoriteIds().filter((id) => id !== recipeId)
      : [...this.favoriteIds(), recipeId];

    this.favoriteIds.set(next);
    this.writeFavorites(next);
  }

  count(): number {
    return this.favoriteIds().length;
  }

  private readInitialFavorites(): readonly number[] {
    try {
      const rawValue = globalThis.localStorage?.getItem(STORAGE_KEY);

      if (!rawValue) {
        return [];
      }

      const parsedValue = JSON.parse(rawValue) as unknown;

      if (!Array.isArray(parsedValue)) {
        return [];
      }

      return parsedValue.filter((value): value is number => typeof value === 'number');
    } catch {
      return [];
    }
  }

  private writeFavorites(recipeIds: readonly number[]): void {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(recipeIds));
    } catch {
      // Ignore storage failures to keep the UI responsive.
    }
  }
}
