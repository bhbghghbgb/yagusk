import PDFParser from "pdf2json";
import fs from "fs";

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError)
);
pdfParser.on("data", (page) => {
    if (!page) {
        return;
    }
    fs.writeFile("./F1040EZ.json", JSON.stringify(page), (err) => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });
});
pdfParser.loadPDF("./pdf/vcb_firstpage.pdf");
