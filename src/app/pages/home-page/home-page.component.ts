import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AssetUrlService } from '../../core/services/asset-url.service';
import { RecipeRepositoryService } from '../../core/services/recipe-repository.service';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { CollectionBannerComponent } from '../../shared/components/collection-banner/collection-banner.component';
import { FilterChipItem, FilterChipsComponent } from '../../shared/components/filter-chips/filter-chips.component';
import { RecipeCardComponent } from '../../shared/components/recipe-card/recipe-card.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { SkeletonCardComponent } from '../../shared/components/skeleton-card/skeleton-card.component';

interface HomeCategoryCard {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly queryParams: Record<string, string | number | boolean>;
}

interface HomeCollection {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly queryParams: Record<string, string | number | boolean>;
}

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    SearchBarComponent,
    FilterChipsComponent,
    CategoryCardComponent,
    CollectionBannerComponent,
    RecipeCardComponent,
    SkeletonCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly router = inject(Router);
  private readonly assetUrlService = inject(AssetUrlService);
  private readonly recipeRepository = inject(RecipeRepositoryService);

  protected readonly heroQuery = signal('');
  protected readonly loading = signal(true);
  protected readonly popularRecipes = this.recipeRepository.getPopular(4);
  protected readonly newRecipes = this.recipeRepository.getNewest(4);
  protected readonly quickChips: readonly FilterChipItem[] = [
    { id: 'breakfast', label: 'Завтрак' },
    { id: 'lunch', label: 'Обед' },
    { id: 'dinner', label: 'Ужин' },
    { id: 'dessert', label: 'Десерт' },
    { id: 'drinks', label: 'Напитки' },
    { id: 'under-30', label: 'До 30 минут' },
    { id: 'vegetarian', label: 'Вегетарианское' },
  ];
  protected readonly categories: readonly HomeCategoryCard[] = [
    {
      eyebrow: 'Завтраки',
      title: 'Утро без перегруза',
      description: 'Плотные, но быстрые рецепты, с которых удобно начинать день.',
      image: 'images/shakshuka.svg',
      queryParams: { category: 'breakfast' },
    },
    {
      eyebrow: 'Супы',
      title: 'Тёплые тарелки',
      description: 'Кремовые и бульонные супы, когда нужна понятная уютная еда.',
      image: 'images/pumpkin-soup.svg',
      queryParams: { category: 'soup' },
    },
    {
      eyebrow: 'Основное',
      title: 'Будничные ужины',
      description: 'Паста, рис и другие рабочие блюда, которые не требуют лишней суеты.',
      image: 'images/mushroom-pasta.svg',
      queryParams: { category: 'main' },
    },
    {
      eyebrow: 'Мясо и рыба',
      title: 'Центр тарелки',
      description: 'Блюда, где главный ингредиент задаёт характер всей подаче.',
      image: 'images/honey-salmon.svg',
      queryParams: { category: 'fish' },
    },
  ];
  protected readonly collections: readonly HomeCollection[] = [
    {
      eyebrow: 'Подборка недели',
      title: 'Ужин после работы',
      description: 'Рецепты с чётким вкусом и понятной логикой приготовления: открыть, выбрать, приготовить.',
      image: 'images/teriyaki-rice.svg',
      queryParams: { maxCookingTime: 45, format: 'food' },
    },
    {
      eyebrow: 'Лёгкий режим',
      title: 'Свежие салаты и напитки',
      description: 'Когда хочется чего-то легче: быстрые салаты, лимонады и мягкие по калорийности рецепты.',
      image: 'images/greek-salad.svg',
      queryParams: { diet: 'light' },
    },
  ];

  constructor() {
    setTimeout(() => this.loading.set(false), 420);
  }

  protected openSearch(query: string): void {
    void this.router.navigate(['/recipes'], {
      queryParams: query.length > 0 ? { search: query } : undefined,
    });
  }

  protected applyQuickChip(chipId: string): void {
    const queryParams: Record<string, string | number | boolean> = {};

    switch (chipId) {
      case 'breakfast':
        queryParams['category'] = 'breakfast';
        break;
      case 'lunch':
        queryParams['category'] = 'soup';
        break;
      case 'dinner':
        queryParams['category'] = 'main';
        break;
      case 'dessert':
        queryParams['category'] = 'dessert';
        break;
      case 'drinks':
        queryParams['format'] = 'drink';
        break;
      case 'under-30':
        queryParams['maxCookingTime'] = 30;
        break;
      case 'vegetarian':
        queryParams['diet'] = 'vegetarian';
        break;
      default:
        break;
    }

    void this.router.navigate(['/recipes'], { queryParams });
  }

  protected openRandomRecipe(): void {
    const recipe = this.recipeRepository.getRandom();
    void this.router.navigate(['/recipes', recipe.id]);
  }

  protected resolveAsset(path: string): string {
    return this.assetUrlService.resolve(path);
  }
}
