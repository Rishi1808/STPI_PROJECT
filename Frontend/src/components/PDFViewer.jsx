// src/components/PDFViewer.jsx
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PDFViewer = ({ fileUrl }) => {
  return (
    <div className="border mt-2">
      <Document file={fileUrl} onLoadError={console.error}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
