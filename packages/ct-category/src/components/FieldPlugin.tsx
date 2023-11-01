import { useState } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'
import './FieldPlugin.css'
import { useCategoryTree } from '../hooks/useCategoryTree'
import {
  filterCategoryTree,
  flattenCategoryTree,
  getCategoryPath,
} from '../lib/category-tree'
import { SearchField } from './SearchField'

export function FieldPlugin() {
  const plugin = useFieldPlugin()
  const categoryTree = useCategoryTree()
  const [search, setSearch] = useState('')

  const selectedCategoryPath =
    plugin.data.content && categoryTree
      ? getCategoryPath(
          categoryTree,
          (plugin.data.content as { id: string }).id,
        )
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
        plugin.actions.setContent({
          id: category.id,
          key: category.key,
        })
      }
      renderOption={(node) => (
        <span className={`level-${node.level}`}>{node.name}</span>
      )}
    />
  )
}
