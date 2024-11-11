import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	{ ignores: ['dist', 'coverage'] },
	{
		extends: [
			js.configs.recommended,
			eslintPluginPrettierRecommended,
			...tseslint.configs.recommended,
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
		},
		rules: {
			"prettier/prettier": [
				"error",
				{
					"useTabs": true,
					"tabWidth": 2,
					"singleQuote": true,
					"trailingCommas": "es5",
					"semi": true
				}
			],
			"id-length": [
				"error",
				{
					"min": 3,
					"properties": "never",
					"exceptions": [
						"_",
						"id"
					]
				}
			],
			"lines-between-class-members": ["error", "always"]
		},
	},
)
