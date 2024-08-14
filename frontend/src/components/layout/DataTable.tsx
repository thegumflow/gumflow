import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import PaginationComponent from "./PaginationComponent";
import Loader from "./Loader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
  searchValue?: string;
  setSearchPreview?: React.Dispatch<React.SetStateAction<string>>;
  searchPreview?: string;
  dataStatus: string;
  showTotal?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  currentPage,
  setCurrentPage,
  setSearchValue,
  setSearchPreview,
  searchPreview,
  dataStatus,
  showTotal = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const isSearch =
    setSearchValue && setSearchPreview && searchPreview !== undefined;

  return (
    <div className="w-full text-start">
      <div
        className={`flex items-center ${
          isSearch ? "justify-between py-4" : "justify-end"
        }  `}
      >
        {isSearch && (
          <Input
            placeholder="Filter..."
            className="sm:max-w-sm focus-visible:ring-offset-0 w-[60%]"
            onChange={(e) => {
              setSearchPreview(e.target.value);
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            value={searchPreview}
          />
        )}
        {showTotal === true && data !== undefined ? (
          <div
            className={`px-4 py-2 bg-white rounded-md mb-4 ${
              isSearch ? "" : "shadow-sm"
            }"`}
          >
            <span>Total : {total}</span>
          </div>
        ) : null}
      </div>
      <div className="">
        <Table className="bg-white rounded-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {dataStatus === "pending" || !data ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex w-full h-full px-8 py-8 justify-center items-center">
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {total > 10 && dataStatus !== "pending" && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <PaginationComponent
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={total}
            perPage={10}
            showItem={3}
          />
        </div>
      )}
    </div>
  );
}
