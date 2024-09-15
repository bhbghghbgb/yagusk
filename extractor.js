class VcbStatementRow {
  constructor() {
    this.tnxDate = null;
    this.docNo = null;
    this.debit = null;
    this.credit = null;
    this.balance = null;
    this.transactionsInDetail = null;
  }
}
class VcbStatementExtractor {
  // Use a rendered textLayer element to initialize.
  constructor(textLayerElement) {
    this.textLayer = textLayerElement;
    this.elements = [...textLayerElement.children];
    this.currentElementPos = -1;
    this.lastElementPos = this.elements.length - 1;
    this.currentRowData = null;
    this.completed = false;
  }
  extract() {}
  // find and advance to the next row element position starting from next in current
  toNextRow() {
    if (this.currentElementPos >= this.lastElementPos) {
      console.info("Extractor completion.");
      this.completed = true;
      return false;
    }
  }
  findNextRow() {
    if (this.currentElementPos >= this.lastElementPos) {
      console.info("Extractor completion.");
      this.completed = true;
      return false;
    }
    let i = this.currentElementPos;
    do {
      let element = this.elements[++i];
    } while (i);
    {
    }
  }
  // text is in date format DD/MM/YYYY
  elementAsTnxDate(element) {
    let elementText = this.elementAsText(element);
    if (!elementText) {
      return null;
    }
    if (
      element.style.left !== "4.84%" ||
      element.style.fontSize !== "calc(var(--scale-factor)*7.95px)"
    ) {
      return null;
    }
    let tnxDate = dayjs(elementText, "DD/MM/YYYY", true);
    if (!tnxDate.isValid()) {
      return null;
    }
    return tnxDate.toDate();
  }
  // text is in format 1234.56789 (4digit.5digit)
  elementAsDocno(element) {
    let elementText = this.elementAsText(element);
    if (!elementText) {
      return null;
    }
    if (
      element.style.left !== "4.84%" ||
      element.style.fontSize !== "calc(var(--scale-factor)*7.95px)"
    ) {
      return null;
    }
    if (!/^\d{4}\.\d{5}$/.test(elementText)) {
      return null;
    }
    return parseInt(elementText.substr(0, 4) + elementText.substr(5));
  }
  elementAsDebit(element) {
    // unknown element position specifics.
  }
  // text is integer with 3 digit dot seperation
  elementAsCredit(element) {
    let elementText = this.elementAsText(element);
    if (!elementText) {
      return null;
    }
    // the credit number is aligned to the right and we only have the left percentage
    let rightPosPercentage = this.calculateRightPosPercentage(element);
    if (
      // float tolerance
      rightPosPercentage < 47.79 ||
      rightPosPercentage > 47.81 ||
      element.style.fontSize !== "calc(var(--scale-factor)*8.00px)"
    ) {
      return null;
    }
    if (!/^\d+(\.\d{3})*$/.test(elementText)) {
      return null;
    }
    return parseInt(elementText.replaceAll(".", ""));
  }
  elementAsText(element) {
    if (element.tagName !== "SPAN") {
      return null;
    }
    return element.textContent.trim() || null;
  }
  calculateRightPosPercentage(element) {
    // left percentage
    return (
      parseFloat(element.style.left.substr(0, 5)) +
      // width of element
      (element.getBoundingClientRect().width /
        // width of parent
        element.parentElement.getBoundingClientRect().width) *
        // to percentage
        100
    );
  }
  elementIsFiller(element) {
    return element.tagName === "BR";
  }
}
