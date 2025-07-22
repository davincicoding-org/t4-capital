import JSZip from "jszip";

export const generateCsvFile = <T, Column extends keyof T & string>(
  filename: string,
  data: T[],
  columns: (Column | [Column, string])[],
) => {
  const csv = [
    columns.map((column) => {
      if (typeof column === "string") return column;
      return column[1];
    }),
    ...data.map((row) =>
      columns.map((column) => {
        if (typeof column === "string") return row[column];
        return row[column[0]];
      }),
    ),
  ]
    .map((row) => row.join(","))
    .join("\n");

  return new File([csv], `${filename}.csv`, {
    type: "text/csv",
  });
};

export const zipFiles = async (
  folderName: string,
  files: File[],
): Promise<File> => {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(`${folderName}/${file.name}`, file);
  });
  const blob = await zip.generateAsync({ type: "blob" });
  return new File([blob], `${folderName}.zip`, {
    type: "application/zip",
  });
};

export const downloadFile = (file: File) => {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
};
