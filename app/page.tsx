import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";

import resourcesImage from "../public/images/3d-fluency-training.png";
import platformsImage from "../public/images/3d-fluency-knowledge-sharing.png";
import projectsImage from "../public/images/3d-fluency-keyboard-1.png";

import cubeImage from "../public/images/3d-blocks-blocks-composition-62.png";

export default function Home() {
	const imgSize = 36;

	return (
		<main className={styles.main}>
			<section className={styles.hero}>
				<div className={styles.copy}>
					<p className={`${styles.eyebrow} reveal-up`}>roda.dev</p>
					<h1 className="reveal-up reveal-delay-1">
						Front-end para experiências de aprendizagem, produto e conteúdo
						digital.
					</h1>
					<p className={`${styles.intro} reveal-up reveal-delay-2`}>
						Sou um desenvolvedor com foco em front-end, apaixonado por educação
						e produto digital.
					</p>
					<p className={`${styles.intro} reveal-up reveal-delay-2`}>
						Estou sempre buscando me atualizar e conectar às novas tendências e
						tecnologias.
					</p>
					<p className={`${styles.intro} reveal-up reveal-delay-2`}>
						Crio materiais, plataformas e fluxos digitais que aproximam clareza,
						escala e cuidado em projetos voltados para educação.
					</p>
					<div className={`${styles.actions} reveal-up reveal-delay-3`}>
						<Link href="/projects">Ver projetos</Link>
						<Link href="/about">Sobre mim</Link>
					</div>
				</div>

				<div className={styles.visual} aria-hidden="true">
					<div className={styles.metrics}>
						<ul>
							<li className="reveal-up reveal-delay-2">
								<div className={styles.metricIcon}>
									<Image
										src={resourcesImage}
										height={imgSize}
										alt="icone objetos de aprendizagem"
									/>
								</div>
								<div>
									<strong>+ de 500</strong>
									<span>objetos de aprendizagem criados</span>
								</div>
							</li>
							<li className="reveal-up reveal-delay-3">
								<div className={styles.metricIcon}>
									<Image
										src={platformsImage}
										height={imgSize}
										alt="icone plataformas"
									/>
								</div>
								<div>
									<strong>+ de 5</strong>
									<span>plataformas de aprendizagem e produção</span>
								</div>
							</li>
							<li className="reveal-up reveal-delay-4">
								<div className={styles.metricIcon}>
									<Image
										src={projectsImage}
										height={imgSize}
										alt="icone projetos"
									/>
								</div>
								<div>
									<strong>+ de 20</strong>
									<span>projetos exploratórios em novas tecnologias</span>
								</div>
							</li>
						</ul>
					</div>

					<div className={`${styles.cube} float-drift`}>
						<Image src={cubeImage} height={240} alt="cubo" />
					</div>
				</div>
			</section>

			<section className={styles.support}>
				<div className="reveal-up">
					<p className={styles.sectionLabel}>Foco</p>
					<h2>
						Interfaces que ajudam pessoas a estudar, produzir e decidir melhor.
					</h2>
				</div>
				<div className={styles.columns}>
					<article className="reveal-up reveal-delay-1">
						<h3>Educação digital</h3>
						<p>
							Materiais, trilhas, leitura responsiva e interações que reduzem
							atrito no aprendizado.
						</p>
					</article>
					<article className="reveal-up reveal-delay-2">
						<h3>Produto com contexto</h3>
						<p>
							Front-end conectado a fluxo, operação e evolução real de
							plataforma, não só à camada visual.
						</p>
					</article>
					<article className="reveal-up reveal-delay-3">
						<h3>Ferramentas internas</h3>
						<p>
							Ambientes de autoria e produção pensados para dar velocidade e
							consistência a times de conteúdo.
						</p>
					</article>
				</div>
			</section>
		</main>
	);
}
