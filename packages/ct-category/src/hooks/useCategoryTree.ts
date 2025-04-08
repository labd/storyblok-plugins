import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { useEffect, useState } from 'react'
import { CategoryNode, buildCategoryTree } from '../lib/category-tree'
import { createToken, searchCategories } from '../lib/commercetools'

export const useCategoryTree = () => {
  const [categoryTree, setCategoryTree] = useState<CategoryNode>()
  const plugin = useFieldPlugin()

  useEffect(() => {
    if (!plugin) return

    const language =
      plugin.data.storyLang === 'default'
        ? plugin.data.options.defaultLanguage || 'en'
        : plugin.data.storyLang

    createToken({
      clientId: plugin.data.options.clientId,
      clientSecret: plugin.data.options.clientSecret,
      projectKey: plugin.data.options.projectKey,
    }).then((token) =>
      searchCategories({
        baseUri: plugin.data.options.baseUri,
        token,
        projectKey: plugin.data.options.projectKey,
        ancestorKey: plugin.data.options.ancestorKey,
      }).then((categories) =>
        setCategoryTree(
          buildCategoryTree(
            categories,
            language,
            0,
            plugin.data.options.ancestorKey,
          ),
        ),
      ),
    )
  }, [plugin.data.options])

  return categoryTree
}
