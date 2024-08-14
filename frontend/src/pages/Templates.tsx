import Loader from "@/components/layout/Loader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetTemplatesQuery } from "@/redux/api/userApi";
import { handleDownload } from "@/utils/handle-file-download";
import { Download } from "lucide-react";

interface File {
  name: string;
  url: string;
}

const Templates = () => {
  const { data, isLoading, error } = useGetTemplatesQuery({});

  if (error) {
    return <div>Error loading templates.</div>;
  }

  return (
    <div className={`w-full pl-4 pr-4 ${isLoading ? "overflow-hidden" : ""}`}>
      <div className="w-full">
        <h1 className="text-xl border-b-2 w-fit pb-2 border-b-slate-400">
          Templates
        </h1>

        {isLoading ? (
          <div className="mt-10 flex w-full justify-center">
            <Loader />
          </div>
        ) : (
          <div className="xl:w-[50%] w-full">
            <div className="bg-white mt-8">
              <Table>
                <TableBody>
                  {data &&
                    data.templates.map((file: File, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium w-[70%] text-md">
                          {file.name}
                        </TableCell>
                        <TableCell className="flex justify-end">
                          <button
                            onClick={() => handleDownload(file)}
                            className="cursor-pointer"
                          >
                            <Download />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;
