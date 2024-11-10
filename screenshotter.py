from datetime import datetime as dt
from pathlib import Path as P
from traceback import print_exc as pe

import helium as hl
import undetected_chromedriver as uc
from selenium.webdriver.common.action_chains import ActionChains as AC
from selenium.webdriver.common.keys import Keys as K
from tqdm import tqdm as t

print("Getting ready ...")
driver = uc.Chrome(user_data_dir=str(P("./userdata").absolute()))
hl.set_driver(driver)
hl.go_to("https://swish.swi-prolog.org/")
hl.wait_until(hl.Text("No matching files").exists)
hl.click(hl.Button("Program", to_left_of=hl.Button("Notebook")))
hl.click(hl.S("div.prolog-editor.storage"))
hl.write(P("./rules.pl").read_text("utf-8"))
input("Adjust window size/code pane width then press Enter ...")
queries = P("derivatives_queries.txt").read_text("utf-8").splitlines()
try:
    for count, query in enumerate(t(queries, unit="cmd")):
        t.write(f"Working {count} ...")
        if all(
            ("./output" / P(filename)).exists()
            for filename in (
                f"command_{count}.txt",
                f"answer_{count}.txt",
                f"screen_{count}.png",
                f"element_{count}.png",
            )
        ):
            t.write(f"Skipped {count}")
            continue
        t.write(f"Clear q {count} ...")
        hl.click(hl.S("div.prolog-editor.query"))
        AC(driver).key_down(K.CONTROL).perform()
        AC(driver).send_keys("a").perform()
        AC(driver).key_up(K.CONTROL).perform()
        AC(driver).send_keys(K.DELETE).perform()
        hl.write(query)
        hl.click(hl.Button("Run!"))
        t.write(f"Running {count} ...")
        hl.wait_until(
            hl.S("div.inner>div.prolog-runner:nth-last-child(1)>div.wait-next").exists
        )
        t.write(f"Result  {count}")
        hl.click(
            hl.S(
                "div.inner>div.prolog-runner:nth-last-child(1)>div.wait-next>span.wait-next>button:nth-last-child(1)"
            )
        )
        text_query = hl.S(
            "div.inner>div.prolog-runner:nth-last-child(1)>div.runner-title>span.query"
        ).web_element.text
        text_answer = hl.S(
            "div.inner>div.prolog-runner:nth-last-child(1)>div.runner-results>div.answer"
        ).web_element.text
        P(f"./output/command_{count}.txt").write_text(text_query, "utf-8")
        t.write(f"Command {count}: {text_query.replace("\n","")}")
        P(f"./output/answer_{count}.txt").write_text(text_answer, "utf-8")
        t.write(f"Answer  {count}: {text_answer.replace("\n","")}")
        driver.save_screenshot(str(P(f"./output/screen_{count}.png").absolute()))
        t.write(f"Screen  {count} OK")
        t.write(f"End qry {count} ...")
        hl.wait_until(
            lambda: not hl.S(
                "div.inner>div.prolog-runner:nth-last-child(1)>div.stopped"
            ).exists()
        )
        hl.S("div.inner>div.prolog-runner:nth-last-child(1)").web_element.screenshot(
            str(P(f"./output/element_{count}.png").absolute())
        )
        t.write(f"Element {count} OK")
except Exception as e:
    driver.save_screenshot(P(f"./output/error_{dt.now()}.png"))
    pe()
    print(e)
finally:
    input("To exit ...")
