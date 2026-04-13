import Link from "next/link";
import styles from "./styles.module.scss";

type FooterLink = {
	href: string;
	label: string;
};

type FooterProps = {
	creditsLabel: string;
	email: string;
	emailLabel: string;
	externalLinks: FooterLink[];
	iconsByLabel: string;
	iconsByUrl: string;
	rightsLabel: string;
};

export default function Footer({
	creditsLabel,
	email,
	emailLabel,
	externalLinks,
	iconsByLabel,
	iconsByUrl,
	rightsLabel,
}: FooterProps) {
	return (
		<div className={styles.footer}>
			<div className={styles.wrapper}>
				<p>
					{rightsLabel} <a href={`mailto:${email}`}>{emailLabel}</a>
				</p>

				<p>
					{iconsByLabel}{" "}
					<Link href={iconsByUrl} target="_blank">
						{creditsLabel}
					</Link>
				</p>
				<div className={styles.links}>
					{externalLinks.map((link) => (
						<Link key={link.href} target="_blank" href={link.href}>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
