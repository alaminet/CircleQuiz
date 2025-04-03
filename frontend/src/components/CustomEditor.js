"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Alignment,
  Essentials,
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  CloudServices,
  FontSize,
  FontFamily,
  Heading,
  Highlight,
  Image,
  ImageUpload,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TableColumnResize,
  Underline,
} from "ckeditor5";
import MathType from "@wiris/mathtype-ckeditor5/dist/index.js";

const CustomEditor = ({ onChange, defaultData }) => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          onChange(editor.getData());
        }}
        config={{
          licenseKey: "GPL", // Or 'GPL'.
          plugins: [
            CloudServices,
            MathType,
            Essentials,
            Alignment,
            Autoformat,
            Bold,
            Italic,
            BlockQuote,
            FontFamily,
            FontSize,
            Heading,
            Highlight,
            Image,
            ImageUpload,
            Link,
            List,
            Paragraph,
            PasteFromOffice,
            Strikethrough,
            Table,
            TableCaption,
            TableCellProperties,
            TableProperties,
            TableToolbar,
            TableColumnResize,
            Underline,
          ],
          toolbar: {
            items: [
              // 'heading',
              // '|',
              // 'fontsize',
              // 'fontfamily',
              // '|',
              "bold",
              "italic",
              "underline",
              // 'strikethrough',
              // 'highlight',
              "|",
              // 'alignment',
              // '|',
              "numberedList",
              "bulletedList",
              "|",
              "MathType",
              "ChemType",
              "|",
              "insertTable",
              "undo",
              "redo",
            ],
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
              "toggleTableCaption",
            ],
            tableToolbar: ["bold", "italic"],
          },
          initialData: defaultData || "",
        }}
      />
    </>
  );
};

export default CustomEditor;
