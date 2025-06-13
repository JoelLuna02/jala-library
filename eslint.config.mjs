import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import pluginJs from "@eslint/js";
import eslintrecomend from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	{ ignores: ["build/**/*", "node_modules/**/*"] },
	{
		rules: {
			indent: ["warn", "tab"],
			"linebreak-style": ["error", "unix"],
			quotes: ["error", "double"],
			"prettier/prettier": ["warn"],
			"no-unused-vars": "warn",
			semi: "error",
		},
	},
	pluginJs.configs.recommended,
	eslintrecomend,
];

export default eslintConfig;
