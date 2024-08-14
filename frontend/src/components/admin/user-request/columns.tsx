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

export type IUser = {
  _id: string;
  fullName: string;
  email: string;
  companyName: string;
  account_status: "pending" | "approved" | "rejected";
};

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "fullName",
    header: "Full name",
    cell: ({ row }) => {
      return (
        <div className={cn("flex justify-start")}>
          {row.getValue("fullName")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className={cn("flex justify-start")}>{row.getValue("email")}</div>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: "Company name",
    cell: ({ row }) => {
      return (
        <div className={cn("flex justify-start")}>
          {row.getValue("companyName")}
        </div>
      );
    },
  },
  {
    accessorKey: "account_status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("account_status") === "pending",
            "bg-orange-200": row.getValue("account_status") === "rejected",
            "bg-green-200": row.getValue("account_status") === "approved",
          })}
        >
          {row.getValue("account_status")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
