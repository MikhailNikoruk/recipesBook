import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AssetUrlService } from '../../core/services/asset-url.service';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';

interface CategoryEntry {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly queryParams: Record<string, string | number | boolean>;
}

@Component({
  selector: 'app-categories-page',
  imports: [CategoryCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="categories-page page-section">
      <div class="section-heading">
        <p class="section-heading__eyebrow">Категории</p>
        <h1 class="display-serif">Выбирайте рецепты по сценарию, а не только по названию</h1>
        <p class="section-heading__text">
          Категории собраны как отдельные точки входа: от быстрых завтраков до рыбы, мяса и
          лёгких салатов.
        </p>
      </div>

      <div class="categories-page__grid">
        @for (entry of entries; track entry.title) {
          <app-category-card
            [eyebrow]="entry.eyebrow"
            [title]="entry.title"
            [description]="entry.description"
            [image]="resolveAsset(entry.image)"
            routerLink="/recipes"
            [queryParams]="entry.queryParams"
          />
        }
      </div>
    </section>
  `,
  styles: [
    `
      .categories-page {
        display: grid;
        gap: 1.5rem;
      }

      .categories-page h1 {
        max-width: 12ch;
        font-size: clamp(2.5rem, 4vw, 4rem);
      }

      .categories-page__grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      @media (max-width: 980px) {
        .categories-page__grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 640px) {
        .categories-page__grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CategoriesPageComponent {
  private readonly assetUrlService = inject(AssetUrlService);

  protected readonly entries: readonly CategoryEntry[] = [
    {
      eyebrow: 'Завтраки',
      title: 'Быстрый и плотный старт дня',
      description: 'Когда нужен понятный завтрак без длинной подготовки.',
      image: 'images/shakshuka.svg',
      queryParams: { category: 'breakfast' },
    },
    {
      eyebrow: 'Супы',
      title: 'Тёплые глубокие вкусы',
      description: 'Крем-супы и бульоны для спокойного обеда или ужина.',
      image: 'images/pumpkin-soup.svg',
      queryParams: { category: 'soup' },
    },
    {
      eyebrow: 'Основное',
      title: 'Рабочие блюда на каждый день',
      description: 'Паста, рис и понятные ужины, которые хочется повторять.',
      image: 'images/mushroom-pasta.svg',
      queryParams: { category: 'main' },
    },
    {
      eyebrow: 'Мясо',
      title: 'Фокус на главный продукт',
      description: 'Стейки и плотные мясные блюда с ясной подачей.',
      image: 'images/beef-steak.svg',
      queryParams: { category: 'meat' },
    },
    {
      eyebrow: 'Рыба',
      title: 'Лёгкая, но выразительная подача',
      description: 'Рецепты, где рыба остаётся центральным героем тарелки.',
      image: 'images/honey-salmon.svg',
      queryParams: { category: 'fish' },
    },
    {
      eyebrow: 'Салаты и десерты',
      title: 'Свежие и финальные акценты',
      description: 'Лёгкие салаты, десерты и напитки для завершения меню.',
      image: 'images/greek-salad.svg',
      queryParams: { category: 'salad' },
    },
  ];

  protected resolveAsset(path: string): string {
    return this.assetUrlService.resolve(path);
  }
}
