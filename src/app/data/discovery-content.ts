import { RECIPE_IMAGE_URLS } from './recipe-images';

export interface EditorialCollection {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly accent: 'citrus' | 'herb' | 'berry';
  readonly badge: string;
}

export interface CommunityUpdate {
  readonly author: string;
  readonly title: string;
  readonly note: string;
  readonly timeLabel: string;
}

export interface CategorySpotlight {
  readonly title: string;
  readonly description: string;
  readonly eyebrow: string;
}

export const EDITORIAL_COLLECTIONS: readonly EditorialCollection[] = [
  {
    title: 'Уютные ужины буднего дня',
    description: 'Быстрые ужины с ярким вкусом, которые реально приготовить после работы.',
    image: RECIPE_IMAGE_URLS.teriyakiChicken,
    accent: 'citrus',
    badge: 'Подборка редакции',
  },
  {
    title: 'Клуб неспешных супов',
    description: 'Густые супы, кремовые текстуры и долгие выходные на кухне без суеты.',
    image: RECIPE_IMAGE_URLS.pumpkinSoup,
    accent: 'herb',
    badge: 'Для прохладных дней',
  },
  {
    title: 'Сладкая пауза',
    description: 'Небольшие сладкие проекты, когда хочется собрать красивую тарелку и выдохнуть.',
    image: RECIPE_IMAGE_URLS.cheesecake,
    accent: 'berry',
    badge: 'Любимый формат',
  },
] as const;

export const COMMUNITY_UPDATES: readonly CommunityUpdate[] = [
  {
    author: 'Оля',
    title: 'Делала шакшуку в субботу утром',
    note: 'Добавила немного кинзы и подавала с тёплой чиабаттой. Получился очень “бранчевый” вайб.',
    timeLabel: '2 часа назад',
  },
  {
    author: 'Дима',
    title: 'Брауни выдержал тест офиса',
    note: 'Уменьшил сахар на 20 грамм и добавил грецкий орех. Исчез со стола за 15 минут.',
    timeLabel: 'Сегодня',
  },
  {
    author: 'Лера',
    title: 'Матча-латте стал летним фаворитом',
    note: 'С овсяным молоком вкус мягче, а цвет всё ещё отлично выглядит на фото.',
    timeLabel: 'Вчера',
  },
] as const;

export const CATEGORY_SPOTLIGHTS: readonly CategorySpotlight[] = [
  {
    title: 'Завтраки без суеты',
    description: 'Тёплые блюда, которые не требуют сложного этапа подготовки.',
    eyebrow: 'Завтраки',
  },
  {
    title: 'Напитки с характером',
    description: 'От освежающего латте до пряного зимнего бокала без алкоголя.',
    eyebrow: 'Напитки',
  },
  {
    title: 'Мясо и рыба на ужин',
    description: 'Более плотные блюда с акцентом на главный продукт и понятный гарнир.',
    eyebrow: 'Мясо и рыба',
  },
  {
    title: 'Салаты и лёгкие тарелки',
    description: 'Когда нужно что-то свежее, быстрое и визуально лёгкое.',
    eyebrow: 'Салаты',
  },
] as const;
