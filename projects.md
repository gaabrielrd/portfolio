# Projetos

Este documento reúne os principais projetos em que trabalhei ao longo da minha trajetória. A proposta é apresentar, de forma clara e objetiva, o contexto de cada iniciativa, minha atuação e os resultados ou capacidades entregues em cada produto.

## Uniasselvi | 2021 - 2023

Período marcado pela evolução de produtos educacionais digitais, com foco em experiência de aprendizagem, acessibilidade, padronização de materiais e ganho de escala na produção de conteúdo.

### Objetos de Aprendizagem

Nos primeiros meses na empresa, atuei no desenvolvimento de Objetos de Aprendizagem com Adobe Captivate. Esses materiais funcionavam como experiências interativas com animações, personagens, áudio e atividades.

Além de criar novos objetos, também evoluí os templates utilizados pela equipe. Usei a API JavaScript do Captivate para construir um menu de navegação entre seções, com controles para ativar ou desativar legendas, áudio e modo de tela cheia.

Também fui responsável por manter os templates consistentes e atualizados, gravar locuções para materiais meus e de colegas e produzir ilustrações e animações com a suíte Adobe.

Exemplo: [Objeto de Aprendizagem](https://static.asselvi.com.br/objetos/aprendhtml5/disc/9000/index.html)

### Trilha de Aprendizagem

Ao percebermos oportunidades de melhoria na experiência de estudo digital dos alunos, iniciamos um redesenho completo da forma como as Trilhas de Aprendizagem eram produzidas e exibidas no Ambiente Virtual de Aprendizagem.

Minha atuação concentrou-se na criação de templates HTML, CSS e JavaScript padronizados para diferentes formatos de trilha:

- [Trilha de Disciplina](https://livrodigital.uniasselvi.com.br/disciplina/17865_perspectivas_profissionais/disciplina/inicio.html)
- [Trilha do Curso](https://trilhaaprendizagem.uniasselvi.com.br/curso_les/)
- [Trilha de Enade](https://trilhaaprendizagem.uniasselvi.com.br/enade_qui/)
- Trilha de Estágio
- [Trilha para Curso Técnico](https://trilhaaprendizagem.uniasselvi.com.br/139490_gestao_de_vendas/unidade1.html)
- Trilha para Terceiros
- [Trilha da Pós-graduação](https://trilhaaprendizagem.uniasselvi.com.br/pos/POS03/)
- [Plano de Aula](https://trilhaaprendizagem.uniasselvi.com.br/plano_de_aula/perspectivas/)

As estruturas de pós-graduação e plano de aula diferiam das demais por conta da metodologia, mas as outras trilhas compartilhavam menus, interações e componentes reutilizáveis. Isso permitia evoluir funcionalidades com mais velocidade e consistência.

Entre os recursos implementados, destaco a criação de notas e marcações em trechos do material. Ao selecionar um texto, o aluno podia destacá-lo ou adicionar comentários, com acesso centralizado por um menu no cabeçalho.

Todas as trilhas também contavam com recursos de acessibilidade, como ajuste de tamanho da fonte e modos de visualização. Vídeos e objetos de aprendizagem eram carregados dinamicamente por `fetch`, sem necessidade de manter o conteúdo fixo no HTML.

### Livro Digital

Depois da evolução das Trilhas de Aprendizagem, identificamos a necessidade de melhorar a leitura de materiais em PDF em dispositivos móveis. A partir disso, surgiu o projeto do Livro Digital.

Trata-se de uma plataforma de criação de materiais com Firebase no back-end, voltada ao desenvolvimento de livros responsivos e personalizáveis em HTML.

Os diagramadores passaram a contar com um ambiente de edição em tempo real para replicar o conteúdo do PDF em uma experiência mais adequada para web e mobile.

Para os alunos, a plataforma oferecia recursos semelhantes aos das trilhas, como notas e marcações, além de novas opções de personalização visual, incluindo espaçamento entre linhas, tipografia, tamanho de fonte e estilo de página. A meta era aproximar a experiência de leitura do que se espera de um Kindle, mas na web.

Exemplos:

- [Livro Digital - Pós-graduação](https://livrodigital.uniasselvi.com.br/pos/metodologia_do_trabalho_cientifico/?codigo=35177)
- [Livro Digital - Graduação](https://livrodigital.uniasselvi.com.br/GTU100_perspectivas_profissionais/?codigo=25048)

### Conteúdos EdTech

Com a ampliação dos formatos de materiais e a mudança nos processos de produção, surgiu a necessidade de centralizar informações e orientar todas as equipes envolvidas na elaboração dos conteúdos.

Criamos então a página Conteúdos EdTech, um ambiente onde professores e coordenadores podiam conhecer formatos, acessar exemplos, baixar templates e consultar boas práticas de produção.

A seção de dicas também utilizava Firebase como back-end para criação, listagem e visualização de conteúdo, além de um sistema de notificações para avisar quando uma nova dica fosse publicada.

Projeto: [Conteúdos EdTech](https://conteudos.uniasselvi.com.br/edtech/)

### Tagueamento de Conteúdos

Buscando dar mais transparência e autonomia aos alunos, desenvolvemos uma iniciativa para relacionar o desempenho acadêmico com os assuntos estudados em cada disciplina.

O processo começava no cadastro do livro e de seu sumário. A partir disso, conseguíamos vincular a trilha ao sumário e permitir que professores classificassem parágrafos, imagens, objetos e vídeos conforme os temas abordados.

Com esses dados estruturados, implementamos uma integração com o sistema de notas das avaliações. Assim, cada item da trilha passou a exibir indicadores de desempenho por tema quando o aluno acessava o ambiente autenticado.

### Central de Conteúdos

Como evolução do Tagueamento de Conteúdos, implementamos a Central de Conteúdos.

Quando o aluno clicava em um indicador de desempenho, era direcionado para uma nova página que buscava dinamicamente todos os conteúdos relacionados àquele assunto, independentemente de estarem na trilha ou no Livro Digital.

Se o conteúdo desejado estivesse no Livro Digital, o aluno era levado diretamente ao trecho exato que precisava revisar.

### Construtor de Trilhas

Para aumentar a velocidade e a consistência da produção de materiais, iniciamos o desenvolvimento do Construtor de Trilhas, aproveitando aprendizados técnicos e de produto obtidos no Livro Digital.

O sistema permitia criar trilhas de aprendizagem em múltiplos formatos usando apenas o navegador. Ao final do processo, o usuário podia baixar o pacote completo da trilha sem precisar conhecer detalhes de desenvolvimento.

Essa iniciativa ajudou tanto a equipe interna quanto colaboradores externos a produzir materiais com mais autonomia e padronização.

### Recursos Interativos

Esse projeto representou a evolução dos Objetos de Aprendizagem dentro das trilhas.

Com o objetivo de reduzir a dependência do Adobe Captivate e melhorar desempenho, velocidade e consistência, passamos a desenvolver Recursos Interativos em HTML5.

Isso exigiu mudanças em toda a dinâmica de produção, desde a solicitação do professor até a entrega final do material. Criamos templates de jogos e interações, como flipcards, sequências de infográficos, caça-palavras, jogo da memória e outros formatos reutilizáveis.

O ganho foi relevante em responsividade, flexibilidade e satisfação com o resultado final.

### Landing Pages Temáticas

Também atuei na criação e evolução de páginas temáticas voltadas à comunicação institucional e ao apoio da jornada do aluno.

- [Bem-vindo à Uniasselvi](https://conteudos.uniasselvi.com.br/ead_uniasselvi/)  
  Uma das primeiras páginas acessadas pelo aluno, com apresentação institucional e mensagem de boas-vindas do coordenador.
- [Responsabilidade Social](https://conteudos.uniasselvi.com.br/responsabilidade_social/)
- [Programas de Extensão](https://conteudos.uniasselvi.com.br/extensao/)
- [Documentação Legal](https://conteudos.uniasselvi.com.br/documentacao_legal/)

---

## Delinea | 2024

Período voltado à manutenção e evolução de produtos para catalogação, comercialização e autoria de materiais educacionais.

### DStore

Atuei na manutenção da DStore, uma plataforma de catalogação e organização de materiais educacionais.

Contribuí com novos recursos, correções e melhorias, além de propor ajustes em fluxos e metodologias de trabalho para tornar a plataforma mais eficiente e consistente.

### DStore Loja

A DStore Loja funcionava como a vitrine da plataforma, um marketplace voltado à comercialização dos materiais catalogados.

Fui responsável pela implementação da interface da plataforma, integrando-a com a API e buscando melhorias contínuas de UX/UI.

Projeto: [DStore Loja](https://delinea.com.br/dstore/)

### Autorya

A Autorya é uma plataforma de autoria para materiais SCORM.

Participei do projeto desde a concepção até o lançamento, contribuindo em reuniões estratégicas, refinamento de roadmap, melhorias de produto e sugestão de novas funcionalidades.

Entregamos uma plataforma completa, com personalização de layout, temas e diversos blocos de conteúdo interativo.

Projeto: [Autorya](https://delinea.com.br/autorya/)

## Adapt | 2024 - 2026

Período focado na criação e evolução de um ecossistema de produtos conectados entre si, cobrindo autoria, armazenamento, gestão de projetos, analytics, IA e apoio comercial.

### Liviu Content

Plataforma completa de autoria, na qual trabalhei desde a concepção.

Principais capacidades do produto:

- Criação de materiais com exportação em SCORM e PDF, além de publicação online por link
- Produção de conteúdos em formato de slides ou one-page
- Central de mídias para organização de documentos
- Modos de edição, visualização e revisão
- Disciplinas com temas, capas e configurações personalizadas
- Mais de 35 tipos de elementos disponíveis para composição dos materiais
- Sistema de temas com variantes para personalização rápida do conteúdo
- Recurso de aprendizagem adaptativa, em que o aluno percorre caminhos personalizados com nós de desempenho, espera e escolha

### Liviu Drive

Plataforma semelhante ao Google Drive para armazenamento, organização e compartilhamento de arquivos.

Desenvolvi a solução com AWS Amplify, participando de todo o stack de desenvolvimento, desde a criação do repositório até o deploy.

### Liviu Flow

Gerenciador de projetos com colaboração entre equipes e fluxos personalizados.

Os fluxos funcionam como conjuntos de tarefas reutilizáveis. Ao criar uma entrega dentro de um projeto, é possível associar um fluxo e adicionar automaticamente todas as tarefas necessárias, como um template operacional.

As tarefas contam com título, descrição, responsável, supervisor, status, prioridade, datas, comentários, arquivos, subtarefas e vínculos com outras tarefas.

### Liviu Analytics

Ferramenta de analytics criada para integração direta com materiais publicados pela Liviu Content.

Entre os recursos disponíveis, estavam a criação de formulários, em uma proposta semelhante ao Google Forms, e o uso de tags de acompanhamento que geravam scripts para captura de eventos de navegação e comportamento do usuário.

### Monday Panels

Plataforma simples para compartilhar painéis do Monday com clientes, permitindo que acompanhassem o andamento de seus projetos de forma mais acessível.

### AI Playground

Ambiente para interação com diferentes modelos de IA e fluxos de trabalho automatizados, como geração automática de legendas para vídeo.

O projeto também foi importante para ampliar o domínio da equipe sobre ferramentas AWS. A implementação foi feita com AWS Amplify e modelos do Amazon Bedrock.

### Liviu CRM

Plataforma voltada à criação de propostas comerciais.

Entre as funcionalidades, estavam:

- Cadastro de produtos, categorias e subcategorias
- Criação e salvamento de propostas com exportação em PPT
- Composição detalhada da proposta com produtos, descontos por item, preço, subtotal, impostos, desconto geral e valor final
