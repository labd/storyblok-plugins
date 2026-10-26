import { useEffect, useState } from "react";
import { buildCategoryTree, type CategoryNode } from "../lib/category-tree";
import { createToken, searchCategories } from "../lib/commercetools";

export const useCategoryTree = (
	options: Record<string, string>,
	storyLang: string,
) => {
	const [categoryTree, setCategoryTree] = useState<CategoryNode>();
	// The options object may be recreated on every plugin state update, so
	// compare by value to only refetch when the options actually change.
	const optionsKey = JSON.stringify(options);

	// biome-ignore lint/correctness/useExhaustiveDependencies: only refetch when the plugin options change (by value), not on every plugin state update
	useEffect(() => {
		const language =
			storyLang === "default" ? options.defaultLanguage || "en" : storyLang;

		createToken({
			clientId: options.clientId,
			clientSecret: options.clientSecret,
			projectKey: options.projectKey,
		}).then((token) =>
			searchCategories({
				baseUri: options.baseUri,
				token,
				projectKey: options.projectKey,
				ancestorKey: options.ancestorKey,
			}).then((categories) =>
				setCategoryTree(buildCategoryTree(categories, language, 0)),
			),
		);
	}, [optionsKey]);

	return categoryTree;
};
