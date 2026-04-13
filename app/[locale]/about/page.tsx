import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import cubeImage from "../../../public/images/3d-blocks-blocks-composition-62.png";
import projectsImage from "../../../public/images/3d-fluency-keyboard-1.png";
import platformsImage from "../../../public/images/3d-fluency-knowledge-sharing.png";
import resourcesImage from "../../../public/images/3d-fluency-training.png";

import type { CompanySection } from "@/app/projects/projects-data";
import { buildLocalizedPath, type Locale } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";
import { requireLocale } from "@/lib/i18n/validation";
import styles from "../../about/page.module.scss";

type AboutPageProps = {
	params: Promise<{
		locale: string;
	}>;
};

type AboutHighlight = {
	alt: string;
	label: string;
	value: string;
};

type AboutFocusArea = {
	description: string;
	title: string;
};

type ContactLink = {
	external?: boolean;
	href: string;
	label: string;
};

async function getAboutI18n(locale: Locale) {
	return getI18n(locale, ["about", "projects"]);
}

export async function generateMetadata({
	params,
}: AboutPageProps): Promise<Metadata> {
	const { locale: localeParam } = await params;
	const locale = requireLocale(localeParam);
	const i18n = await getAboutI18n(locale);
	const t = i18n.getFixedT(locale, "about");

	return {
		title: t("metadata.title"),
		description: t("metadata.description"),
	};
}

export default async function AboutPage({ params }: AboutPageProps) {
	const { locale: localeParam } = await params;
	const locale = requireLocale(localeParam);
	const i18n = await getAboutI18n(locale);
	const t = i18n.getFixedT(locale, "about");
	const tProjects = i18n.getFixedT(locale, "projects");
	const highlights = t("hero.highlights", {
		returnObjects: true,
	}) as AboutHighlight[];
	const focusAreas = t("focus.items", {
		returnObjects: true,
	}) as AboutFocusArea[];
	const contactLinks = t("closing.links", {
		returnObjects: true,
	}) as ContactLink[];
	const careerMoments = tProjects("companySections", {
		returnObjects: true,
	}) as CompanySection[];
	const highlightImages = [resourcesImage, platformsImage, projectsImage] as const;

	return (
		<main className={styles.main}>
			<section className={styles.hero}>
				<div className={styles.heroCopy}>
					<p className={`${styles.eyebrow} reveal-up`}>{t("hero.eyebrow")}</p>
					<h1 className="reveal-up reveal-delay-1">{t("hero.name")}</h1>
					<h2 className="reveal-up reveal-delay-2">{t("hero.role")}</h2>
					<p className={`${styles.intro} reveal-up reveal-delay-3`}>
						{t("hero.intro")}
					</p>

					<div className={`${styles.heroActions} reveal-up reveal-delay-4`}>
						<Link href={buildLocalizedPath(locale, "/projects")}>
							{t("hero.actions.projects")}
						</Link>
						<Link href={t("hero.actions.contactHref")}>
							{t("hero.actions.contactLabel")}
						</Link>
					</div>
				</div>

				<div className={styles.heroVisual} aria-hidden="true">
					<div className={styles.highlightList}>
						{highlights.map((highlight, index) => (
							<div
								key={highlight.label}
								className={`${styles.highlight} reveal-up reveal-delay-2`}
							>
								<Image
									src={highlightImages[index]}
									height={32}
									alt={highlight.alt}
								/>
								<div>
									<strong>{highlight.value}</strong>
									<span>{highlight.label}</span>
								</div>
							</div>
						))}
					</div>

					<div className={`${styles.cube} float-drift`}>
						<Image src={cubeImage} height={220} alt={t("hero.cubeAlt")} />
					</div>
				</div>
			</section>

			<section className={styles.focusSection}>
				<div className={`${styles.sectionHeading} reveal-up`}>
					<p className={styles.sectionLabel}>{t("focus.eyebrow")}</p>
					<h2>{t("focus.title")}</h2>
				</div>

				<div className={styles.focusGrid}>
					{focusAreas.map((area) => (
						<article
							key={area.title}
							className={`${styles.focusItem} reveal-up reveal-delay-1`}
						>
							<h3>{area.title}</h3>
							<p>{area.description}</p>
						</article>
					))}
				</div>
			</section>

			<section className={styles.careerSection}>
				<div className={`${styles.sectionHeading} reveal-up`}>
					<p className={styles.sectionLabel}>{t("career.eyebrow")}</p>
					<h2>{t("career.title")}</h2>
				</div>

				<div className={styles.careerList}>
					{careerMoments.map((moment) => (
						<article
							key={moment.slug}
							className={`${styles.careerItem} reveal-up reveal-delay-1`}
						>
							<p>{moment.period}</p>
							<h3>{moment.company}</h3>
							<h4>{moment.role}</h4>
							<p>{moment.summary}</p>
						</article>
					))}
				</div>
			</section>

			<section className={styles.closing}>
				<div className={`${styles.sectionHeading} reveal-up`}>
					<p className={styles.sectionLabel}>{t("closing.eyebrow")}</p>
					<h2>{t("closing.title")}</h2>
				</div>

				<p className={`${styles.closingCopy} reveal-up reveal-delay-1`}>
					{t("closing.description")}
				</p>

				<div className={`${styles.contactLinks} reveal-up reveal-delay-2`}>
					{contactLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							target={link.external ? "_blank" : undefined}
							rel={link.external ? "noreferrer" : undefined}
						>
							{link.label}
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
