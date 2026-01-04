import { PDFParse } from 'pdf-parse'; // Great for PDFs

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit – adjust as needed for your plan
const SUPPORTED_TYPES = [
  'application/pdf',
  'text/plain',
];

export async function extractTextFromFile(file: File): Promise<string> {
  // Convert Blob (from web) to Buffer if needed
  const buffer = Buffer.from(await file.arrayBuffer());
  console.log(file, file.type)

  // Basic validation
  if (buffer.byteLength > MAX_FILE_SIZE) {
    throw new Error('File too large. Maximum size is 5MB.');
  }

  if (!file.type || !SUPPORTED_TYPES.includes(file.type)) {
    // Fallback: try to infer from name
    const extension = file.name?.split('.').pop()?.toLowerCase();
    if (!extension || !['pdf', 'docx', 'txt', 'doc'].includes(extension)) {
      throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT.');
    }
  }

  let text = '';

  try {
    if (file.type === 'application/pdf' || file.name?.endsWith('.pdf')) {
      const parser = new PDFParse(buffer);
      const result = await parser.getText();
      text = result.text;
    }
    else if (file.type === 'text/plain' || file.name?.endsWith('.txt')) {
      text = new TextDecoder().decode(buffer);
    }
    else {
      throw new Error('Unsupported file format');
    }

    // Clean up the extracted text
    text = text
      .replace(/\r\n/g, '\n')           // Normalize line endings
      .replace(/\s+/g, ' ')             // Collapse multiple spaces/tabs
      .replace(/[^\x20-\x7E\n]/g, '')   // Remove non-printable ASCII (optional)
      .trim();

    if (text.length === 0) {
      throw new Error('No readable text found in the file. Please ensure your resume contains text (not scanned images).');
    }

    // if (text.length < 100) {
    //   throw new Error('Extracted text is too short. This might be a scanned image or protected PDF.');
    // }

    return text;
  } catch (error: any) {
    console.error('Text extraction failed:', error);
    if (error.message.includes('no readable text') || error.message.includes('too short')) {
      throw error; // Re-throw our custom messages
    }
    throw new Error('Failed to extract text from file. Please try a different format or check the file.');
  }
}