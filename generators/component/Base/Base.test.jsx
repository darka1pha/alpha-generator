import React from "react"
import renderer from "react-test-renderer"
import Base from "./Base"

test("Test for Component", () => {
	renderer.create(<Base dummy='test'>Facebook</Base>)
})
