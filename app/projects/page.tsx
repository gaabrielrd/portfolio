import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import cubeImage from "../../public/images/3d-blocks-blocks-composition-62.png";
import projectsImage from "../../public/images/3d-fluency-keyboard-1.png";
import platformsImage from "../../public/images/3d-fluency-knowledge-sharing.png";
import resourcesImage from "../../public/images/3d-fluency-training.png";

import { companySections } from "./projects-data";
import styles from "./page.module.scss";

export const metadata: Metadata = {
	title: "Projetos | roda.dev",
	description:
		"Projetos profissionais de Gabriel Roda em educação, plataformas digitais, autoria e experiências de aprendizagem.",
};

const stats = [
	{
		label: "empresas",
		value: companySections.length,
		icon: platformsImage,
	},
	{
		label: "projetos mapeados",
		value: companySections.reduce(
			(total, company) => total + company.projects.length,
			0
		),
		icon: projectsImage,
	},
	{
		label: "fases da jornada",
		value: companySections.filter((company) =>
			company.projects.some((project) => project.status === "published")
		).length,
		icon: resourcesImage,
	},
];

export default function ProjectsPage() {
	return (
		<main className={styles.main}>
			<section className={styles.hero}>
				<div className={styles.heroCopy}>
					<p className={styles.eyebrow}>Projetos</p>
					<h1>
						Produtos, experiências e ferramentas criadas para melhorar como as
						pessoas aprendem.
					</h1>
					<p className={styles.intro}>
						Da produção de objetos de aprendizagem até plataformas completas de
						autoria e leitura digital, esta página organiza os projetos que
						marcaram minha trajetória recente em educação e produto.
					</p>

					<div className={styles.heroActions}>
						<Link href="#timeline">Explorar trajetória</Link>
						<Link href="mailto:gabriel@roda.dev">Conversar sobre projetos</Link>
					</div>
				</div>

				<div className={styles.heroVisual} aria-hidden="true">
					<div className={styles.heroStats}>
						{stats.map((stat) => (
							<div key={stat.label} className={styles.stat}>
								<Image src={stat.icon} height={32} alt="" />
								<div>
									<strong>{stat.value}</strong>
									<span>{stat.label}</span>
								</div>
							</div>
						))}
					</div>

					<div className={styles.cube}>
						<Image src={cubeImage} height={240} alt="" />
					</div>
				</div>
			</section>

			<section className={styles.overview} id="timeline">
				<div className={styles.overviewHeader}>
					<p className={styles.sectionLabel}>Linha do tempo</p>
					<h2>Uma leitura rápida da evolução entre conteúdo, produto e authoring.</h2>
				</div>

				<nav className={styles.companyNav} aria-label="Empresas e períodos">
					{companySections.map((company) => (
						<a key={company.slug} href={`#${company.slug}`} className={styles.navItem}>
							<span>{company.period}</span>
							<strong>{company.company}</strong>
							<small>{company.role}</small>
						</a>
					))}
				</nav>
			</section>

			<div className={styles.timeline}>
				{companySections.map((company) => (
					<section
						key={company.slug}
						id={company.slug}
						className={styles.companySection}
					>
						<div className={styles.companyIntro}>
							<p>{company.period}</p>
							<h2>{company.company}</h2>
							<h3>{company.role}</h3>
							<p>{company.summary}</p>
						</div>

						<div className={styles.projectList}>
							{company.projects.map((project) => (
								<article
									key={`${company.slug}-${project.title}`}
									className={`${styles.project} ${
										project.status === "teaser" ? styles.teaser : ""
									}`}
								>
									<div className={styles.projectHeader}>
										<div>
											<div className={styles.projectMeta}>
												<span>{company.company}</span>
												{project.status === "teaser" ? (
													<em>em atualização</em>
												) : (
													<em>projeto publicado</em>
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
										<ul className={styles.tags} aria-label="Tecnologias e temas">
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
				<p className={styles.sectionLabel}>Próximo passo</p>
				<h2>
					Se algum desses projetos conversa com o que você está construindo,
					vamos trocar ideia.
				</h2>
				<p>
					Posso ajudar com front-end, produto educacional, authoring, interfaces
					para operações internas e experiências digitais com foco em clareza.
				</p>
				<div className={styles.heroActions}>
					<Link href="mailto:gabriel@roda.dev">Enviar e-mail</Link>
					<Link href="https://www.linkedin.com/in/gabriel-roda/" target="_blank">
						LinkedIn
					</Link>
				</div>
			</section>
		</main>
	);
}
