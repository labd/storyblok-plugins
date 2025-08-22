import type { Category } from '@commercetools/platform-sdk'

export const parentCategory: Category = {
  id: '0000-0000-0000-0000',
  key: 'parent-category-key',
  version: 1,
  createdAt: '2021-01-01T00:00:00.000Z',
  lastModifiedAt: '2021-01-01T00:00:00.000Z',
  orderHint: '0.000000000001',
  ancestors: [],
  name: {
    en: 'Parent Category Name',
    nl: 'Naam van de bovenliggende categorie',
  },
  slug: {
    en: 'parent-category-name',
    nl: 'naam-van-de-bovenliggende-categorie',
  },
}

export const childCategory: Category = {
  id: '0001-0001-0001-0001',
  key: 'child-category-key',
  version: 1,
  createdAt: '2021-01-01T00:00:00.000Z',
  lastModifiedAt: '2021-01-01T00:00:00.000Z',
  orderHint: '0.000000000001',
  name: {
    en: 'Child Category Name',
    nl: 'Naam van de onderliggende categorie',
  },
  slug: {
    en: 'child-category-name',
    nl: 'naam-van-de-onderliggende-categorie',
  },
  description: {
    en: 'Child category description',
    nl: 'Beschrijving van de onderliggende categorie',
  },
  parent: {
    typeId: 'category',
    id: parentCategory.id,
  },
  ancestors: [
    {
      typeId: 'category',
      id: parentCategory.id,
      obj: parentCategory,
    },
  ],
}

export const grandchildCategory: Category = {
  id: '0002-0002-0002-0002',
  key: 'grandchild-category-key',
  version: 1,
  createdAt: '2021-01-01T00:00:00.000Z',
  lastModifiedAt: '2021-01-01T00:00:00.000Z',
  orderHint: '0.000000000001',
  name: {
    en: 'Grandchild Category Name',
    nl: 'Naam van de kleinkind categorie',
  },
  slug: {
    en: 'grandchild-category-name',
    nl: 'naam-van-de-kleinkind-categorie',
  },
  parent: {
    typeId: 'category',
    id: childCategory.id,
  },
  ancestors: [
    {
      typeId: 'category',
      id: parentCategory.id,
      obj: parentCategory,
    },
    {
      typeId: 'category',
      id: childCategory.id,
      obj: childCategory,
    },
  ],
}

export const standaloneCategory: Category = {
  id: '0003-0003-0003-0003',
  key: 'standalone-category-key',
  version: 1,
  createdAt: '2021-01-01T00:00:00.000Z',
  lastModifiedAt: '2021-01-01T00:00:00.000Z',
  orderHint: '0.000000000001',
  name: {
    en: 'Standalone Category Name',
    nl: 'Naam van de zelfstandige categorie',
  },
  slug: {
    en: 'standalone-category-name',
    nl: 'naam-van-de-zelfstandige-categorie',
  },
  ancestors: [],
}
