import PDFParser from "pdf2json";

export async function extractTextFromFile(file: File): Promise<string> {
  if (!file) throw new Error("No file provided");

  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are supported");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      reject(errData.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        let text = "";

        for (const page of pdfData.Pages) {
          for (const textItem of page.Texts) {
            for (const run of textItem.R) {
              text += decodeURIComponent(run.T) + " ";
            }
          }
          text += "\n\n";
        }

        resolve(text.trim());
      } catch (err) {
        reject(err);
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}
