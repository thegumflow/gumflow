import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export type IRecentActivity = {
  userId?: string;
  activity: string;
  createdAt: string;
  activityStatus: string;
};

export const columns: ColumnDef<IRecentActivity>[] = [
  {
    accessorKey: "activity",
    header: "Activity",
    cell: ({ row }) => {
      return (
        <div className={cn("flex justify-start min-w-[80px]")}>
          {row.getValue("activity")}
        </div>
      );
    },
  },
  {
    accessorKey: "activityStatus",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200":
              row.getValue("activityStatus") === "pending" || "processing",
            "bg-orange-200": row.getValue("activityStatus") === "rejected",
            "bg-green-200": row.getValue("activityStatus") === "approved",
            "bg-blue-200": row.getValue("activityStatus") === "under_review",
          })}
        >
          {row.getValue("activityStatus") === "under_review"
            ? "under review"
            : row.getValue("activityStatus")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className={cn("flex justify-start min-w-[95px]")}>
          {moment(row.getValue("createdAt")).format("MMMM Do YYYY, h:mm a")}
        </div>
      );
    },
  },
];
