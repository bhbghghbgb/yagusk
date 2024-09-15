# Generate a text file detailing elements in a pdf file using pdfminer

from pathlib import Path
from pdfminer.high_level import extract_pages

path = Path("vtb_firstpage.pdf")
lines = []
for page in extract_pages(str(path)):
    for element in page:
        lines.append(f"{str(element)}\n")
with open(path.with_name(f"{path.stem}_elements.txt"), "w", encoding='utf-8') as text:
    text.writelines(lines)
