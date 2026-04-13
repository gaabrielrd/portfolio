import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import cubeImage from "../../../public/images/3d-blocks-blocks-composition-62.png";
import projectsImage from "../../../public/images/3d-fluency-keyboard-1.png";
import platformsImage from "../../../public/images/3d-fluency-knowledge-sharing.png";
import resourcesImage from "../../../public/images/3d-fluency-training.png";

import type { CompanySection } from "@/app/projects/projects-data";
import { getI18n } from "@/lib/i18n/server";
import { requireLocale } from "@/lib/i18n/validation";
import type { Locale } from "@/lib/i18n/config";
import styles from "../../projects/page.module.scss";

type ProjectsPageProps = {
	params: Promise<{
		locale: string;
	}>;
};

type ProjectStat = {
	alt: string;
	label: string;
	value: number;
};

async function getProjectsTranslations(locale: Locale) {
	return getI18n(locale, ["projects"]);
}

export async function generateMetadata({
	params,
}: ProjectsPageProps): Promise<Metadata> {
	const { locale: localeParam } = await params;
	const locale = requireLocale(localeParam);
	const i18n = await getProjectsTranslations(locale);
	const t = i18n.getFixedT(locale, "projects");

	return {
		title: t("metadata.title"),
		description: t("metadata.description"),
	};
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
	const { locale: localeParam } = await params;
	const locale = requireLocale(localeParam);
	const i18n = await getProjectsTranslations(locale);
	const t = i18n.getFixedT(locale, "projects");
	const stats = t("hero.stats", {
		returnObjects: true,
	}) as ProjectStat[];
	const companySections = t("companySections", {
		returnObjects: true,
	}) as CompanySection[];
	const displayedSections = [...companySections].reverse();
	const statImages = [platformsImage, projectsImage, resourcesImage] as const;

	return (
		<main className={styles.main}>
			<section className={styles.hero}>
				<div className={styles.heroCopy}>
					<p className={`${styles.eyebrow} reveal-up`}>{t("hero.eyebrow")}</p>
					<h1 className="reveal-up reveal-delay-1">{t("hero.title")}</h1>
					<p className={`${styles.intro} reveal-up reveal-delay-2`}>
						{t("hero.description")}
					</p>

					<div className={`${styles.heroActions} reveal-up reveal-delay-3`}>
						<Link href="#timeline">{t("hero.actions.timeline")}</Link>
						<Link href={t("hero.actions.contactHref")}>
							{t("hero.actions.contactLabel")}
						</Link>
					</div>
				</div>

				<div className={styles.heroVisual} aria-hidden="true">
					<div className={styles.heroStats}>
						{stats.map((stat, index) => (
							<div
								key={stat.label}
								className={`${styles.stat} reveal-up reveal-delay-2`}
							>
								<Image src={statImages[index]} height={32} alt={stat.alt} />
								<div>
									<strong>{stat.value}</strong>
									<span>{stat.label}</span>
								</div>
							</div>
						))}
					</div>

					<div className={`${styles.cube} float-drift`}>
						<Image src={cubeImage} height={240} alt={t("hero.cubeAlt")} />
					</div>
				</div>
			</section>

			<section className={styles.overview} id="timeline">
				<div className={`${styles.overviewHeader} reveal-up`}>
					<p className={styles.sectionLabel}>{t("overview.eyebrow")}</p>
					<h2>{t("overview.title")}</h2>
				</div>

				<nav className={styles.companyNav} aria-label={t("overview.ariaLabel")}>
					{displayedSections.map((company) => (
						<a
							key={company.slug}
							href={`#${company.slug}`}
							className={`${styles.navItem} reveal-up reveal-delay-1`}
						>
							<span>{company.period}</span>
							<strong>{company.company}</strong>
							<small>{company.role}</small>
						</a>
					))}
				</nav>
			</section>

			<div className={styles.timeline}>
				{displayedSections.map((company) => (
					<section
						key={company.slug}
						id={company.slug}
						className={styles.companySection}
					>
						<div className={`${styles.companyIntro} reveal-up`}>
							<p>{company.period}</p>
							<h2>{company.company}</h2>
							<h3>{company.role}</h3>
							<p>{company.summary}</p>
						</div>

						<div className={styles.projectList}>
							{company.projects.map((project) => (
								<article
									key={`${company.slug}-${project.title}`}
									className={`${styles.project} reveal-up ${
										project.status === "teaser" ? styles.teaser : ""
									}`}
								>
									<div className={styles.projectHeader}>
										<div>
											<div className={styles.projectMeta}>
												<span>{company.company}</span>
												{project.status === "teaser" ? (
													<em>{t("projectStatus.teaser")}</em>
												) : (
													<em>{t("projectStatus.published")}</em>
												)}
											</div>
											<h4>{project.title}</h4>
										</div>
									</div>

									<p className={styles.projectDescription}>
										{project.description}
									</p>

									{project.highlights?.length ? (
										<ul className={styles.highlights}>
											{project.highlights.map((highlight) => (
												<li key={highlight}>{highlight}</li>
											))}
										</ul>
									) : null}

									{project.tags?.length ? (
										<ul className={styles.tags} aria-label={t("tagsAriaLabel")}>
											{project.tags.map((tag) => (
												<li key={tag}>{tag}</li>
											))}
										</ul>
									) : null}

									{project.links?.length ? (
										<div className={styles.links}>
											{project.links.map((link) => (
												<Link
													key={link.href}
													href={link.href}
													target="_blank"
													rel="noreferrer"
												>
													{link.label}
												</Link>
											))}
										</div>
									) : null}
								</article>
							))}
						</div>
					</section>
				))}
			</div>

			<section className={styles.closing}>
				<p className={`${styles.sectionLabel} reveal-up`}>
					{t("closing.eyebrow")}
				</p>
				<h2 className="reveal-up reveal-delay-1">{t("closing.title")}</h2>
				<p className="reveal-up reveal-delay-2">{t("closing.description")}</p>
				<div className={`${styles.heroActions} reveal-up reveal-delay-3`}>
					<Link href={t("closing.actions.emailHref")}>
						{t("closing.actions.emailLabel")}
					</Link>
					<Link href={t("closing.actions.linkedinHref")} target="_blank">
						{t("closing.actions.linkedinLabel")}
					</Link>
				</div>
			</section>
		</main>
	);
}
