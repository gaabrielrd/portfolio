import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import cubeImage from "../../public/images/3d-blocks-blocks-composition-62.png";
import projectsImage from "../../public/images/3d-fluency-keyboard-1.png";
import platformsImage from "../../public/images/3d-fluency-knowledge-sharing.png";
import resourcesImage from "../../public/images/3d-fluency-training.png";

import { companySections } from "../projects/projects-data";
import styles from "./page.module.scss";

type AboutHighlight = {
	label: string;
	value: string;
	icon: typeof resourcesImage;
};

type AboutFocusArea = {
	title: string;
	description: string;
};

type CareerMoment = {
	company: string;
	period: string;
	role: string;
	summary: string;
};

type ContactLink = {
	label: string;
	href: string;
	external?: boolean;
};

const intro =
	"Desenvolvedor front-end, apaixonado por educação, há 6 anos criando materiais e plataformas que buscam facilitar o aprendizado e o acesso à educação de milhares de alunos da educação superior no Brasil.";

const highlights: AboutHighlight[] = [
	{
		label: "objetos de aprendizagem",
		value: "+ de 500",
		icon: resourcesImage,
	},
	{
		label: "plataformas criadas",
		value: "+ de 5",
		icon: platformsImage,
	},
	{
		label: "projetos exploratórios",
		value: "+ de 20",
		icon: projectsImage,
	},
];

const focusAreas: AboutFocusArea[] = [
	{
		title: "Front-end com contexto de produto",
		description:
			"Atuação próxima do problema, pensando não só na interface, mas também no fluxo, na clareza da experiência e no que ajuda o produto a amadurecer.",
	},
	{
		title: "Educação digital e experiências de aprendizagem",
		description:
			"Construção de materiais, plataformas e interações voltadas para leitura, estudo, autoria e descoberta de conteúdo em ambientes educacionais.",
	},
	{
		title: "Ferramentas para quem produz conteúdo",
		description:
			"Criação de soluções que aceleram a produção interna, organizam processos e reduzem a dependência de conhecimento técnico para publicar materiais.",
	},
];

const careerMoments: CareerMoment[] = companySections.map((company) => ({
	company: company.company,
	period: company.period,
	role: company.role,
	summary: company.summary,
}));

const contactLinks: ContactLink[] = [
	{
		label: "Enviar e-mail",
		href: "mailto:gabriel@roda.dev",
	},
	{
		label: "Github",
		href: "https://github.com/gaabrielrd",
		external: true,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/gabriel-roda/",
		external: true,
	},
];

export const metadata: Metadata = {
	title: "Sobre | roda.dev",
	description:
		"Gabriel Roda, desenvolvedor front-end com foco em educação digital, produto e experiências de aprendizagem.",
};

export default function AboutPage() {
	return (
		<main className={styles.main}>
			<section className={styles.hero}>
				<div className={styles.heroCopy}>
					<p className={styles.eyebrow}>Sobre</p>
					<h1>Gabriel Roda</h1>
					<h2>Desenvolvedor front-end com foco em educação e produto digital.</h2>
					<p className={styles.intro}>{intro}</p>

					<div className={styles.heroActions}>
						<Link href="/projects">Ver projetos</Link>
						<Link href="mailto:gabriel@roda.dev">Entrar em contato</Link>
					</div>
				</div>

				<div className={styles.heroVisual} aria-hidden="true">
					<div className={styles.highlightList}>
						{highlights.map((highlight) => (
							<div key={highlight.label} className={styles.highlight}>
								<Image src={highlight.icon} height={32} alt="" />
								<div>
									<strong>{highlight.value}</strong>
									<span>{highlight.label}</span>
								</div>
							</div>
						))}
					</div>

					<div className={styles.cube}>
						<Image src={cubeImage} height={220} alt="" />
					</div>
				</div>
			</section>

			<section className={styles.focusSection}>
				<div className={styles.sectionHeading}>
					<p className={styles.sectionLabel}>O que eu construo</p>
					<h2>Interfaces e plataformas que precisam ser claras, úteis e fáceis de evoluir.</h2>
				</div>

				<div className={styles.focusGrid}>
					{focusAreas.map((area) => (
						<article key={area.title} className={styles.focusItem}>
							<h3>{area.title}</h3>
							<p>{area.description}</p>
						</article>
					))}
				</div>
			</section>

			<section className={styles.careerSection}>
				<div className={styles.sectionHeading}>
					<p className={styles.sectionLabel}>Trajetória</p>
					<h2>Uma leitura rápida das frentes em que venho atuando.</h2>
				</div>

				<div className={styles.careerList}>
					{careerMoments.map((moment) => (
						<article key={moment.company} className={styles.careerItem}>
							<p>{moment.period}</p>
							<h3>{moment.company}</h3>
							<h4>{moment.role}</h4>
							<p>{moment.summary}</p>
						</article>
					))}
				</div>
			</section>

			<section className={styles.closing}>
				<div className={styles.sectionHeading}>
					<p className={styles.sectionLabel}>Contato</p>
					<h2>Se fizer sentido para o que você está construindo, vamos conversar.</h2>
				</div>

				<p className={styles.closingCopy}>
					Posso contribuir com front-end, produto educacional, authoring,
					plataformas internas e experiências digitais com foco em clareza.
				</p>

				<div className={styles.contactLinks}>
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
