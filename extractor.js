class VcbStatementRow {
    constructor() {
        this.tnxDate = null;
        this.docNo = null;
        this.debit = null;
        this.credit = null;
        this.balance = null;
        this.transactionsInDetail = [];
    }
}
class VcbStatementExtractor {
    // Use a rendered textLayer element to initialize.
    constructor(textLayerElement, pageNo, noOfPage) {
        this.textLayer = textLayerElement;
        this.pageNo = pageNo;
        this.noOfPage = noOfPage;
        this.elements = [...textLayerElement.children];
        this.currentElementPos = -1;
        this.currentElement = undefined;
        this.lastElementPos = this.elements.length - 1;
        // undefined: not yet parsed, null: not a text element, "": is text element but useless
        // otherwise, stores the current parsed text
        this.currentElementText = undefined;
        // stores successfully determined type and value of current element
        this.currentElementType = undefined;
        this.currentElementValue = undefined;
        // VcbStatementRow
        this.currentRowData = undefined;
        this.completed = false;

        this._eTypeMappings = [
            { type: "tnxDate", fn: this._eAsTnxDate },
            { type: "docNo", fn: this._eAsDocNo },
            { type: "debit", fn: this._eAsDebit },
            { type: "credit", fn: this._eAsCredit },
            { type: "balance", fn: this._eAsBalance },
            { type: "transactionsInDetail", fn: this._eAsTransactionsInDetail },
        ];
    }
    extract() {}
    // advance cursor
    _toNextElement() {
        if (this.currentElementPos >= this.lastElementPos) {
            this.completed = true;
            return false;
        }
        this.currentElementText = undefined;
        this.currentElement = undefined;
        this.currentElementType = undefined;
        this.currentElementValue = undefined;
        this.currentElement = this.elements[this.currentElementPos++];
        // TODO
        return true;
    }
    // determine current element type and value
    _eDetermine() {
        for (const tm of this._eTypeMappings) {
            const value = tm.fn.call(this);
            if (value != null) {
                this.currentElementType = tm.type;
                this.currentElementValue = value;
                return;
            }
        }
        this.current;
    }
    // go to next element with specific types
    _eToNext(types) {
        if (!this._toNextElement()) {
            return false;
        }
        this._eDetermine();
        if (!types.includes(this.currentElementValue)) {
        }
    }
    // text is in date format DD/MM/YYYY
    _eAsTnxDate() {
        let elementText = this._eAsText();
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
    _eAsDocNo() {
        let elementText = this._eAsText();
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
    _eAsDebit() {
        // unknown element position specifics. unimplemented
    }
    // text is integer with 3 digit dot seperation
    _eAsCredit() {
        let elementText = this._eAsText();
        if (!elementText) {
            return null;
        }
        // the credit number is aligned to the right and we only have the left percentage
        let rightPosPercentage = this.calculateRightPosPercentage(element);
        if (
            // float tolerance
            rightPosPercentage < 47.75 ||
            rightPosPercentage > 47.85 ||
            element.style.fontSize !== "calc(var(--scale-factor)*8.00px)"
        ) {
            return null;
        }
        if (!/^\d+(\.\d{3})*$/.test(elementText)) {
            return null;
        }
        return parseInt(elementText.replaceAll(".", ""));
    }
    // text is integer with 3 digit dot seperation
    _eAsBalance() {
        let elementText = this._eAsText();
        if (!elementText) {
            return null;
        }
        // the balance number is aligned to the right and we only have the left percentage
        let rightPosPercentage = this.calculateRightPosPercentage(element);
        if (
            // float tolerance
            rightPosPercentage < 63.49 ||
            rightPosPercentage > 63.59 ||
            element.style.fontSize !== "calc(var(--scale-factor)*8.00px)"
        ) {
            return null;
        }
        if (!/^\d+(\.\d{3})*$/.test(elementText)) {
            return null;
        }
        return parseInt(elementText.replaceAll(".", ""));
    }
    _eAsTransactionsInDetail() {
        let elementText = this._eAsText();
        if (elementText == null) {
            return null;
        }
        if (!/^[ -~]*$/.test(elementText)) {
            return null;
        }
        return elementText;
    }
    // get current element text
    // undefined: not yet parsed, null: not a text element, "": is text element but useless
    // otherwise, stores the current parsed text
    _eAsText() {
        if (this.currentElementText !== undefined) {
            return this.currentElementText;
        }
        if (element.tagName !== "SPAN") {
            return (this.currentElementText = null);
        }
        // no need to trim spaces
        return (this.currentElementText = element.textContent);
    }
    calculateRightPosPercentage(element) {
        let left = element.style.left;
        if (!left.endsWith("%")) {
            return null;
        }
        return (
            // left percentage
            parseFloat(left.slice(0, -1)) +
            // width of element
            (element.getBoundingClientRect().width /
                // width of parent
                element.parentElement.getBoundingClientRect().width) *
                // to percentage
                100
        );
    }
    _eIsFiller() {
        return this.currentElement.tagName === "BR";
    }
    _eIsHeader() {
        return (
            this.currentElement.tagName === "SPAN" &&
            this.currentElement.style.left === "74.98%" &&
            this.currentElement.style.fontSize ===
                "calc(var(--scale-factor)*8.00px)" &&
            this.currentElement.textContent === "Transactions in detail"
        );
    }
    _eIsFooter() {
        let rightPosPercentage = this.calculateRightPosPercentage(element);
        return (
            this.currentElement.tagName === "SPAN" &&
            this.currentElement.style.top === "95.98%" &&
            rightPosPercentage >= 95.39 &&
            rightPosPercentage <= 95.41 &&
            this.currentElement.style.fontSize ===
                "calc(var(--scale-factor)*8.10px)" &&
            this.currentElement.textContent ===
                `Page ${this.pageNo} of ${this.noOfPage}`
        );
    }
}
