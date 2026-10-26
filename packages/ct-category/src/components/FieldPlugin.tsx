import type {
	FieldPluginActions,
	FieldPluginData,
} from "@storyblok/field-plugin";
import { useState } from "react";
import "./FieldPlugin.css";
import { useCategoryTree } from "../hooks/useCategoryTree";
import {
	filterCategoryTree,
	flattenCategoryTree,
	getCategoryPath,
} from "../lib/category-tree";
import { SearchField } from "./SearchField";

type FieldPluginProps = {
	data: FieldPluginData<unknown>;
	actions: FieldPluginActions<unknown>;
};

export function FieldPlugin({ data, actions }: FieldPluginProps) {
	const categoryTree = useCategoryTree(data.options, data.storyLang);
	const [search, setSearch] = useState("");

	const content = data.content as { key?: string; id: string };

	const selectedCategoryPath =
		data.content && categoryTree
			? getCategoryPath(categoryTree, content.key ?? content.id)
			: undefined;

	const categoryNodes = categoryTree
		? flattenCategoryTree(filterCategoryTree(categoryTree, search)).slice(1)
		: undefined;

	return (
		<SearchField
			search={search}
			onSearch={setSearch}
			displayValue={selectedCategoryPath?.map((node) => node.name).join(" › ")}
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
	);
}
