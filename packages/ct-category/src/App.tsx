import { useFieldPlugin } from "@storyblok/field-plugin/react";
import type { FunctionComponent } from "react";
import { FieldPlugin } from "./components/FieldPlugin";

const App: FunctionComponent = () => {
	const plugin = useFieldPlugin();

	if (plugin.type === "loading") {
		return <Loading />;
	}
	if (plugin.type === "error") {
		return <ErrorMessage error={plugin.error} />;
	}
	return <FieldPlugin data={plugin.data} actions={plugin.actions} />;
};

const Loading: FunctionComponent = () => <p>Loading...</p>;

const ErrorMessage: FunctionComponent<{ error: Error }> = (props) => {
	console.error(props.error);
	return <p>An error occured, please see the console for more details.</p>;
};

export default App;
