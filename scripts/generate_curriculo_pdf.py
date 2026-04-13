from __future__ import annotations

import html
import re
import subprocess
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
SOURCE_MD = ROOT / "curriculo-premium.md"
TMP_DIR = ROOT / "tmp" / "pdfs"
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_PDF = OUTPUT_DIR / "gabriel-roda-curriculo-profissional.pdf"
COMBINED_HTML = TMP_DIR / "gabriel-roda-curriculo.html"
EDGE_PATH = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")


def clean_inline(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = text.replace("`", "")
    text = text.replace("**", "")
    return text.strip()


def read_source() -> list[str]:
    lines = SOURCE_MD.read_text(encoding="utf-8").splitlines()
    output: list[str] = []
    for line in lines:
        if line.strip() == "## Nota de ajuste fino":
            break
        output.append(line.rstrip())
    return output


def parse_sections(lines: list[str]) -> dict[str, list[dict[str, object]]]:
    sections: dict[str, list[dict[str, object]]] = {}
    current_title: str | None = None
    current_bullets: list[str] = []

    def flush_bullets() -> None:
        nonlocal current_bullets
        if current_title and current_bullets:
            sections[current_title].append({"type": "ul", "items": current_bullets[:]})
            current_bullets = []

    for raw in lines:
        line = raw.strip()
        if not line:
            flush_bullets()
            continue

        if line.startswith("# "):
            continue

        if not line.startswith("## ") and current_title is None:
            continue

        if line.startswith("## "):
            flush_bullets()
            current_title = clean_inline(line[3:])
            sections[current_title] = []
            continue

        if line.startswith("### "):
            flush_bullets()
            sections[current_title].append({"type": "h3", "text": clean_inline(line[4:])})
            continue

        if line.startswith("- "):
            current_bullets.append(clean_inline(line[2:]))
            continue

        flush_bullets()
        if re.fullmatch(r"\*\*.+\*\*", line):
            sections[current_title].append({"type": "h4", "text": clean_inline(line)})
        else:
            sections[current_title].append({"type": "p", "text": clean_inline(line)})

    flush_bullets()
    return sections


def split_experience(blocks: list[dict[str, object]]) -> tuple[list[dict[str, object]], list[dict[str, object]]]:
    h3_indexes = [idx for idx, block in enumerate(blocks) if block["type"] == "h3"]
    if len(h3_indexes) < 2:
        return blocks, []
    split_at = h3_indexes[1]
    return blocks[:split_at], blocks[split_at:]


def render_block(block: dict[str, object]) -> str:
    block_type = block["type"]
    if block_type == "p":
        return f"<p>{html.escape(str(block['text']))}</p>"
    if block_type == "h3":
        return f"<h3>{html.escape(str(block['text']))}</h3>"
    if block_type == "h4":
        return f"<h4>{html.escape(str(block['text']))}</h4>"
    if block_type == "ul":
        items = "".join(f"<li>{html.escape(str(item))}</li>" for item in block["items"])
        return f"<ul>{items}</ul>"
    raise ValueError(f"Bloco nao suportado: {block_type}")


def render_section(title: str, blocks: list[dict[str, object]]) -> str:
    inner = "".join(render_block(block) for block in blocks)
    return f"""
    <section class="resume-section">
      <h2 class="section-title">{html.escape(title)}</h2>
      <div class="section-content">{inner}</div>
    </section>
    """


def build_page(title_suffix: str, body_html: str, *, first: bool = False, page_number: int = 1) -> str:
    header_html = ""
    if first:
        header_html = """
        <header class="hero">
          <div class="hero-copy">
            <h1>Gabriel Roda</h1>
            <p class="hero-role">Desenvolvedor Front-end | Produto digital | Educação digital</p>
            <div class="hero-contact">
              <span>Indaial - SC</span>
              <a href="tel:+5547991307406">(47) 9 9130-7406</a>
              <a href="mailto:gaabrielrd@live.com">gaabrielrd@live.com</a>
              <div class="hero-links">
                <a href="https://github.com/gaabrielrd">github.com/gaabrielrd</a>
                <a href="https://roda.dev">roda.dev</a>
                <a href="https://www.linkedin.com/in/gabriel-roda/">linkedin.com/in/gabriel-roda</a>
              </div>
            </div>
          </div>
          <aside class="hero-panel">
            <h2>Perfil</h2>
            <p>Front-end orientado à clareza, à experiência de uso e a fluxos de autoria. Vivência em educação digital, analytics, acessibilidade e evolução de produto.</p>
          </aside>
        </header>
        """
    else:
        header_html = f"""
        <header class="topbar">
          <span>Gabriel Roda</span>
          <span>Página {page_number}</span>
        </header>
        """

    return f"""
    <section class="page {'page-first' if first else ''}" aria-label="Página {page_number}">
      {header_html}
      <main class="page-content">
        {body_html}
      </main>
      <footer class="page-footer">gabriel roda | currículo profissional | {page_number:02d}</footer>
    </section>
    """


def build_html_document(pages: list[str]) -> str:
    css = """
    :root {
      --paper: #f7f4ee;
      --ink: #1f252b;
      --muted: #5a6571;
      --accent: #9d5c41;
      --accent-dark: #734331;
      --panel: #2b333b;
      --rule: #d9d0c5;
      --link: #9d5c41;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #dfd8cc; color: var(--ink); }
    body {
      font-family: "Segoe UI", Arial, sans-serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .document {
      width: 210mm;
      margin: 0 auto;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      background: var(--paper);
      position: relative;
      overflow: hidden;
      page-break-after: always;
    }
    .page:last-child { page-break-after: auto; }
    .page-first {
      padding-top: 0;
    }
    .topbar {
      background: var(--ink);
      color: #f4f1eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8mm 16mm;
      font-size: 10.5pt;
      font-weight: 600;
    }
    .hero {
      background: var(--ink);
      color: #f4f1eb;
      padding: 16mm 16mm 12mm;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 58mm;
      gap: 12mm;
      position: relative;
    }
    .hero::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2.6mm;
      background: var(--accent);
    }
    .hero h1 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 31pt;
      line-height: 1;
      letter-spacing: -0.02em;
    }
    .hero-role {
      margin: 7mm 0 5mm;
      color: #d9e1e7;
      font-size: 15pt;
      font-weight: 300;
    }
    .hero-contact {
      display: grid;
      gap: 2.2mm;
      font-size: 12pt;
    }
    .hero-contact a, .hero-links a {
      color: #f0ede7;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    .hero-links {
      display: flex;
      flex-wrap: wrap;
      gap: 3mm 5mm;
      margin-top: 1mm;
    }
    .hero-panel {
      background: rgba(255, 255, 255, 0.08);
      border-radius: 7mm;
      padding: 6mm;
      align-self: start;
    }
    .hero-panel h2 {
      margin: 0 0 3mm;
      color: #f4e0d3;
      font-size: 12pt;
      font-weight: 700;
    }
    .hero-panel p {
      margin: 0;
      color: #e8edf0;
      font-size: 11pt;
      line-height: 1.5;
    }
    .page-content {
      padding: 14mm 16mm 18mm;
    }
    .resume-section {
      margin-bottom: 8mm;
    }
    .section-title {
      display: flex;
      align-items: center;
      gap: 4mm;
      margin: 0 0 5mm;
      color: var(--accent-dark);
      font-size: 18pt;
      line-height: 1.15;
    }
    .section-title::before {
      content: "";
      width: 8mm;
      height: 1.2mm;
      border-radius: 999px;
      background: var(--accent);
      flex: none;
      position: relative;
      top: 0.4mm;
    }
    .section-content h3 {
      margin: 0 0 3.2mm;
      font-size: 17pt;
      line-height: 1.25;
      color: var(--ink);
    }
    .section-content h4 {
      margin: 4mm 0 2.2mm;
      font-size: 15pt;
      line-height: 1.2;
      color: var(--accent-dark);
    }
    .section-content p,
    .section-content li {
      margin: 0;
      font-size: 11.9pt;
      line-height: 1.45;
    }
    .section-content p + p {
      margin-top: 3.2mm;
    }
    .section-content ul {
      margin: 0;
      padding-left: 6.5mm;
    }
    .section-content ul + p,
    .section-content p + ul,
    .section-content h3 + ul,
    .section-content h4 + ul,
    .section-content ul + h3,
    .section-content ul + h4,
    .section-content p + h3,
    .section-content p + h4 {
      margin-top: 2.6mm;
    }
    .section-content li + li {
      margin-top: 2mm;
    }
    .section-content li::marker {
      color: var(--accent);
    }
    .page-footer {
      position: absolute;
      left: 16mm;
      bottom: 8mm;
      color: var(--muted);
      font-size: 10.5pt;
    }
    a {
      color: var(--link);
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    @page {
      size: A4;
      margin: 0;
    }
    @media screen {
      .document {
        padding: 6mm 0 10mm;
      }
      .page {
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
        margin-bottom: 6mm;
      }
    }
    @media print {
      html, body {
        background: white;
      }
      .document {
        width: auto;
      }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }
    """

    return f"""<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gabriel Roda - Currículo Profissional</title>
  <style>{css}</style>
</head>
<body>
  <div class="document">
    {''.join(pages)}
  </div>
</body>
</html>
"""


def render_pages(sections: dict[str, list[dict[str, object]]]) -> list[str]:
    experience_page_one, experience_page_two = split_experience(sections["Experiência profissional"])

    page_1_body = "".join(
        [
            render_section("Resumo executivo", sections["Resumo executivo"]),
            render_section("Competências centrais", sections["Competências centrais"]),
            render_section("Experiência profissional", experience_page_one),
        ]
    )

    page_2_body = render_section("Experiência profissional", experience_page_two)

    page_3_body = "".join(
        [
            render_section("Projetos relevantes na trajetória pela Uniasselvi", sections["Projetos relevantes na trajetória pela Uniasselvi"]),
            render_section("Formação acadêmica", sections["Formação acadêmica"]),
            render_section("Qualificações e atividades complementares", sections["Qualificações e atividades complementares"]),
            render_section("Idiomas", sections["Idiomas"]),
            render_section("Informações adicionais", sections["Informações adicionais"]),
        ]
    )

    return [
        build_page("Página 1", page_1_body, first=True, page_number=1),
        build_page("Página 2", page_2_body, page_number=2),
        build_page("Página 3", page_3_body, page_number=3),
    ]


def run_edge(args: list[str]) -> None:
    subprocess.run([str(EDGE_PATH), *args], check=True)


def resolve_output_pdf() -> Path:
    if not OUTPUT_PDF.exists():
        return OUTPUT_PDF

    try:
        OUTPUT_PDF.unlink()
        return OUTPUT_PDF
    except PermissionError:
        for idx in range(2, 20):
            candidate = OUTPUT_DIR / f"gabriel-roda-curriculo-profissional-v{idx}.pdf"
            if not candidate.exists():
                return candidate
        raise RuntimeError("Nao foi possivel definir um nome de saida livre para o PDF.")


def write_preview_pages(pages: list[str], preview_prefix: str) -> list[Path]:
    preview_paths: list[Path] = []
    for idx, page in enumerate(pages, start=1):
        html_path = TMP_DIR / f"gabriel-roda-curriculo-page-{idx:02d}.html"
        png_path = TMP_DIR / f"{preview_prefix}-page-{idx:02d}.png"
        html_path.write_text(build_html_document([page]), encoding="utf-8")
        run_edge(
            [
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--window-size=1240,1754",
                f"--screenshot={png_path}",
                html_path.resolve().as_uri(),
            ]
        )
        preview_paths.append(png_path)
    return preview_paths


def generate_pdf() -> None:
    if not EDGE_PATH.exists():
        raise FileNotFoundError(f"Edge nao encontrado em {EDGE_PATH}")

    TMP_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output_pdf = resolve_output_pdf()

    sections = parse_sections(read_source())
    pages = render_pages(sections)

    combined_html = build_html_document(pages)
    COMBINED_HTML.write_text(combined_html, encoding="utf-8")

    run_edge(
        [
            "--headless=new",
            "--disable-gpu",
            "--print-to-pdf-no-header",
            f"--print-to-pdf={output_pdf}",
            COMBINED_HTML.resolve().as_uri(),
        ]
    )

    add_clickable_links(output_pdf)
    preview_paths = write_preview_pages(pages, output_pdf.stem)

    print(f"PDF: {output_pdf}")
    print(f"HTML: {COMBINED_HTML}")
    for path in preview_paths:
        print(path)


def add_clickable_links(pdf_path: Path) -> None:
    doc = fitz.open(pdf_path)
    page = doc[0]

    targets = [
        {"text": "(47) 9 9130-7406", "uri": "tel:+5547991307406"},
        {"text": "gaabrielrd@live.com", "uri": "mailto:gaabrielrd@live.com"},
        {"text": "github.com/gaabrielrd", "uri": "https://github.com/gaabrielrd"},
        {"text": "roda.dev", "uri": "https://roda.dev"},
        {"text": "linkedin.com/in/gabriel-roda", "uri": "https://www.linkedin.com/in/gabriel-roda/"},
    ]

    for target in targets:
        matches = page.search_for(target["text"])
        for rect in matches:
            page.insert_link({"kind": fitz.LINK_URI, "from": rect, "uri": target["uri"]})

    doc.save(pdf_path, incremental=True, encryption=fitz.PDF_ENCRYPT_KEEP)
    doc.close()


if __name__ == "__main__":
    generate_pdf()
