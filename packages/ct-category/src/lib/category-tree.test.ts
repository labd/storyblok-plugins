import type { Category } from '@commercetools/platform-sdk'
import { describe, expect, it } from 'vitest'
import {
  childCategory,
  grandchildCategory,
  parentCategory,
  standaloneCategory,
} from '../testing/fixtures'
import { buildCategoryTree } from './category-tree'

describe('buildCategoryTree', () => {
  it('should build a tree with a single root category', () => {
    const categories = [standaloneCategory]
    const result = buildCategoryTree(categories, 'en')

    expect(result.level).toBe(0)
    expect(result.children).toHaveLength(1)

    const child = result.children[0]
    expect(child.id).toBe(standaloneCategory.id)
    expect(child.key).toBe(standaloneCategory.key)
    expect(child.name).toBe(standaloneCategory.name.en)
    expect(child.level).toBe(1)
    expect(child.children).toHaveLength(0)
  })

  it('should build a tree with three levels', () => {
    const categories = [parentCategory, childCategory, grandchildCategory]
    const result = buildCategoryTree(categories, 'en')

    expect(result.children).toHaveLength(1)

    const parent = result.children[0]
    expect(parent.level).toBe(1)
    expect(parent.children).toHaveLength(1)

    const child = parent.children[0]
    expect(child.level).toBe(2)
    expect(child.children).toHaveLength(1)

    const grandchild = child.children[0]
    expect(grandchild.level).toBe(3)
    expect(grandchild.children).toHaveLength(0)
  })

  it('should handle multiple root categories', () => {
    const categories = [standaloneCategory, parentCategory, childCategory]
    const result = buildCategoryTree(categories, 'en')

    expect(result.children).toHaveLength(2)

    // Find standalone category
    const standalone = result.children.find(
      (c) => c.id === standaloneCategory.id,
    )
    expect(standalone).toBeDefined()
    expect(standalone?.level).toBe(1)
    expect(standalone?.children).toHaveLength(0)

    // Find parent category with child
    const parent = result.children.find((c) => c.id === parentCategory.id)
    expect(parent).toBeDefined()
    expect(parent?.level).toBe(1)
    expect(parent?.children).toHaveLength(1)
  })

  it('should use Dutch localization when specified', () => {
    const categories = [parentCategory, childCategory]
    const result = buildCategoryTree(categories, 'nl')

    const parent = result.children[0]
    expect(parent.name).toBe('Naam van de bovenliggende categorie')

    const child = parent.children[0]
    expect(child.name).toBe('Naam van de onderliggende categorie')
  })

  it('should handle empty categories array', () => {
    const result = buildCategoryTree([], 'en')

    expect(result.level).toBe(0)
    expect(result.children).toHaveLength(0)
  })

  it('should handle categories with missing parent references', () => {
    const orphanedCategory: Category = {
      ...childCategory,
      parent: undefined,
      ancestors: [],
    }

    const categories = [orphanedCategory]
    const result = buildCategoryTree(categories, 'en')

    expect(result.children).toHaveLength(1)
    expect(result.children[0].id).toBe(orphanedCategory.id)
    expect(result.children[0].level).toBe(1)
  })

  it('should handle unsorted category input correctly', () => {
    const categories = [grandchildCategory, parentCategory, childCategory] // in random order
    const result = buildCategoryTree(categories, 'en')

    expect(result.children).toHaveLength(1)

    const parent = result.children[0]
    expect(parent.id).toBe(parentCategory.id)
    expect(parent.key).toBe(parentCategory.key)
    expect(parent.name).toBe(parentCategory.name.en)
    expect(parent.level).toBe(1)

    const child = parent.children[0]
    expect(child.id).toBe(childCategory.id)
    expect(child.key).toBe(childCategory.key)
    expect(child.name).toBe(childCategory.name.en)
    expect(child.level).toBe(2)

    const grandchild = child.children[0]
    expect(grandchild.id).toBe(grandchildCategory.id)
    expect(grandchild.key).toBe(grandchildCategory.key)
    expect(grandchild.name).toBe(grandchildCategory.name.en)
    expect(grandchild.level).toBe(3)
  })
})
