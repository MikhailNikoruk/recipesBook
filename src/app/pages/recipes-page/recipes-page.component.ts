import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  createDefaultRecipeFilters,
  RecipeFilters,
  RECIPE_SORT_OPTIONS,
  RecipeSort,
  RecipeViewMode,
} from '../../models/recipe-filters.model';
import {
  RECIPE_CATEGORY_LABELS,
  RECIPE_DIET_LABELS,
  RECIPE_DIFFICULTY_LABELS,
  Recipe,
  RecipeCategory,
  RecipeDiet,
  RecipeDifficulty,
} from '../../models/recipe.model';
import { FavoriteRecipesService } from '../../core/services/favorite-recipes.service';
import { RecipeRepositoryService } from '../../core/services/recipe-repository.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { MobileFilterDrawerComponent } from '../../shared/components/mobile-filter-drawer/mobile-filter-drawer.component';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SidebarFiltersComponent } from '../../shared/components/sidebar-filters/sidebar-filters.component';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card/skeleton-card.component';
import { SortSelectComponent } from '../../shared/components/sort-select/sort-select.component';

interface ActiveFilterPill {
  readonly id:
    | 'search'
    | 'category'
    | 'difficulty'
    | 'diet'
    | 'format'
    | 'maxCookingTime'
    | 'ingredient'
    | 'favoritesOnly';
  readonly label: string;
}

@Component({
  selector: 'app-recipes-page',
  imports: [
    EmptyStateComponent,
    MobileFilterDrawerComponent,
    RecipeCardComponent,
    SearchBarComponent,
    SidebarFiltersComponent,
    SkeletonCardComponent,
    SortSelectComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly recipeRepository = inject(RecipeRepositoryService);
  private readonly favoriteRecipesService = inject(FavoriteRecipesService);

  protected readonly allRecipes = this.recipeRepository.getAll();
  protected readonly filters = signal<RecipeFilters>(createDefaultRecipeFilters());
  protected readonly search = signal('');
  protected readonly sort = signal<RecipeSort>('popular');
  protected readonly viewMode = signal<RecipeViewMode>('grid');
  protected readonly mobileFiltersOpen = signal(false);
  protected readonly loading = signal(true);
  protected readonly sortOptions = RECIPE_SORT_OPTIONS;

  protected readonly favoriteCount = computed(() => this.favoriteRecipesService.count());
  protected readonly filteredRecipes = computed(() => {
    const activeFilters = this.filters();
    const normalizedSearch = this.search().trim().toLowerCase();

    return this.sortRecipes(
      this.allRecipes.filter((recipe) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          recipe.name.toLowerCase().includes(normalizedSearch) ||
          recipe.description.toLowerCase().includes(normalizedSearch) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(normalizedSearch),
          ) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

        const matchesCategory =
          activeFilters.category === 'all' || recipe.category === activeFilters.category;
        const matchesDifficulty =
          activeFilters.difficulty === 'all' || recipe.difficulty === activeFilters.difficulty;
        const matchesDiet =
          activeFilters.diet === 'all' || recipe.diet.includes(activeFilters.diet);
        const matchesFormat =
          activeFilters.format === 'all' ||
          (activeFilters.format === 'drink' && recipe.isDrink) ||
          (activeFilters.format === 'food' && !recipe.isDrink);
        const matchesIngredient =
          activeFilters.ingredient.trim().length === 0 ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(activeFilters.ingredient.trim().toLowerCase()),
          );
        const matchesTime =
          activeFilters.maxCookingTime === null ||
          recipe.cookingTime <= activeFilters.maxCookingTime;
        const matchesFavorites =
          !activeFilters.favoritesOnly || this.favoriteRecipesService.isFavorite(recipe.id);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesDifficulty &&
          matchesDiet &&
          matchesFormat &&
          matchesIngredient &&
          matchesTime &&
          matchesFavorites
        );
      }),
      this.sort(),
    );
  });

  protected readonly activeFilterPills = computed<readonly ActiveFilterPill[]>(() => {
    const activeFilters = this.filters();
    const pills: ActiveFilterPill[] = [];

    if (this.search().trim().length > 0) {
      pills.push({ id: 'search', label: `Поиск: ${this.search().trim()}` });
    }

    if (activeFilters.category !== 'all') {
      pills.push({
        id: 'category',
        label: `Категория: ${RECIPE_CATEGORY_LABELS[activeFilters.category]}`,
      });
    }

    if (activeFilters.difficulty !== 'all') {
      pills.push({
        id: 'difficulty',
        label: `Сложность: ${RECIPE_DIFFICULTY_LABELS[activeFilters.difficulty]}`,
      });
    }

    if (activeFilters.diet !== 'all') {
      pills.push({
        id: 'diet',
        label: `Диета: ${RECIPE_DIET_LABELS[activeFilters.diet]}`,
      });
    }

    if (activeFilters.format !== 'all') {
      pills.push({
        id: 'format',
        label: activeFilters.format === 'drink' ? 'Только напитки' : 'Только блюда',
      });
    }

    if (activeFilters.maxCookingTime !== null) {
      pills.push({
        id: 'maxCookingTime',
        label: `До ${activeFilters.maxCookingTime} мин`,
      });
    }

    if (activeFilters.ingredient.trim().length > 0) {
      pills.push({
        id: 'ingredient',
        label: `Ингредиент: ${activeFilters.ingredient.trim()}`,
      });
    }

    if (activeFilters.favoritesOnly) {
      pills.push({
        id: 'favoritesOnly',
        label: 'Только избранные',
      });
    }

    return pills;
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.search.set(params.get('search') ?? '');
      this.sort.set(this.parseSort(params.get('sort')));
      this.viewMode.set(this.parseViewMode(params.get('view')));
      this.filters.set({
        search: params.get('search') ?? '',
        category: this.parseCategory(params.get('category')),
        difficulty: this.parseDifficulty(params.get('difficulty')),
        diet: this.parseDiet(params.get('diet')),
        format: this.parseFormat(params.get('format')),
        ingredient: params.get('ingredient') ?? '',
        favoritesOnly: params.get('favoritesOnly') === 'true',
        maxCookingTime: this.parseNullableNumber(params.get('maxCookingTime')),
      });
      this.runLoadingPulse();
    });
  }

  protected updateSearch(value: string): void {
    this.search.set(value);
  }

  protected commitSearch(query: string): void {
    this.search.set(query);
  }

  protected updateSort(sort: RecipeSort): void {
    this.sort.set(sort);
  }

  protected updateViewMode(mode: RecipeViewMode): void {
    this.viewMode.set(mode);
  }

  protected updateFilters(filters: RecipeFilters): void {
    this.filters.set(filters);
  }

  protected resetFilters(): void {
    this.filters.set(createDefaultRecipeFilters());
    this.search.set('');
  }

  protected removeFilter(filterId: ActiveFilterPill['id']): void {
    switch (filterId) {
      case 'search':
        this.search.set('');
        return;
      case 'category':
        this.patchFilters({ category: 'all' });
        return;
      case 'difficulty':
        this.patchFilters({ difficulty: 'all' });
        return;
      case 'diet':
        this.patchFilters({ diet: 'all' });
        return;
      case 'format':
        this.patchFilters({ format: 'all' });
        return;
      case 'maxCookingTime':
        this.patchFilters({ maxCookingTime: null });
        return;
      case 'ingredient':
        this.patchFilters({ ingredient: '' });
        return;
      case 'favoritesOnly':
        this.patchFilters({ favoritesOnly: false });
        return;
    }
  }

  protected openMobileFilters(): void {
    this.mobileFiltersOpen.set(true);
  }

  protected closeMobileFilters(): void {
    this.mobileFiltersOpen.set(false);
  }

  private patchFilters(patch: Partial<RecipeFilters>): void {
    this.filters.update((currentFilters) => ({ ...currentFilters, ...patch }));
  }

  private sortRecipes(recipes: readonly Recipe[], sort: RecipeSort): readonly Recipe[] {
    const items = [...recipes];

    switch (sort) {
      case 'newest':
        return items.sort((left, right) => right.id - left.id);
      case 'time-asc':
        return items.sort((left, right) => left.cookingTime - right.cookingTime);
      case 'time-desc':
        return items.sort((left, right) => right.cookingTime - left.cookingTime);
      case 'calories-asc':
        return items.sort((left, right) => left.calories - right.calories);
      case 'name-asc':
        return items.sort((left, right) => left.name.localeCompare(right.name, 'ru'));
      case 'popular':
      default:
        return items.sort(
          (left, right) =>
            left.cookingTime +
            left.calories / 10 -
            (right.cookingTime + right.calories / 10),
        );
    }
  }

  private parseCategory(value: string | null): RecipeCategory | 'all' {
    const defaultCategory = createDefaultRecipeFilters().category;

    if (value === null) {
      return defaultCategory;
    }

    return (
      [
        'breakfast',
        'soup',
        'main',
        'meat',
        'fish',
        'salad',
        'dessert',
        'drink',
      ] as const
    ).includes(value as RecipeCategory)
      ? (value as RecipeCategory)
      : defaultCategory;
  }

  private parseDifficulty(value: string | null): RecipeDifficulty | 'all' {
    const defaultDifficulty = createDefaultRecipeFilters().difficulty;

    if (value === null) {
      return defaultDifficulty;
    }

    return (['easy', 'medium', 'hard'] as const).includes(value as RecipeDifficulty)
      ? (value as RecipeDifficulty)
      : defaultDifficulty;
  }

  private parseDiet(value: string | null): RecipeDiet | 'all' {
    const defaultDiet = createDefaultRecipeFilters().diet;

    if (value === null) {
      return defaultDiet;
    }

    return (
      ['vegetarian', 'high-protein', 'gluten-free', 'light', 'comfort'] as const
    ).includes(value as RecipeDiet)
      ? (value as RecipeDiet)
      : defaultDiet;
  }

  private parseFormat(value: string | null): RecipeFilters['format'] {
    const defaultFormat = createDefaultRecipeFilters().format;

    if (value === 'food' || value === 'drink') {
      return value;
    }

    return defaultFormat;
  }

  private parseSort(value: string | null): RecipeSort {
    return RECIPE_SORT_OPTIONS.some((option) => option.value === value)
      ? (value as RecipeSort)
      : 'popular';
  }

  private parseViewMode(value: string | null): RecipeViewMode {
    return value === 'list' ? 'list' : 'grid';
  }

  private parseNullableNumber(value: string | null): number | null {
    if (value === null || value.trim().length === 0) {
      return null;
    }

    const parsedValue = Number.parseInt(value, 10);

    return Number.isNaN(parsedValue) ? null : parsedValue;
  }

  private runLoadingPulse(): void {
    this.loading.set(true);
    globalThis.setTimeout(() => this.loading.set(false), 280);
  }
}
