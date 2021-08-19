"use strict"

const inquirer = require("inquirer")
const {writeFileSync, readFileSync, mkdirSync} = require("fs")

console.log("\n** Redux Config Generator ** \n")
console.log("!! Redux Logger exists in all configurations !! ")

const Questions = [
	{
		type: "list",
		name: "usage",
		message: "select your files format?",
		choices: ["Jsx", "Tsx"],
	},
	{
		type: "list",
		name: "thunk",
		message: "want to use Redux thunk ?",
		choices: ["Yes", "No"],
	},
	{
		type: "list",
		name: "persist",
		message: "want to use Redux persist ?",
		choices: ["Yes", "No"],
	},
	{
		type: "list",
		name: "next",
		message: "are you using next.js?",
		choices: ["Yes", "No"],
	},
]

inquirer.prompt(Questions).then((answers) => {
	const next = answers["next"] === "Yes"
	const componentPath = next ? `./redux` : `./src/redux`
	const thunk = answers["thunk"] === "Yes"
	const persist = answers["persist"] === "Yes"

	console.log({
		next,
		thunk,
		persist,
	})

	mkdirSync(componentPath, {recursive: true})

	const usage = answers["usage"]

	const store = readFileSync("./generators/redux/config/store.tsx").toString()
	const store_thunk_persist = readFileSync(
		"./generators/redux/config/store_thunk_persist.tsx",
	).toString()

	const store_thunk = readFileSync(
		"./generators/redux/config/store_thunk.tsx",
	).toString()

	const next_store = readFileSync(
		"./generators/redux/config/next_store.tsx",
	).toString()

	const next_store_thunk = readFileSync(
		"./generators/redux/config/next_store_thunk.tsx",
	).toString()

	const next_storage = readFileSync(
		"./generators/redux/config/next_storage.tsx",
	).toString()

	const next_store_persist = readFileSync(
		"./generators/redux/config/next_store_persist.tsx",
	).toString()

	const next_thunk_store_persist = readFileSync(
		"./generators/redux/config/next_thunk_store_persist.tsx",
	).toString()

	const store_persist = readFileSync(
		"./generators/redux/config/store_persist.tsx",
	).toString()

	const rootReducer = readFileSync(
		"./generators/redux/config/rootReducer.tsx",
	).toString()

	if (usage === "Tsx") {
		writeFileSync(`rootReducer.tsx`, rootReducer)
		if (next) {
			if (persist && thunk) {
				console.log("All Options!!")
				writeFileSync(`${componentPath}/storage.tsx`, next_storage)
				writeFileSync(`${componentPath}/store.ts`, next_thunk_store_persist)
			} else if (!persist && thunk) {
				writeFileSync(`${componentPath}/store.ts`, next_store_thunk)
			} else if (!thunk && persist) {
				writeFileSync(`${componentPath}/storage.ts`, next_storage)
				writeFileSync(`${componentPath}/store.ts`, next_store_persist)
			} else if (!thunk && !persist) {
				writeFileSync(`${componentPath}/store.ts`, next_store)
			}
		} else if (!next) {
			if (persist && thunk) {
				writeFileSync(`${componentPath}/store.ts`, store_thunk_persist)
			} else if (!persist && thunk) {
				writeFileSync(`${componentPath}/store.ts`, store_thunk)
			} else if (!thunk && persist) {
				writeFileSync(`${componentPath}/store.ts`, store_persist)
			} else if (!thunk && !persist) {
				writeFileSync(`${componentPath}/store.ts`, store)
			}
		}
	} else if (usage === "Jsx") {
		writeFileSync(`rootReducer.jsx`, rootReducer)
		if (next) {
			if (persist && thunk) {
				writeFileSync(`${componentPath}/storage.js`, next_storage)
				writeFileSync(`${componentPath}/store.js`, next_thunk_store_persist)
			} else if (!persist && thunk) {
				writeFileSync(`${componentPath}/store.js`, next_store_thunk)
			} else if (!thunk && persist) {
				writeFileSync(`${componentPath}/storage.jsx`, next_storage)
				writeFileSync(`${componentPath}/store.js`, next_store_persist)
			} else if (!thunk && !persist) {
				writeFileSync(`${componentPath}/store.js`, next_store)
			}
		} else if (!next) {
			if (persist && thunk) {
				writeFileSync(`${componentPath}/store.js`, store_thunk_persist)
			} else if (!persist && thunk) {
				writeFileSync(`${componentPath}/store.js`, store_thunk)
			} else if (!thunk && persist) {
				writeFileSync(`${componentPath}/store.js`, store_persist)
			} else if (!thunk && !persist) {
				writeFileSync(`${componentPath}/store.js`, store)
			}
		}
	}
})
