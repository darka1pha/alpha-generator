"use strict"

const inquirer = require("inquirer")
const {writeFileSync, readFileSync, mkdirSync} = require("fs")

const Questions = [
	{
		type: "input",
		name: "name",
		message: "Enter Component Name : ",
		validate(value) {
			if (value.includes(" ")) {
				return "You cant use spaces in Component Name!"
			}
			return true
		},
	},
	{
		type: "input",
		name: "path",
		message: "Enter Component Path(I make folder for each Component) : ",
		default: "./components",
		validate(value) {
			if (value.includes(" ")) {
				return "You cant use spaces in Component Path!"
			}
			return true
		},
	},
	{
		type: "list",
		name: "usage",
		message: "do you want this conf for JS or TS?",
		choices: ["Jsx", "Tsx"],
	},
	{
		type: "list",
		name: "redux",
		message: "do you want to use Redux?",
		choices: ["Yes", "No"],
	},
	{
		type: "list",
		name: "test",
		message: "do you want test file for this component?",
		choices: ["Yes", "No"],
	},
]

inquirer.prompt(Questions).then((answers) => {
	const cName = answers["name"]
	const componentName = {
		kebabCase: cName,
		pascalCase: toPascalCase(cName),
	}

	const cPath = answers["path"]
	const componentPath = `${cPath}/${componentName.pascalCase}`
	mkdirSync(componentPath, {recursive: true})

	const usage = answers["usage"]
	const testFile = answers["test"]
	const redux = answers["redux"]

	const baseTsx = readFileSync("./generators/component/Base/Base.tsx")
	const baseTestTsx = readFileSync("./generators/component/Base/Base.test.tsx")
	const RBaseTsx = readFileSync("./generators/component/Base/RBase.tsx")

	const RBaseJsx = readFileSync("./generators/component/Base/RBase.jsx")
	const baseJsx = readFileSync("./generators/component/Base/Base.jsx")
	const baseTestJsx = readFileSync("./generators/component/Base/Base.test.jsx")

	//	Change Files
	//  Tsx
	const componentTsx = baseTsx
		.toString()
		.replace(/Base/g, componentName.pascalCase)
		.replace(/Base/g, componentName.kebabCase)

	//  Tsx with Redux Connect
	const RComponentTsx = RBaseTsx.toString()
		.replace(/RBase/g, componentName.pascalCase)
		.replace(/RBase/g, componentName.kebabCase)

	// Tsx Test
	const componentTestTsx = baseTestTsx
		.toString()
		.replace(/Base/g, componentName.pascalCase)
		.replace(/Base/g, componentName.kebabCase)

	//  Jsx
	const componentJsx = baseJsx
		.toString()
		.replace(/Base/g, componentName.pascalCase)
		.replace(/Base/g, componentName.kebabCase)

	//  Jsx with Redux Connect
	const RComponentJsx = RBaseJsx.toString()
		.replace(/RBase/g, componentName.pascalCase)
		.replace(/RBase/g, componentName.kebabCase)

	//  Jsx Test
	const componentTestJsx = baseTestJsx
		.toString()
		.replace(/Base/g, componentName.pascalCase)
		.replace(/Base/g, componentName.kebabCase)

	if (usage === "Tsx") {
		if (redux === "Yes" && testFile === "Yes") {
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.tsx`,
				RComponentTsx,
			)
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.test.tsx`,
				componentTestTsx,
			)
		} else if (redux === "Yes" && testFile === "No") {
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.tsx`,
				RComponentTsx,
			)
		} else if (redux === "No" && testFile === "Yes") {
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.tsx`,
				componentTsx,
			)
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.test.tsx`,
				componentTestTsx,
			)
		} else if (redux === "No" && testFile === "No") {
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.tsx`,
				componentTsx,
			)
		}
	} else if (usage === "Jsx") {
		if (redux === "Yes" && testFile === "Yes") {
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.jsx`,
				RComponentJsx,
			)
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.test.jsx`,
				componentTestJsx,
			)
		} else if (redux === "Yes" && testFile === "No") {
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.jsx`,
				RComponentJsx,
			)
		} else if (redux === "No" && testFile === "Yes") {
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.jsx`,
				componentJsx,
			)
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.test.jsx`,
				componentTestJsx,
			)
		} else if (redux === "No" && testFile === "No") {
			writeFileSync(
				`${componentPath}/${componentName.pascalCase}.jsx`,
				componentJsx,
			)
		}
	}
})

// Helpers
function toPascalCase(input) {
	const split = input.split("-")
	return split.map((i) => capitalize(i)).join("")
}

function capitalize(s) {
	if (typeof s !== "string") return ""
	return s.charAt(0).toUpperCase() + s.slice(1)
}
