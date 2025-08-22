import { Category } from '@commercetools/platform-sdk'
import { getLocalizedValue } from './localization'
export type CategoryNode = {
  id: string
  key?: string
  name: string
  level: number
  children: CategoryNode[]
}

/**
 * Builds a category tree from a list of Commercetools categories
 */
export const buildCategoryTree = (
  categories: Category[],
  language: string,
  level = 0,
): CategoryNode => {
  const root: CategoryNode = { id: '', name: '', level, children: [] }

  // Convert the list of ct categories to a map of nodes
  const nodesMap = new Map<string, CategoryNode>(
    categories.map((category) => [
      category.id,
      {
        id: category.id,
        name: getLocalizedValue(category.name, language),
        key: category.key,
        children: [],
        level,
      },
    ]),
  )

  for (const category of categories) {
    const node = nodesMap.get(category.id)
    if (!node) continue

    if (category.parent) {
      const parent = nodesMap.get(category.parent.id)
      if (parent) {
        parent.children.push(node)
      }
    } else {
      root.children.push(node)
    }
  }

  const calculateLevels = (node: CategoryNode, currentLevel: number) => {
    node.level = currentLevel
    for (const child of node.children) {
      calculateLevels(child, currentLevel + 1)
    }
  }

  // Assign levels after building the tree to handle unsorted category input
  for (const child of root.children) {
    calculateLevels(child, 1)
  }

  return root
}

/**
 * Returns a subtree of the category tree that contains only the nodes,
 * including their parents, that match the filter.
 */
export const filterCategoryTree = (
  categoryNode: CategoryNode,
  filter: string,
): CategoryNode => {
  const filteredChildren = categoryNode.children
    .map((child) => filterCategoryTree(child, filter))
    .filter(
      (child) =>
        child.name.toLowerCase().includes(filter.toLowerCase()) ||
        child.children.length > 0,
    )
  return {
    ...categoryNode,
    children: filteredChildren,
  }
}

/**
 * Returns a flat list of all the nodes in the category tree.
 */
export const flattenCategoryTree = (
  categoryNode: CategoryNode,
): CategoryNode[] => {
  const flattenedChildren = categoryNode.children
    .map((child) => flattenCategoryTree(child))
    .flat()
  return [categoryNode, ...flattenedChildren]
}

/**
 * Returns the path of the category with the given id.
 */
export const getCategoryPath = (
  categoryNode: CategoryNode,
  id: string,
  path: CategoryNode[] = [],
): CategoryNode[] => {
  if (categoryNode.key === id || categoryNode.id === id) {
    return path
  }
  const childrenPath = categoryNode.children
    .map((child) => getCategoryPath(child, id, [...path, child]))
    .find((childPath) => childPath.length > 0)
  return childrenPath || []
}
