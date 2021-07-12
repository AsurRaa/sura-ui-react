[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://asurraa.github.io/sura-ui?path=/story/components-colorpicker--primary)

# @asurraa/sura-ui-color-picker

> Color Picker Components!

```sh
yarn add @asurraa/sura-ui-color-picker
```

## Usages

```tsx
import { AsurRaaColorPicker } from "@asurraa/sura-ui-color-picker";

const App = () => {
	return (
		<>
			<AsurRaaColorPicker
				initValue="#ffffff"
				onChange={(color) => {
					console.lo(color);
				}}
				value="#ffffff"
			/>
		</>
	);
};
```
