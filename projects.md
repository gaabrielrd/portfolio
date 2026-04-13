# Meus projetos

## Uniasselvi - 2021 - 2023

### Objetos de Aprendizagem

Durante meus primeiros meses na empresa, trabalhei no desenvolvimento de Objetos de Aprendizagem usando Adobe Captivate. Eles funcionam como slides animados, com personagens, sons, e interações com elementos e atividades.

Nese período, trabalhei tanto na criação de novos objetos, como também na melhoria dos templates que nossa equipe utilizava, usando a api em js do Captivate para construir um menu de navegação entre seções, que permite também alterar o comportamento do material, ligando ou desligando legendas e áudio, e também entrar no modo tela-cheia.

Era responsável por manter os templates atualizados e consistentes, gravar locuções para os meus objetos e de colegas, além de criar as ilustrações e animações para os objetos usando a suíte Adobe.

Exemplo: https://static.asselvi.com.br/objetos/aprendhtml5/disc/9000/index.html

### Trilha de Aprendizagem

Percebendo que poderíamos melhorar a experiência do estudo digital de nossos alunos, iniciamos um projeto para redesenhar a maneira como as Trilhas de Aprendizagem são desenvolvidas e exibidas para o aluno no Ambiente Virtual de Aprendizagem.

Trabalhei na criação de templates HTML com css e js padronizado, para diferentes formatos de trilha que poderiam existir:

- Trilha de Disciplina (https://livrodigital.uniasselvi.com.br/disciplina/17865_perspectivas_profissionais/disciplina/inicio.html)
- Trilha do Curso (https://trilhaaprendizagem.uniasselvi.com.br/curso_les/)
- Trilha de Enade (https://trilhaaprendizagem.uniasselvi.com.br/enade_qui/)
- Trilha de Estágio
- Trilha para Curso técnico (https://trilhaaprendizagem.uniasselvi.com.br/139490_gestao_de_vendas/unidade1.html)
- Trilha para Terceiros
- Trilha da Pós-graduação (https://trilhaaprendizagem.uniasselvi.com.br/pos/POS03/)
- Plano de Aula (focado nos professores) (https://trilhaaprendizagem.uniasselvi.com.br/plano_de_aula/perspectivas/)

A estrutura difere para pós-graduação e plano de aula, pois são metodologias diferentes. Todas as demais comparilham de menus e interações, que podem ser facilmente ajustados em todas as trilhas, permitindo a adição de novas funcionalides, e melhoria das existentes.

Uma dessas funcionalidades implementadas foi a possibilidade criar notas e marcações nos materiais. Ao selecionar um texto, o aluno pode escolher deixar ele marcado, o que cria um indicador à esquerda do item, ou criar uma nota, adicionando comentários. Todas as notas e marcações são acessíveis por um menu no header.

Todas as trilhas também contam com recursos de acessibilidade, permitindo customizar o tamanho da fonte e modo de visualização.

As trilhas podem ter vídeos ou objetos de aprendizagem, que possuem pãginas próprias para que sejam encontrados facilmente. Todos recursos são carregados por fetches dinâmicos sem a necessidade de manter os elementos hard-coded.

### Livro Digital

Após a criação da Trilha de Aprendizagem, percebemos a necessidade de aprimorar a experiência de leitura do material em pdf para dispositivos móveis. Com isso, iniciamos o projeto do Livro Digital.

É uma plataforma de criação de materiais, usando Firebase como back-end, para desenvolver livros personalizáveis e responsivos.

Os diagramadores contam com todos recursos para replicar o PDF em HTML, num ambiente de edição em tempo-real.

Para os alunos, os mesmos recursos da Trilha de Aprendizagem estão disponíveis, a possibilidade de criar notas e marcações, além de mais opções de customização visual, como espaçamento de linhas, carateres, tamanho e estilo da fonte, e estilo da página. Buscamos trazer uma experência similar ao Kindle para a Web.

Exemplo pós: https://livrodigital.uniasselvi.com.br/pos/metodologia_do_trabalho_cientifico/?codigo=35177
Exemplo graduação: https://livrodigital.uniasselvi.com.br/GTU100_perspectivas_profissionais/?codigo=25048

### Conteúdos EdTech

Com todas mudanças nos processos de elaboração de materiais, agora com novos formatos e opções, tínhamos que criar um ambiente para centralizar todas essas informações e educar todas equipes envolvidas sobre o processo de elaboração de conteúdos.

Com isso, criamos a página Conteúdos EdTech, que traz todos os formatos de material produzidos pela equipe interna. Lá o professor ou coordenador de curso consegue ver exemplos, baixar templates, e ler dicas de como criar os melhores materiais.

A seção de dicas também usa o Firebase como backend para criação, listagem e visualização de dicas, além de contar com um recurso de notificações, que dispara sempre que uma nova dica for postada.

https://conteudos.uniasselvi.com.br/edtech/

### Tagueamento de Conteúdos

Buscando trazer mais transparência e autonomia aos alunos, pensamos muito sobre como trazer um feedback visual para ele durante seus estudos, para saber como está seu deempenho em cada assunto da disciplina. Assim, se ele possui desempenho baixo em um tema, pode se esforçar para estudar mais a respeito.

Iniciamos então o processo de Taguear os conte~udos das trilhas. Toda disciplina começa pelo livro, e quando o livro é cadastrado, seu sumário também é. Com isso, conseguimos vincular uma trilha a um sumário, e, permitimos que os professores de cada disciplina pudessem classificar cada parágrafo, imagem, objeto, ou vídeo da trilha.

Com essas informações cadastradas, implementamos uma integração com o sistema de notas de avaliações, e agora cada item da trilha mostra um indicador de desempenho para cada tema da trilha, quando o aluno acessa pelo ambiente, e está autenticado.

### Central de Conteúdos

O próximo passo para levar o Tagueamento de Conteúdos além de um display simples, foi implementar a Central de Conteúdos.

Agora, quando o aluno clica no indicador de desempenho, ele é direcionado para uma nova página, que busca de maneira dinâmica todo conteúdo vinculado àquele assunto, esteja na trilha ou no livro.

Caso o aluno escolher ir para o Livro Digital, ele já vai para o trecho exato do texto que contém o que precisa estudar.

### Construtor de Trilhas

Buscando trazer mais velocidade e consistência para a produção de materiais, começamos a desenvolver o Contrutor de Trilhas, usando o que aprendemos com o Livro Digital.

É um ambiente que permite criar trilhas de aprendizagem, em múltiplos formatos, usando apenas um navegador.

Ao final do processo, você consegue baixar o pacote completo da trilha, sem a necessidade de entender sobre desenvolvimento.

Ajudou muito a nossa equipe interna, e também os colaboradores externos na construção dos materiais.

### Recursos Interativos

Foi a evolução dos Objetos de Aprendizagem nas trilhas.

Buscando deixar de depender tanto do Adobe Captivate, por conta de desempenho, velocidade, e consistência, passamos a criar Recursos Interativos em HTML5 interativo.

Com isso, tivemos que mudar toda a dinâmica do processo de criação, desde o professor que solicita o desenvolvimento, até a entrega final.

Criamos templates de jogos e interações, como flipcards, sequências de infogrãficos e jogos como caça-palavras, jogo da memória e afins.

Tivemos um alto ganho na satisfação, pois esse novo formato é responsivo e traz mais opções de customização para os recursos.

### Landing pages temáticas

#### Bem-vindo à Uniasselvi

Uma das primeiras paginas que o aluno vê ao entrar. Providencia uma introdução a instituição, e permite que o aluno veja a mensagem do coordenador de boas-vindas.

https://conteudos.uniasselvi.com.br/ead_uniasselvi/

#### Resposabilidade Social

https://conteudos.uniasselvi.com.br/responsabilidade_social/

#### Programas de extensão

https://conteudos.uniasselvi.com.br/extensao/

#### Documentação legal

https://conteudos.uniasselvi.com.br/documentacao_legal/

---

## Delinea - 2024

### DStore

Trabalhei na manutenção da DStore, uma plataforma de catalogação e organização de materiais educacionais.

Auxiliei na implementação de novos recursos, correções, e melhorias, além de propor alterações em fluxos e metodologias utilizadas.

### DStore Loja

A "vitrine" da DStore, um marketplace para comercialização dos materiais catalogados.

Trabalhei na implementação de toda a interface da plataforma, integrando com a API, e buscando melhorias de UX/UI sempre que possivel.

https://delinea.com.br/dstore/

### Autorya

Uma plataforma de autoria para materiais SCORM.

Trabalhei desde a sua concepção até o lançamento, participando das reuniões estratégicas, auxiliando com roadmap e melhorias, e sugerindo novas funcionalidades.

Entregamos uma plataforma completa, com personalização de layout, temas, e criação de diversos blocos de conteúdo interativos.

https://delinea.com.br/autorya/

## Adapt - 2024 - 2026

### Liviu Content

Uma plataforma completa de autoria. Trabalhei nela desde sua concepção.

Ela permite criar materiais e exportar em formato scorm, pdf ou publicar online com um link
Os materiais podem ser criados no formato de slides ou one-page
Possui uma central de midias para organizacao de todos documentos
Tem modo de edição, visualização, e revisão
Disciplinas podem ter temas com capas, e configurações personalizadas
São 35 tipos de elementos que podem ser criados nos slides e one-page
O tema permite criar variantes dos elementos, para personalizar rapidamente o material aplicando um tema
Possui um recurso de adaptive learning, onde o aluno segue pelo material por um caminho personalizado, com nodes de desempenho em atividades, espera, e escolha.

### Liviu Drive

Uma plataforma similar ao google drive para armazenamento de arquivos, organizacao e compartilhamento
Desenvolvi ela no aws amplify, fazendo todo stack de desenvolvimento, desde a criacao do repositorio ao deploy

### Liviu Flow

Um gerenciador de projetos completo, com trabalho colaborativo, e fluxos personalizados
Os fluxos sao conjuntos de tarefas que podem ser facilmente criados e editados
Ao criar uma entrega em um projeto, voce pode adicionar um fluxo, e todas tarefas sao adicionadas de uma vez, como um template
Tarefas possuem titulo, descricao, responsavel, supervisor, status, prioridade, datas, comentarios, arquivos e subtarefas
Tarefas podem ser vinculadas entre si

### Liviu Analytics

Uma ferramenta de analytics, feita para integrar diretamente com nossos materiais da Liviu Content
permite criar formularios de perguntas, como google forms
permite criar tags de acompanhamento, que geram um script, que quando adicionado a uma pagina captura eventos de navegacao e comportamento do usuario

### Monday Pannels

Uma plataforma simples para compartilhar paineis Monday com nossos clientes, para que eles pudessem acompanhar o andamento de seus projetos

### AI Playground

Um playground para interagir com varios modelos de IA, fluxos de trabalho (por exemplo, criacao de legendas automaticas para video), a fim de expandir nosso dominio de ferramentas aws. Feito com aws amplify e modelos do bedrock

### Liviu CRM

Uma plataforma para criacao de propostas comerciais
Permite cadastrar produtos, categorias subcategorias
Permite criar e salvar uma proposta com ppt
Cada proposta possui uma lista de produtos, desconto para cada um, preco, subtotal, impostos, desconto da proposta, e valor final
