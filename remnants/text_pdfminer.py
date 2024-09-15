# pdfminer has an element system, this is promising because we can obtain the
# text bbox and determine the columns and rows

# WORK IN PROGRESS

from dataclasses import dataclass
from datetime import date
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextBoxHorizontal, LTPage


@dataclass
class VcbStatementRow:
    tnx_date: date
    doc_no: str
    debit: int
    credit: int
    balance: int
    transactions_in_detail: str


def extract_table(page: LTPage, ytop: float, ybot: float = 90.0):
    sanity_check(page)
    


def sanity_check(page: LTPage):
    assert page.height == 842
    assert page.width == 595
    assert page.rotate == 0


for page in extract_pages("vcb_firstpage.pdf"):
    for element in page:
        if isinstance(element, LTTextBoxHorizontal):
            breakpoint()
        print(element)
