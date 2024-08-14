import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { handleDownload } from "@/utils/handle-file-download";

export type IFiles = {
  _id: string;
  description: string;
  url: string;
  type: string;
  file_status: string;
};

export const columns: ColumnDef<IFiles>[] = [
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className={cn("flex justify-start")}>
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "File Type",
    cell: ({ row }) => {
      return (
        <div className={cn("flex justify-start")}>{row.getValue("type")}</div>
      );
    },
  },

  {
    accessorKey: "file_status",
    header: "File status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-blue-200": row.getValue("file_status") === "under_review",
            "bg-red-200": row.getValue("file_status") === "processing",
            "bg-orange-200": row.getValue("file_status") === "rejected",
            "bg-green-200": row.getValue("file_status") === "approved",
          })}
        >
          {row.getValue("file_status") === "under_review"
            ? "under review"
            : row.getValue("file_status")}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div
          className="cursor-pointer"
          onClick={() => handleDownload(row.original)}
        >
          <Download />
        </div>
      );
    },
  },
];
