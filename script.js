// https://stackoverflow.com/questions/33063213/pdf-js-with-text-selection

const pdfCanvas = document.getElementById("pdfCanvas");
const pdfContainer = document.getElementById("pdfContainer");
const htmlCodeBox = document.getElementById("htmlCodeBox");
const extractButton = document.getElementById("extractButton");
const filenameContainer = document.getElementById("filenameContainer");
const currentPageContainer = document.getElementById("currentPageContainer");
const copyButton = document.getElementById("copyButton");
const prevPageButton = document.getElementById("prevPageButton");
const nextPageButton = document.getElementById("nextPageButton");
const pdfTextLayer = document.getElementById("textLayer");

var loadedPdf = null;
var currentPage;
var pageCount;
var pageRendering = false;
var pageNumPending = null;

function loadPDF(pdfFile) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const pdfData = new Uint8Array(event.target.result);
    pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
      loadedPdf = pdf;
      filenameContainer.textContent = pdfFile.name;
      pageCount = pdf.numPages;
      currentPage = 1;
      queueRenderPage(currentPage);
    });
  };
  reader.readAsArrayBuffer(pdfFile);
}

function renderPage(page) {
  pageRendering = true;
  currentPageContainer.textContent = `Current page: (Rendering) ${currentPage}/${pageCount}`;
  loadedPdf.getPage(page).then((page) => {
    const viewport = page.getViewport({ scale: 1.0 });
    pdfCanvas.width = viewport.width;
    pdfCanvas.height = viewport.height;

    const context = pdfCanvas.getContext("2d");
    page
      .render({ canvasContext: context, viewport: viewport })
      .promise.then(() => {
        pageRendering = false;
        currentPageContainer.textContent = `Current page: ${currentPage}/${pageCount}`;
        if (pageNumPending !== null) {
          renderPage(loadedPdf, pageNumPending);
          pageNumPending = null;
        }
      })
      .then(() => page.getTextContent())
      .then((textContent) => {
        pdfTextLayer.style.left = pdfCanvas.offsetLeft + "px";
        pdfTextLayer.style.top = pdfCanvas.offsetTop + "px";
        pdfTextLayer.style.height = viewport.height + "px";
        pdfTextLayer.style.width = viewport.width + "px";
        const textLayer = new pdfjsLib.TextLayer({
          textContentSource: textContent,
          container: pdfTextLayer,
          viewport: viewport,
          textDivs: [],
        });
        textLayer.render().then(() => {
          htmlCodeBox.textContent = pdfTextLayer.innerHTML;
        });
      });
  });
}

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
    if (!currentPageContainer.textContent.includes("Queued")) {
      currentPageContainer.textContent += "(Queued)";
    }
  } else {
    renderPage(num);
  }
}

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(htmlCodeBox.textContent);
});

extractButton.addEventListener("click", () => {
  const pdfFile = document.getElementById("pdfFile").files[0];
  if (pdfFile) {
    loadPDF(pdfFile);
  } else {
    alert("Please select a PDF file.");
  }
});

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    queueRenderPage(currentPage);
  }
});

nextPageButton.addEventListener("click", () => {
  if (currentPage < pageCount) {
    currentPage++;
    queueRenderPage(currentPage);
  }
});
