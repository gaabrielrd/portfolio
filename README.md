# Gabriel Roda | Portfolio

Portfólio profissional desenvolvido com Next.js para apresentar minha trajetória em front-end, educação digital, produto e plataformas de autoria.

O projeto foi pensado para organizar minha apresentação pessoal, destacar projetos relevantes da carreira e oferecer uma navegação clara entre visão geral, trajetória e contato.

## Visão geral

Este repositório reúne a base do site pessoal **roda.dev**, com foco em:

- apresentação profissional e posicionamento de carreira
- vitrine de projetos e experiências por empresa
- narrativa visual autoral, com tipografia, animação e identidade própria
- estrutura simples para manutenção e atualização de conteúdo

## Acesso

- Site: [roda.dev](https://roda.dev)
- GitHub: [github.com/gaabrielrd](https://github.com/gaabrielrd)
- LinkedIn: [linkedin.com/in/gabriel-roda](https://www.linkedin.com/in/gabriel-roda/)

## Stack

- Next.js 16
- React 19
- TypeScript
- SCSS Modules
- `next/font` para tipografia local e Google Fonts
- Vercel Analytics

## O que o projeto apresenta

- Home com posicionamento profissional e áreas de atuação
- Página `About` com resumo da trajetória, foco de trabalho e canais de contato
- Página `Projects` com linha do tempo por empresa e descrição dos principais produtos
- Conteúdo estruturado para destacar educação digital, authoring, produto e plataformas internas

## Estrutura do projeto

```text
app/
  layout.tsx
  page.tsx
  about/
    page.tsx
  projects/
    page.tsx
    projects-data.ts
components/
  navbar/
  footer/
  blobs/
public/
  fonts/
  images/
curriculo.md
projects.md
```

## Organização do conteúdo

Os principais pontos de manutenção do portfólio estão centralizados em poucos arquivos:

- `app/page.tsx`: mensagem principal da home
- `app/about/page.tsx`: resumo profissional, foco de atuação e contato
- `app/projects/projects-data.ts`: base estruturada dos projetos exibidos no site
- `projects.md`: versão em Markdown da apresentação detalhada dos projetos
- `curriculo.md`: currículo em Markdown

Essa separação facilita atualizar o site e também reaproveitar o conteúdo em outros formatos, como currículo, GitHub e apresentações.

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Acesse no navegador:

```text
http://localhost:3000
```

## Scripts disponíveis

- `npm run dev`: inicia o ambiente local
- `npm run build`: gera a build de produção
- `npm run start`: sobe a aplicação em modo produção
- `npm run lint`: executa o lint do projeto

## Direção do projeto

Este portfólio não foi pensado como um template genérico, mas como uma apresentação profissional autoral. A proposta é unir clareza de navegação, linguagem visual consistente e conteúdo com contexto real de produto.

Boa parte da narrativa do site nasce da combinação entre experiência profissional, educação digital e construção de ferramentas para autoria, leitura, analytics e operação.

## Próximos passos

Entre os pontos que podem continuar evoluindo no projeto:

- refinamento contínuo do conteúdo e da narrativa profissional
- inclusão de estudos de caso mais completos
- expansão da camada de SEO e metadados sociais
- adição de imagens de projetos ou capturas selecionadas

## Licença

Este repositório representa meu portfólio pessoal. O código pode servir como referência de estrutura, mas o conteúdo textual, a narrativa profissional e a identidade do projeto são de uso pessoal.
