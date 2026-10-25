import { FieldPluginProvider } from "@storyblok/field-plugin/react";
import type { FunctionComponent } from "react";
import { FieldPlugin } from "./components/FieldPlugin";

const App: FunctionComponent = () => {
	return (
		<FieldPluginProvider Loading={Loading} Error={ErrorMessage}>
			<FieldPlugin />
		</FieldPluginProvider>
	);
};

const Loading: FunctionComponent = () => <p>Loading...</p>;

const ErrorMessage: FunctionComponent<{ error: Error }> = (props) => {
	console.error(props.error);
	return <p>An error occured, please see the console for more details.</p>;
};

export default App;
