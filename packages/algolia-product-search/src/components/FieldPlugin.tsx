import { useFieldPlugin } from "@storyblok/field-plugin/react";
import { PluginContent } from "../lib/types";
import { ProductListView } from "./ProductListView";
import { ProductSearchPanel } from "./ProductSearchPanel";
import { isValidPluginContent } from "../lib/utils";

const DEFAULT_CONTENT: PluginContent = {
  products: [],
  storeKey: "nl"
};

const FieldPlugin = () => {
  const { type, data, actions } = useFieldPlugin({
    enablePortalModal: true,
    validateContent: (content: unknown) => ({
      content: isValidPluginContent(content) ? content : DEFAULT_CONTENT,
    }),
  });

  if (type !== "loaded") {
    return null;
  };

  const content = data.content as PluginContent;
  const options = data.options as Record<string, string>;

  if (!options.algoliaAppId || !options.algoliaSearchApiKey) {
    return (
      <div className="error">
        Missing Algolia configuration. Please set <code>algoliaAppId</code> and <code>algoliaSearchApiKey</code> in the plugin options.
      </div>
    );
  };

  if (data.isModalOpen) {
    return (
      <ProductSearchPanel
        content={content}
        options={options}
        onConfirm={(updatedContent) => {
          actions.setContent(updatedContent);
          actions.setModalOpen(false);
        }}
        onCancel={() => actions.setModalOpen(false)}
      />
    );
  };

  return (
    <ProductListView
      key={[...content.products.map(p => p.objectID)].sort().join(",")}
      content={content}
      onUpdate={(updatedContent) => actions.setContent(updatedContent)}
      onOpenModal={() => actions.setModalOpen(true, { width: "100vw", height: "100vh" })}
    />
  );
}

export default FieldPlugin;