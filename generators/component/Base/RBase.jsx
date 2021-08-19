import React from "react"
import styles from "./Base.module.scss"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"


const RBase = ({dummy = "defaultValue"}) => {
	return (
		<div className={styles["base"]}>
			<p>hello world</p>
			<p>{dummy}</p>
		</div>
	)
}

const mapStateToProps = createStructuredSelector({
	// Your State Selectors
})
const mapDispatchToProps = (dispatch) => ({
	// Your Actions
})

export default connect(mapStateToProps,mapDispatchToProps)(RBase)
