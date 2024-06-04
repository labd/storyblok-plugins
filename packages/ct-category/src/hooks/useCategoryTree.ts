import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { useEffect, useState } from 'react'
import { createToken, searchCategories } from '../lib/commercetools'
import { CategoryNode, buildCategoryTree } from '../lib/category-tree'

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
      }).then((categories) =>
        setCategoryTree(buildCategoryTree(categories, language)),
      ),
    )
  }, [plugin.data.options])

  return categoryTree
}
