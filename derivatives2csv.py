from csv import writer
from pathlib import Path as P
import codecs as c

count = 116
with c.open("derivatives_csv.csv", "w", encoding="utf-8-sig") as f:
    w = writer(f)
    w.writerow(("derivative", "command_send", "command_response", "answer"))
    for d, cs, cr, a in zip(
        P("derivatives.txt").read_text("utf-8").splitlines(),
        P("derivatives_queries.txt").read_text("utf-8").splitlines(),
        (
            P(f"./output/command_{i}.txt").read_text("utf-8").replace("\n", "")
            for i in range(count)
        ),
        (
            P(f"./output/answer_{i}.txt").read_text("utf-8").replace("\n", "")
            for i in range(count)
        ),
        strict=True,
    ):
        w.writerow((d, cs, cr, a))
