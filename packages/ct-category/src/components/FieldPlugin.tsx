import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { useState } from 'react'
import { useCategoryTree } from '../hooks/useCategoryTree'
import {
  filterCategoryTree,
  flattenCategoryTree,
  getCategoryPath,
} from '../lib/category-tree'
import './FieldPlugin.css'
import { SearchField } from './SearchField'

export function FieldPlugin() {
  const { type, data, actions } = useFieldPlugin()
  const categoryTree = useCategoryTree()
  const [search, setSearch] = useState('')

  if (type !== 'loaded') {
    return null
  }

  const content = data.content as { key?: string; id: string }

  const selectedCategoryPath =
    data.content && categoryTree
      ? getCategoryPath(categoryTree, content.key ?? content.id)
      : undefined

  const categoryNodes = categoryTree
    ? flattenCategoryTree(filterCategoryTree(categoryTree, search)).slice(1)
    : undefined

  return (
    <SearchField
      search={search}
      onSearch={setSearch}
      displayValue={selectedCategoryPath?.map((node) => node.name).join(' › ')}
      items={categoryNodes ?? []}
      onSelect={(category) =>
        actions.setContent(
          category
            ? {
                id: category.id,
                key: category.key,
              }
            : null,
        )
      }
      renderOption={(node) => (
        <span className={`level-${node.level}`}>{node.name}</span>
      )}
    />
  )
}
