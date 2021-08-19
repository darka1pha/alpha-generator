import React from "react"
import styles from "./Base.module.scss"

const Base = ({dummy = "defaultValue"}) => {
	return (
		<div className={styles["base"]}>
			<p>hello world</p>
			<p>{dummy}</p>
		</div>
	)
}

export default Base
