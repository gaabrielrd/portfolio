import styles from "./styles.module.scss";

export default function Blobs() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.shapeBlob}></div>
				<div className={[styles.shapeBlob, styles.one].join(" ")}></div>
				<div className={[styles.shapeBlob, styles.two].join(" ")}></div>

				<div className={styles.overlay}></div>
			</div>
		</div>
	);
}
