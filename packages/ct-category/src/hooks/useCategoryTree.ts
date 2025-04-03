import { useFieldPlugin } from '@storyblok/field-plugin/react'
import { useEffect, useState } from 'react'
import { CategoryNode, buildCategoryTree } from '../lib/category-tree'
import { createToken, searchCategories } from '../lib/commercetools'

export const useCategoryTree = () => {
  const [categoryTree, setCategoryTree] = useState<CategoryNode>()
  const { type, data } = useFieldPlugin()

  useEffect(() => {
    if (type !== 'loaded' || !data) return

    const language =
      data.storyLang === 'default'
        ? data.options.defaultLanguage || 'en'
        : data.storyLang

    createToken({
      clientId: data.options.clientId,
      clientSecret: data.options.clientSecret,
      projectKey: data.options.projectKey,
    }).then((token) =>
      searchCategories({
        baseUri: data.options.baseUri,
        token,
        projectKey: data.options.projectKey,
        ancestorKey: data.options.ancestorKey,
      }).then((categories) =>
        setCategoryTree(
          buildCategoryTree(categories, language, 0, data.options.ancestorKey),
        ),
      ),
    )
  }, [type, data?.options])

  if (type !== 'loaded') return

  return categoryTree
}
