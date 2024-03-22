import { useEffect } from "react";

const createPrintableContent = (data, columns) => {
  const printableColumns = columns.filter((column) => column.isSortable);

  const tableRows = data
    .map((row) => {
      const rowData = printableColumns.map((column) => `<td>${row[column.accessorKey]}</td>`)
        .join("");
      return `<tr>${rowData}</tr>`;
    })
    .join("");

  return `
      <html>
        <head>
          <title>Printable Table</title>
          <style>
            body { margin: 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${printableColumns
                  .map((column) => `<th>${column.label}</th>`)
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;
};

export default function CustomTablePdfExporter(props) {
  const { data, columns, open, handlePrintMode } = props;

  useEffect(() => {
    let iframe;

    const handlePrint = () => {
      const printableContent = createPrintableContent(data, columns);

      iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const iframeWindow = iframe.contentWindow || iframe.contentDocument;
      const iframeDoc = iframeWindow.document || iframe.contentDocument;
      iframeDoc.open();
      iframeDoc.write(printableContent);
      iframeDoc.close();

      iframe.onload = () => {
        iframeWindow.focus();
        iframeWindow.print();
        handlePrintMode(false);
      };
    };

    if (open) {
      handlePrint();
    }

    return () => {
      if (iframe) {
        document.body.removeChild(iframe);
      }
    };
  }, [open]);

  return null;
}
