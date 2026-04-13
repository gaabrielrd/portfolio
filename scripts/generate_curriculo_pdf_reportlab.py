from __future__ import annotations

import argparse
import re
from pathlib import Path

import fitz
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, StyleSheet1, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs" / "reportlab-rendered"
DEFAULT_SOURCE_MD = ROOT / "curriculo-premium.md"
DEFAULT_OUTPUT_PDF = OUTPUT_DIR / "gabriel-roda-curriculo-profissional-final.pdf"

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 16 * mm
BOTTOM_MARGIN = 12 * mm
FIRST_HEADER_HEIGHT = 70 * mm
LATER_HEADER_HEIGHT = 18 * mm

INK = colors.HexColor("#1f252b")
PAPER = colors.HexColor("#f7f4ee")
ACCENT = colors.HexColor("#9d5c41")
ACCENT_DARK = colors.HexColor("#734331")
MUTED = colors.HexColor("#5a6571")
PANEL = colors.HexColor("#2b333b")
LINK_LIGHT = colors.HexColor("#f0ede7")


def register_fonts() -> None:
    fonts = {
        "Georgia": r"C:\Windows\Fonts\georgia.ttf",
        "Georgia-Bold": r"C:\Windows\Fonts\georgiab.ttf",
        "SegoeUI": r"C:\Windows\Fonts\segoeui.ttf",
        "SegoeUI-Bold": r"C:\Windows\Fonts\segoeuib.ttf",
        "SegoeUI-Light": r"C:\Windows\Fonts\segoeuil.ttf",
    }
    for name, path in fonts.items():
        pdfmetrics.registerFont(TTFont(name, path))


def clean_inline(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = text.replace("`", "")
    text = text.replace("**", "")
    return text.strip()


def read_source(source_md: Path) -> list[str]:
    lines = source_md.read_text(encoding="utf-8").splitlines()
    output: list[str] = []
    for line in lines:
        if line.strip() in {"## Nota de ajuste fino", "## Fine-Tuning Note"}:
            break
        output.append(line.rstrip())
    return output


def parse_sections(lines: list[str]) -> tuple[dict[str, list[dict[str, object]]], list[str]]:
    sections: dict[str, list[dict[str, object]]] = {}
    order: list[str] = []
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
            order.append(current_title)
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
    return sections, order


def split_experience_blocks(blocks: list[dict[str, object]]) -> list[list[dict[str, object]]]:
    groups: list[list[dict[str, object]]] = []
    current: list[dict[str, object]] = []
    for block in blocks:
        if block["type"] == "h3" and current:
            groups.append(current)
            current = [block]
        else:
            current.append(block)
    if current:
        groups.append(current)
    return groups


def build_styles() -> StyleSheet1:
    styles = getSampleStyleSheet()

    styles.add(
        ParagraphStyle(
            name="ResumeBody",
            parent=styles["BodyText"],
            fontName="SegoeUI",
            fontSize=12,
            leading=18,
            textColor=INK,
            spaceAfter=7,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeRole",
            parent=styles["Heading3"],
            fontName="SegoeUI-Bold",
            fontSize=13.5,
            leading=18,
            textColor=INK,
            spaceBefore=4,
            spaceAfter=5,
            keepWithNext=True,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeSubsection",
            parent=styles["Heading4"],
            fontName="SegoeUI-Bold",
            fontSize=12.5,
            leading=16,
            textColor=ACCENT_DARK,
            spaceBefore=6,
            spaceAfter=4,
            keepWithNext=True,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeStrong",
            parent=styles["Heading4"],
            fontName="SegoeUI-Bold",
            fontSize=12.8,
            leading=17,
            textColor=ACCENT_DARK,
            spaceBefore=2,
            spaceAfter=3,
            keepWithNext=True,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeBullet",
            parent=styles["BodyText"],
            fontName="SegoeUI",
            fontSize=12,
            leading=17,
            textColor=INK,
            leftIndent=11,
            firstLineIndent=0,
            spaceAfter=0,
        )
    )
    return styles


class SectionHeading(Flowable):
    def __init__(self, text: str) -> None:
        super().__init__()
        self.text = text
        self.font_name = "SegoeUI-Bold"
        self.font_size = 18
        self.line_width = 8 * mm
        self.gap = 4 * mm
        self.height = 10 * mm

    def wrap(self, availWidth, availHeight):
        return availWidth, self.height

    def draw(self) -> None:
        canvas = self.canv
        y = self.height - 4 * mm
        canvas.setStrokeColor(ACCENT)
        canvas.setLineWidth(1.3 * mm)
        canvas.line(0, y, self.line_width, y)

        canvas.setFont(self.font_name, self.font_size)
        canvas.setFillColor(ACCENT_DARK)
        canvas.drawString(self.line_width + self.gap, y - 4, self.text)


def paragraph(text: str, style_name: str, styles: StyleSheet1) -> Paragraph:
    safe = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )
    return Paragraph(safe, styles[style_name])


def bullet_paragraphs(items: list[str], styles: StyleSheet1) -> list[Paragraph]:
    output: list[Paragraph] = []
    for item in items:
        safe = (
            item.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
        )
        output.append(Paragraph(safe, styles["ResumeBullet"], bulletText="•"))
    return output


def add_section_story(
    story: list,
    title: str,
    blocks: list[dict[str, object]],
    styles: StyleSheet1,
    *,
    page_break_before: bool = False,
) -> None:
    if page_break_before:
        story.append(PageBreak())
    story.append(SectionHeading(title))
    story.append(Spacer(1, 2 * mm))

    grouped_experience = title in {"Experiência profissional", "Professional Experience"}
    role_group: list = []

    def flush_group() -> None:
        nonlocal role_group
        if role_group:
            story.append(KeepTogether(role_group[:]))
            role_group = []

    for block in blocks:
        if block["type"] == "h3":
            flush_group()
            role_group.append(paragraph(str(block["text"]), "ResumeRole", styles))
        elif block["type"] == "h4":
            target = role_group if grouped_experience and role_group else story
            target.append(paragraph(str(block["text"]), "ResumeSubsection", styles))
        elif block["type"] == "p":
            text = str(block["text"])
            style_name = "ResumeStrong" if title in {"Formação acadêmica", "Education"} and not story[-1].__class__.__name__ == "Paragraph" else "ResumeBody"
            if title in {"Formação acadêmica", "Education"} and text in {"Bacharelado em Ciência da Computação", "Bachelor's Degree in Computer Science"}:
                target = story
                target.append(paragraph(text, "ResumeStrong", styles))
            else:
                target = role_group if grouped_experience and role_group else story
                target.append(paragraph(text, "ResumeBody", styles))
        elif block["type"] == "ul":
            target = role_group if grouped_experience and role_group else story
            target.extend(bullet_paragraphs(list(block["items"]), styles))
            target.append(Spacer(1, 1.4 * mm))

    flush_group()
    story.append(Spacer(1, 3 * mm))


def draw_links(canvas, links: list[dict[str, object]]) -> None:
    canvas.setFillColor(LINK_LIGHT)
    canvas.setFont("SegoeUI", 11.5)
    for link in links:
        canvas.drawString(link["x"], link["y"], link["label"])
        width = pdfmetrics.stringWidth(link["label"], "SegoeUI", 11.5)
        canvas.linkURL(
            link["href"],
            (link["x"], link["y"] - 2, link["x"] + width, link["y"] + 11),
            relative=0,
            thickness=0,
        )


def draw_link_row(canvas, x: float, y: float, links: list[dict[str, str]], gap: float = 8) -> None:
    cursor_x = x
    for link in links:
        label = link["label"]
        width = pdfmetrics.stringWidth(label, "SegoeUI", 11.0)
        canvas.setFillColor(LINK_LIGHT)
        canvas.setFont("SegoeUI", 11.0)
        canvas.drawString(cursor_x, y, label)
        canvas.linkURL(
            link["href"],
            (cursor_x, y - 2, cursor_x + width, y + 10),
            relative=0,
            thickness=0,
        )
        cursor_x += width + gap


def draw_first_page(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, PAGE_HEIGHT - FIRST_HEADER_HEIGHT, PAGE_WIDTH, FIRST_HEADER_HEIGHT, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_HEIGHT - FIRST_HEADER_HEIGHT - 2.5 * mm, PAGE_WIDTH, 2.5 * mm, fill=1, stroke=0)

    left_x = MARGIN_X
    name_y = PAGE_HEIGHT - 24 * mm
    canvas.setFillColor(colors.HexColor("#f4f1eb"))
    canvas.setFont("Georgia-Bold", 31)
    canvas.drawString(left_x, name_y, "Gabriel Roda")

    canvas.setFillColor(colors.HexColor("#d9e1e7"))
    canvas.setFont("SegoeUI-Light", 14.2)
    subtitle_lines = getattr(doc, "_resume_subtitle_lines", ["Desenvolvedor Front-end | Produto digital", "Educação digital"])
    canvas.drawString(left_x, name_y - 18, subtitle_lines[0])
    if len(subtitle_lines) > 1:
        canvas.drawString(left_x, name_y - 34, subtitle_lines[1])

    canvas.setFillColor(colors.HexColor("#eef1f4"))
    canvas.setFont("SegoeUI", 12.2)
    canvas.drawString(left_x, name_y - 54, "Indaial - SC")

    contact_links = [
        {"label": "(47) 9 9130-7406", "href": "tel:+5547991307406", "x": left_x, "y": name_y - 72},
        {"label": "gaabrielrd@live.com", "href": "mailto:gaabrielrd@live.com", "x": left_x, "y": name_y - 90},
    ]
    draw_links(canvas, contact_links)
    draw_link_row(
        canvas,
        left_x,
        name_y - 108,
        [
            {"label": "github.com/gaabrielrd", "href": "https://github.com/gaabrielrd"},
            {"label": "roda.dev", "href": "https://roda.dev"},
            {"label": "linkedin.com/in/gabriel-roda", "href": "https://www.linkedin.com/in/gabriel-roda/"},
        ],
        gap=14,
    )
    canvas.restoreState()


def draw_later_pages(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, PAGE_HEIGHT - LATER_HEADER_HEIGHT, PAGE_WIDTH, LATER_HEADER_HEIGHT, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#f4f1eb"))
    canvas.setFont("SegoeUI-Bold", 10.5)
    canvas.drawString(MARGIN_X, PAGE_HEIGHT - 12 * mm, "Gabriel Roda")
    page_label = getattr(doc, "_resume_page_label", "Página")
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, PAGE_HEIGHT - 12 * mm, f"{page_label} {doc.page}")
    canvas.restoreState()


def resolve_output_path(base_output_pdf: Path) -> Path:
    if not base_output_pdf.exists():
        return base_output_pdf
    for idx in range(2, 20):
        candidate = base_output_pdf.with_name(f"{base_output_pdf.stem}-v{idx}{base_output_pdf.suffix}")
        if not candidate.exists():
            return candidate
    raise RuntimeError("Não foi possível definir um nome livre para o PDF final.")


def build_story(styles: StyleSheet1, source_md: Path) -> list:
    sections, order = parse_sections(read_source(source_md))
    story: list = []

    for idx, title in enumerate(order):
        add_section_story(
            story,
            title,
            sections[title],
            styles,
            page_break_before=False,
        )
    return story


def render_pdf(pdf_path: Path, source_md: Path, lang: str) -> None:
    register_fonts()
    styles = build_styles()

    doc = BaseDocTemplate(
        str(pdf_path),
        pagesize=A4,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=0,
        bottomMargin=BOTTOM_MARGIN,
        title="Gabriel Roda - Professional Resume" if lang == "en" else "Gabriel Roda - Currículo Profissional",
        author="Gabriel Roda",
    )
    if lang == "en":
        doc._resume_subtitle_lines = ["Front-End Developer | Digital Product", "Digital Education"]
        doc._resume_page_label = "Page"
    else:
        doc._resume_subtitle_lines = ["Desenvolvedor Front-end | Produto digital", "Educação digital"]
        doc._resume_page_label = "Página"

    first_frame = Frame(
        MARGIN_X,
        BOTTOM_MARGIN + 12 * mm,
        PAGE_WIDTH - (2 * MARGIN_X),
        PAGE_HEIGHT - FIRST_HEADER_HEIGHT - BOTTOM_MARGIN - 18 * mm,
        id="first",
    )
    later_frame = Frame(
        MARGIN_X,
        BOTTOM_MARGIN + 12 * mm,
        PAGE_WIDTH - (2 * MARGIN_X),
        PAGE_HEIGHT - LATER_HEADER_HEIGHT - BOTTOM_MARGIN - 16 * mm,
        id="later",
    )

    doc.addPageTemplates(
        [
            PageTemplate(id="First", frames=[first_frame], onPage=draw_first_page, autoNextPageTemplate="Later"),
            PageTemplate(id="Later", frames=[later_frame], onPage=draw_later_pages),
        ]
    )

    story = build_story(styles, source_md)
    doc.build(story)


def render_previews(pdf_path: Path) -> list[Path]:
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    preview_paths: list[Path] = []
    doc = fitz.open(pdf_path)
    for page_number, page in enumerate(doc, start=1):
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        out = TMP_DIR / f"{pdf_path.stem}-page-{page_number:02d}.png"
        pix.save(out)
        preview_paths.append(out)
    doc.close()
    return preview_paths


def inspect_links(pdf_path: Path) -> list[tuple[int, list[str]]]:
    doc = fitz.open(pdf_path)
    data: list[tuple[int, list[str]]] = []
    for page_number, page in enumerate(doc, start=1):
        uris = [link.get("uri") for link in page.get_links() if link.get("uri")]
        data.append((page_number, uris))
    doc.close()
    return data


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", default=str(DEFAULT_SOURCE_MD))
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT_PDF))
    parser.add_argument("--lang", choices=["pt", "en"], default="pt")
    args = parser.parse_args()

    source_md = Path(args.source)
    output_pdf_base = Path(args.output)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf_path = resolve_output_path(output_pdf_base)
    render_pdf(pdf_path, source_md, args.lang)
    previews = render_previews(pdf_path)
    link_data = inspect_links(pdf_path)

    print(f"PDF: {pdf_path}")
    for preview in previews:
        print(preview)
    for page_number, uris in link_data:
        print(f"page {page_number} links {len(uris)} {uris}")


if __name__ == "__main__":
    main()
