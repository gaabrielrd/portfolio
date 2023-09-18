import Image from "next/image";
import styles from "./page.module.scss";

import resourcesImage from "../public/images/3d-fluency-training.png";
import platformsImage from "../public/images/3d-fluency-knowledge-sharing.png";
import projectsImage from "../public/images/3d-fluency-keyboard-1.png";

import cubeImage from "../public/images/3d-blocks-blocks-composition-62.png";

export default function Home() {
	const imgSize = 36;

	return (
		<main className={styles.main}>
			<div className={styles.card}>
				{/* Painel da esquerda com as infos */}
				<div className={styles.leftPanel}>
					<h2>Gabriel Roda</h2>
					<p>
						Desenvolvedor front-end, apaixonado por educação, há 6 anos criando
						materiais e plataformas, que buscam facilitar o aprendizado, e
						acesso à educação de milhares de alunos da educação superior no
						Brasil.
					</p>
					<div className={styles.highlights}>
						<ul>
							<li>
								<div className="highlight">
									<div className="icon">
										<Image
											src={resourcesImage}
											height={imgSize}
											alt="icone objetos de aprendizagem"
										/>
									</div>
									<span>+ de 500 objetos de aprendizagem criados;</span>
								</div>
							</li>
							<li>
								<div className="highlight">
									<div className="icon">
										{" "}
										<Image
											src={platformsImage}
											height={imgSize}
											alt="icone objetos de aprendizagem"
										/>
									</div>
									<span>
										+ de 5 plataformas de aprendizagem/produção de conteúdo
										desenvolvidas;
									</span>
								</div>
							</li>
							<li>
								<div className="highlight">
									<div className="icon">
										{" "}
										<Image
											src={projectsImage}
											height={imgSize}
											alt="icone objetos de aprendizagem"
										/>
									</div>
									<span>
										+ de 20 projetos criados por diversão, para explorar novas
										tecnologias e linguagens.
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>

				{/* Cubo de fundo */}
				<div className={styles.cube}>
					<Image src={cubeImage} height={240} alt="cubo" />
				</div>
			</div>
		</main>
	);
}
