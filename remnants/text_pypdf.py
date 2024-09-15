# pypdf doesn't have an element system, extracting text otherwise is unreliable
# as text from other column oftens is processed as if they are on the same
# line

# PROOF OF CONCEPT

from pypdf import PdfReader

def visitor(text, cm, tm, font_dict, font_size):
    if text:
        print(tm, text)
with PdfReader("vcb_secondpage.pdf") as reader:
    reader.pages[0].extract_text(visitor_text=visitor)