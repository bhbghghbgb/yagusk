# Splits a multiple page bank statement pdf file to three seperate pdf files
# each containing one page for the first page, second page and last page.
# First page usually contains bank logo, account information, etc, and the
# statement table top y-pos is lower than other pages (i.e second page).
# Second page is a full size statement table page.
# Last page is a statement table page whose bottom y-pos is higher than
# other pages (i.e second page).

from pypdf import PdfWriter, PdfReader
from argparse import ArgumentParser
from logging import getLogger, basicConfig, DEBUG
from pathlib import Path

basicConfig(level=DEBUG)
logger = getLogger("PdfSplitter")
parser = ArgumentParser(
    prog="Bank statement pdf splitter.",
    description="Bank statement pdf splitter for inspection purposes.",
    epilog="Text at the bottom of help",
)
parser.add_argument("filename")
args = parser.parse_args()
filename = args.filename
path = Path(filename)

logger.info(f"Opening {filename}.")
with PdfReader(filename) as reader:
    logger.debug(f"Opened.")
    for index, suffix in {0: "firstpage", 1: "secondpage", -1: "lastpage"}.items():
        try:
            logger.debug(f"Reading {index=}")
            page = reader.pages[index]
            with PdfWriter(path.with_stem(f"{path.stem}_{suffix}")) as writer:
                writer.add_page(page)
            logger.info(f"Wrote a pdf file {suffix=} {index=}.")
        except KeyError:
            logger.warning(f"Page {index=} {suffix=} does not exist.")
