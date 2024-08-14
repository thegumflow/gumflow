import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export type IFiles = {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    companyName: string;
  };
  description: string;
  url: string;
  type: string;
  file_status: string;
};

export const columns: ColumnDef<IFiles>[] = [
  {
    accessorKey: "user.fullName",
    header: "Full Name",
    cell: ({ row }) => {
      const user = row.original;
      const fullName = user.user.fullName;
      return <div className={cn("flex justify-start")}>{fullName}</div>;
    },
  },
  {
    accessorKey: "user.companyName",
    header: "Company Name",
    cell: ({ row }) => {
      const user = row.original;
      const companyName = user.user.companyName;
      return <div className={cn("flex justify-start")}>{companyName}</div>;
    },
  },
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
      const file = row.original;
      const user = row.original.user;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/admin/user-details/${user._id}`}>
                View User Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href={file.url} download className="cursor-pointer">
                Download file
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/admin/file/${file._id}`}>View File Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
