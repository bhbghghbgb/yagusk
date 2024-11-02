from pathlib import Path

import helium as hl
import undetected_chromedriver as uc
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from tqdm import tqdm

print("Getting ready ...")
driver = uc.Chrome(user_data_dir=str(Path("./userdata").absolute()))
hl.set_driver(driver)
hl.go_to("https://swish.swi-prolog.org/")
hl.wait_until(hl.Text("No matching files").exists)
hl.click(hl.Button("Program", to_left_of=hl.Button("Notebook")))
hl.click(hl.S("div.prolog-editor.storage"))
hl.write(Path("./rules.pl").read_text("utf-8"))
input("Adjust window size/code pane width then press Enter ...")
queries = Path("derivatives_queries.txt").read_text("utf-8").splitlines()
for count, query in enumerate(tqdm(queries, unit="cmd")):
    tqdm.write(f"Working {count} ...")
    tqdm.write(f"Clear q {count} ...")
    hl.click(hl.S("div.prolog-editor.query"))
    ActionChains(driver).key_down(Keys.CONTROL).perform()
    ActionChains(driver).send_keys("a").perform()
    ActionChains(driver).key_up(Keys.CONTROL).perform()
    ActionChains(driver).send_keys(Keys.DELETE).perform()
    hl.write(query)
    hl.click(hl.Button("Run!"))
    tqdm.write(f"Running {count} ...")
    hl.wait_until(
        hl.S("div.inner>div.prolog-runner:nth-last-child(1)>div.wait-next").exists
    )
    tqdm.write(f"Result  {count}")
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
    Path(f"./output/command_{count}.txt").write_text(text_query, "utf-8")
    tqdm.write(f"Command {count}: {text_query.replace("\n","")}")
    Path(f"./output/answer_{count}.txt").write_text(text_answer, "utf-8")
    tqdm.write(f"Answer  {count}: {text_answer.replace("\n","")}")
    driver.save_screenshot(str(Path(f"./output/screen_{count}.png").absolute()))
    tqdm.write(f"Screen  {count} OK")
    hl.S("div.inner>div.prolog-runner:nth-last-child(1)").web_element.screenshot(
        str(Path(f"./output/element_{count}.png").absolute())
    )
    tqdm.write(f"Element {count} OK")
    tqdm.write(f"End qry {count} ...")
    hl.wait_until(
        lambda: not hl.S(
            "div.inner>div.prolog-runner:nth-last-child(1)>div.stopped"
        ).exists()
    )
