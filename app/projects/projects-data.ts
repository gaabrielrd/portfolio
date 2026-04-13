export type ProjectStatus = "published" | "teaser";

export type ProjectLink = {
	label: string;
	href: string;
};

export type ProjectEntry = {
	title: string;
	description: string;
	highlights?: string[];
	links?: ProjectLink[];
	tags?: string[];
	status: ProjectStatus;
};

export type CompanySection = {
	slug: string;
	company: string;
	period: string;
	role: string;
	summary: string;
	projects: ProjectEntry[];
};

export const companySections: CompanySection[] = [
	{
		slug: "uniasselvi",
		company: "Uniasselvi",
		period: "2021 - 2023",
		role: "Front-end e experiências digitais para educação",
		summary:
			"Criação de objetos, trilhas, plataformas editoriais e experiências de estudo para milhares de alunos da educação superior.",
		projects: [
			{
				title: "Objetos de Aprendizagem",
				description:
					"Desenvolvimento de materiais animados e interativos em Adobe Captivate, com evolução contínua dos templates usados pela equipe.",
				highlights: [
					"Criação de menu de navegação com API JavaScript do Captivate",
					"Controles para legendas, áudio e modo tela-cheia",
					"Manutenção dos templates, locução e produção de ilustrações/animações",
				],
				links: [
					{
						label: "Abrir exemplo",
						href: "https://static.asselvi.com.br/objetos/aprendhtml5/disc/9000/index.html",
					},
				],
				tags: ["Captivate", "JavaScript", "Adobe Suite"],
				status: "published",
			},
			{
				title: "Trilha de Aprendizagem",
				description:
					"Redesenho da experiência de estudo digital com templates HTML reutilizáveis para múltiplos formatos de trilha.",
				highlights: [
					"Arquitetura comum para menus e interações entre diferentes formatos",
					"Notas e marcações em trechos selecionados com acesso por menu global",
					"Recursos de acessibilidade, fetch dinâmico e páginas próprias para vídeos e objetos",
				],
				links: [
					{
						label: "Trilha de Disciplina",
						href: "https://livrodigital.uniasselvi.com.br/disciplina/17865_perspectivas_profissionais/disciplina/inicio.html",
					},
					{
						label: "Trilha do Curso",
						href: "https://trilhaaprendizagem.uniasselvi.com.br/curso_les/",
					},
					{
						label: "Trilha Enade",
						href: "https://trilhaaprendizagem.uniasselvi.com.br/enade_qui/",
					},
					{
						label: "Curso técnico",
						href: "https://trilhaaprendizagem.uniasselvi.com.br/139490_gestao_de_vendas/unidade1.html",
					},
					{
						label: "Pós-graduação",
						href: "https://trilhaaprendizagem.uniasselvi.com.br/pos/POS03/",
					},
					{
						label: "Plano de Aula",
						href: "https://trilhaaprendizagem.uniasselvi.com.br/plano_de_aula/perspectivas/",
					},
				],
				tags: ["HTML", "CSS", "JavaScript", "Acessibilidade"],
				status: "published",
			},
			{
				title: "Livro Digital",
				description:
					"Plataforma de criação de materiais responsivos com Firebase no back-end, focada em leitura confortável e personalizável em dispositivos móveis.",
				highlights: [
					"Ambiente de edição em tempo real para replicar PDFs em HTML",
					"Notas, marcações e personalização visual inspirada na experiência do Kindle",
					"Versões para graduação e pós-graduação com leitura responsiva",
				],
				links: [
					{
						label: "Exemplo pós",
						href: "https://livrodigital.uniasselvi.com.br/pos/metodologia_do_trabalho_cientifico/?codigo=35177",
					},
					{
						label: "Exemplo graduação",
						href: "https://livrodigital.uniasselvi.com.br/GTU100_perspectivas_profissionais/?codigo=25048",
					},
				],
				tags: ["Firebase", "HTML", "Leitura responsiva"],
				status: "published",
			},
			{
				title: "Conteúdos EdTech",
				description:
					"Central para orientar professores e equipes sobre formatos, templates e boas práticas de produção de materiais digitais.",
				highlights: [
					"Catálogo de formatos com exemplos e downloads de templates",
					"Seção de dicas com Firebase para cadastro, listagem e leitura",
					"Notificações sempre que uma nova dica é publicada",
				],
				links: [
					{
						label: "Abrir Conteúdos EdTech",
						href: "https://conteudos.uniasselvi.com.br/edtech/",
					},
				],
				tags: ["Firebase", "Conteúdo editorial", "Plataforma interna"],
				status: "published",
			},
			{
				title: "Tagueamento de Conteúdos",
				description:
					"Projeto para conectar o conteúdo estudado ao desempenho acadêmico e mostrar ao aluno, de forma visual, onde aprofundar seus estudos.",
				highlights: [
					"Vinculação entre trilhas, sumário do livro e temas da disciplina",
					"Classificação de parágrafos, imagens, vídeos e objetos por professores",
					"Integração com notas para exibir indicadores de desempenho por tema",
				],
				tags: ["Dados educacionais", "Integração", "UX de aprendizagem"],
				status: "published",
			},
			{
				title: "Central de Conteúdos",
				description:
					"Expansão do tagueamento para uma nova camada de descoberta, reunindo dinamicamente tudo o que o aluno precisa revisar sobre um assunto.",
				highlights: [
					"Busca dinâmica de conteúdo relacionado em trilhas e livros",
					"Redirecionamento direto para o trecho exato no Livro Digital",
					"Experiência guiada a partir do indicador de desempenho",
				],
				tags: ["Busca dinâmica", "Navegação contextual"],
				status: "published",
			},
			{
				title: "Construtor de Trilhas",
				description:
					"Ambiente de criação de trilhas no navegador, pensado para acelerar a produção e reduzir a dependência de conhecimento técnico.",
				highlights: [
					"Suporte a múltiplos formatos de trilha",
					"Exportação do pacote completo ao fim do processo",
					"Ganho de consistência para equipes internas e colaboradores externos",
				],
				tags: ["Ferramenta interna", "Produtividade", "Authoring"],
				status: "published",
			},
			{
				title: "Recursos Interativos",
				description:
					"Evolução dos objetos de aprendizagem para um formato HTML5 mais leve, responsivo e flexível do que o fluxo anterior em Captivate.",
				highlights: [
					"Criação de templates para jogos e interações educacionais",
					"Novo processo de produção, do briefing à entrega final",
					"Mais desempenho, responsividade e opções de customização",
				],
				tags: ["HTML5", "Jogos educacionais", "Templates"],
				status: "published",
			},
			{
				title: "Landing Pages Temáticas",
				description:
					"Série de páginas editoriais para acolhimento, programas institucionais e comunicação temática dentro do ecossistema da Uniasselvi.",
				highlights: [
					"Páginas de boas-vindas, responsabilidade social e extensão",
					"Experiências voltadas para descoberta de informação institucional",
					"Execução visual consistente em diferentes temas e públicos",
				],
				links: [
					{
						label: "Bem-vindo à Uniasselvi",
						href: "https://conteudos.uniasselvi.com.br/ead_uniasselvi/",
					},
					{
						label: "Responsabilidade Social",
						href: "https://conteudos.uniasselvi.com.br/responsabilidade_social/",
					},
					{
						label: "Programas de extensão",
						href: "https://conteudos.uniasselvi.com.br/extensao/",
					},
					{
						label: "Documentação legal",
						href: "https://conteudos.uniasselvi.com.br/documentacao_legal/",
					},
				],
				tags: ["Landing pages", "Conteúdo institucional"],
				status: "published",
			},
		],
	},
	{
		slug: "delinea",
		company: "Delinea",
		period: "2024",
		role: "Produto digital e front-end para plataformas educacionais",
		summary:
			"Atuação em manutenção, interface e estratégia de produto para catálogo, marketplace e autoria SCORM.",
		projects: [
			{
				title: "DStore",
				description:
					"Manutenção e evolução de uma plataforma de catalogação e organização de materiais educacionais.",
				highlights: [
					"Implementação de novos recursos e correções",
					"Melhorias de fluxos e metodologias usadas pela equipe",
				],
				tags: ["Plataforma", "Manutenção", "UX"],
				status: "published",
			},
			{
				title: "DStore Loja",
				description:
					"Construção da interface da vitrine comercial da DStore, integrando a experiência visual com a API do marketplace.",
				highlights: [
					"Implementação completa do front-end da plataforma",
					"Integração com API e refinamentos de UX/UI ao longo do processo",
				],
				links: [
					{
						label: "Abrir DStore Loja",
						href: "https://delinea.com.br/dstore/",
					},
				],
				tags: ["Marketplace", "Front-end", "Integração API"],
				status: "published",
			},
			{
				title: "Autorya",
				description:
					"Plataforma de autoria para materiais SCORM acompanhada desde a concepção até o lançamento.",
				highlights: [
					"Participação em reuniões estratégicas e discussões de roadmap",
					"Contribuição com melhorias e novas funcionalidades",
					"Entrega de uma plataforma com personalização de layout, temas e blocos interativos",
				],
				links: [
					{
						label: "Abrir Autorya",
						href: "https://delinea.com.br/autorya/",
					},
				],
				tags: ["SCORM", "Authoring", "Produto"],
				status: "published",
			},
		],
	},
	{
		slug: "adapt",
		company: "Adapt",
		period: "2024 - 2026",
		role: "Ecossistema de produtos e operação digital",
		summary:
			"Fase atual com atuação em uma família de produtos; nesta primeira versão da página, os itens entram como visão geral do portfólio recente.",
		projects: [
			{
				title: "Liviu Content",
				description:
					"Projeto em andamento listado como parte do ecossistema atual da Adapt. Os detalhes entram em uma próxima atualização da página.",
				status: "teaser",
			},
			{
				title: "Liviu Drive",
				description:
					"Projeto em andamento listado como parte do ecossistema atual da Adapt. Os detalhes entram em uma próxima atualização da página.",
				status: "teaser",
			},
			{
				title: "Liviu Flow",
				description:
					"Projeto em andamento listado como parte do ecossistema atual da Adapt. Os detalhes entram em uma próxima atualização da página.",
				status: "teaser",
			},
			{
				title: "Liviu Analytics",
				description:
					"Projeto em andamento listado como parte do ecossistema atual da Adapt. Os detalhes entram em uma próxima atualização da página.",
				status: "teaser",
			},
			{
				title: "Monday Pannels",
				description:
					"Projeto em andamento listado como parte do ecossistema atual da Adapt. Os detalhes entram em uma próxima atualização da página.",
				status: "teaser",
			},
			{
				title: "AI Playground",
				description:
					"Projeto em andamento listado como parte do ecossistema atual da Adapt. Os detalhes entram em uma próxima atualização da página.",
				status: "teaser",
			},
			{
				title: "Liviu CRM",
				description:
					"Projeto em andamento listado como parte do ecossistema atual da Adapt. Os detalhes entram em uma próxima atualização da página.",
				status: "teaser",
			},
		],
	},
];
