import Link from "next/link";
import styles from "./styles.module.scss";

export default function Footer() {
	return (
		<div className={styles.footer}>
			<div className={styles.wrapper}>
				<p>
					© 2023 <a href="mailto:gabriel@roda.dev">gabriel@roda.dev</a>
				</p>

				<p>
					ícones e imagens por{" "}
					<Link href={"https://icons8.com"} target="_blank">
						Icons8
					</Link>
				</p>
				<div className={styles.links}>
					<Link target="_blank" href={`https://github.com/gaabrielrd`}>
						Github
					</Link>
					<Link
						target="_blank"
						href={`https://www.linkedin.com/in/gabriel-roda/`}
					>
						LinkedIn
					</Link>
				</div>
			</div>
		</div>
	);
}
