import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import resourcesImage from "../../public/images/3d-fluency-training.png";
import platformsImage from "../../public/images/3d-fluency-knowledge-sharing.png";
import projectsImage from "../../public/images/3d-fluency-keyboard-1.png";
import cubeImage from "../../public/images/3d-blocks-blocks-composition-62.png";

import styles from "../page.module.scss";
import { buildLocalizedPath, type Locale } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";
import { requireLocale } from "@/lib/i18n/validation";

type HomePageProps = {
	params: Promise<{
		locale: string;
	}>;
};

type HomeMetric = {
	alt: string;
	label: string;
	value: string;
};

type SupportItem = {
	description: string;
	title: string;
};

function getHomeImages() {
	return [resourcesImage, platformsImage, projectsImage] as const;
}

async function getHomeTranslations(locale: Locale) {
	const i18n = await getI18n(locale, ["home"]);
	return i18n.getFixedT(locale, "home");
}

export async function generateMetadata({
	params,
}: HomePageProps): Promise<Metadata> {
	const { locale: localeParam } = await params;
	const locale = requireLocale(localeParam);
	const t = await getHomeTranslations(locale);

	return {
		title: t("metadata.title"),
		description: t("metadata.description"),
	};
}

export default async function HomePage({ params }: HomePageProps) {
	const { locale: localeParam } = await params;
	const locale = requireLocale(localeParam);
	const t = await getHomeTranslations(locale);
	const metrics = t("hero.metrics", {
		returnObjects: true,
	}) as HomeMetric[];
	const supportItems = t("support.items", {
		returnObjects: true,
	}) as SupportItem[];
	const metricImages = getHomeImages();

	return (
		<main className={styles.main}>
			<section className={styles.hero}>
				<div className={styles.copy}>
					<p className={`${styles.eyebrow} reveal-up`}>{t("hero.eyebrow")}</p>
					<h1 className="reveal-up reveal-delay-1">{t("hero.title")}</h1>
					<p className={`${styles.intro} reveal-up reveal-delay-2`}>
						{t("hero.intro.0")}
					</p>
					<p className={`${styles.intro} reveal-up reveal-delay-2`}>
						{t("hero.intro.1")}
					</p>
					<p className={`${styles.intro} reveal-up reveal-delay-2`}>
						{t("hero.intro.2")}
					</p>
					<div className={`${styles.actions} reveal-up reveal-delay-3`}>
						<Link href={buildLocalizedPath(locale, "/projects")}>
							{t("hero.actions.projects")}
						</Link>
						<Link href={buildLocalizedPath(locale, "/about")}>
							{t("hero.actions.about")}
						</Link>
					</div>
				</div>

				<div className={styles.visual} aria-hidden="true">
					<div className={styles.metrics}>
						<ul>
							{metrics.map((metric, index) => (
								<li
									key={metric.label}
									className={`reveal-up reveal-delay-${index + 2}`}
								>
									<div className={styles.metricIcon}>
										<Image
											src={metricImages[index]}
											height={imgSize}
											alt={metric.alt}
										/>
									</div>
									<div>
										<strong>{metric.value}</strong>
										<span>{metric.label}</span>
									</div>
								</li>
							))}
						</ul>
					</div>

					<div className={`${styles.cube} float-drift`}>
						<Image src={cubeImage} height={240} alt={t("hero.visual.cubeAlt")} />
					</div>
				</div>
			</section>

			<section className={styles.support}>
				<div className="reveal-up">
					<p className={styles.sectionLabel}>{t("support.eyebrow")}</p>
					<h2>{t("support.title")}</h2>
				</div>
				<div className={styles.columns}>
					{supportItems.map((item, index) => (
						<article
							key={item.title}
							className={`reveal-up reveal-delay-${index + 1}`}
						>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}

const imgSize = 36;
