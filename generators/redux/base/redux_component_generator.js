"use strict"

const inquirer = require("inquirer")
const {writeFileSync, readFileSync, mkdirSync} = require("fs")

const Questions = [
	{
		type: "input",
		name: "name",
		message: "Enter Redux Component Name : ",
		validate(value) {
			if (value.includes(" ")) {
				return "You cant use spaces in Component Name!"
			}
			return true
		},
	},
	{
		type: "list",
		name: "usage",
		message: "select your files format?",
		choices: ["Jsx", "Tsx"],
	},
	{
		type: "list",
		name: "next",
		message: "are you using next.js?",
		choices: ["Yes", "No"],
	},
]

inquirer.prompt(Questions).then((answers) => {
	const componentName = answers["name"]
	const next = answers["next"]
	const componentPath =
		next === "Yes" ? `./redux/${componentName}` : `./src/redux/${componentName}`
	mkdirSync(componentPath, {recursive: true})

	const usage = answers["usage"]

	const actions = readFileSync("./generators/redux/Base/base.actions.tsx")
	const reducer = readFileSync("./generators/redux/Base/base.reducer.tsx")
	const types = readFileSync("./generators/redux/Base/base.types.tsx")
	const selectors = readFileSync("./generators/redux/Base/base.selectors.tsx")

	// Change Files
	//  Tsx
	const componentActions = actions.toString().replace(/base/g, componentName)

	const componentReducer = reducer.toString().replace(/base/g, componentName)

	const componentTypes = types.toString().replace(/base/g, componentName)

	const componentSelectors = selectors
		.toString()
		.replace(/base/g, componentName)

	if (usage === "Tsx") {
		writeFileSync(
			`${componentPath}/${componentName}.actions.tsx`,
			componentActions,
		)
		writeFileSync(
			`${componentPath}/${componentName}.reducer.tsx`,
			componentReducer,
		)
		writeFileSync(`${componentPath}/${componentName}.types.tsx`, componentTypes)
		writeFileSync(
			`${componentPath}/${componentName}.selectors.tsx`,
			componentSelectors,
		)
	} else if (usage === "Jsx") {
		writeFileSync(
			`${componentPath}/${componentName}.actions.jsx`,
			componentActions,
		)
		writeFileSync(
			`${componentPath}/${componentName}.reducer.jsx`,
			componentReducer,
		)
		writeFileSync(`${componentPath}/${componentName}.types.jsx`, componentTypes)
		writeFileSync(
			`${componentPath}/${componentName}.selectors.jsx`,
			componentSelectors,
		)
	}
})
