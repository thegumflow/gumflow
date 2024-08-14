import FileUpload from "@/components/files/FileUpload";
import Loader from "@/components/layout/Loader";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  useDeleteTemplatesMutation,
  useGetAdminTemplatesQuery,
  useUploadTemplateMutation,
} from "@/redux/api/adminUserApi";
import { uploadFilesToFirebaseAndGetUrl } from "@/utils/file-upload";
import { FormEvent, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Download, X } from "lucide-react";
import { handleDownload } from "@/utils/handle-file-download";

const UploadTemplate = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(
    null
  );
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const { data, isLoading: isTemplatesLoading } = useGetAdminTemplatesQuery({});

  const [uploadTemplate, { isLoading }] = useUploadTemplateMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    const fileName = file?.name ?? null;
    setSelectedFile(file);
    setSelectedFilePreview(fileName);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setSelectedFilePreview(null);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Please select a file",
        variant: "destructive",
      });
      return;
    }
    if (!name) {
      toast({
        title: "Please enter a title",
        variant: "destructive",
      });
      return;
    }
    setFileUploadLoading(true);
    try {
      const url = await uploadFilesToFirebaseAndGetUrl(
        selectedFile,
        "templates"
      );

      const body = { name, url };

      const data = await uploadTemplate(body).unwrap();

      toast({
        title: data?.message,
        variant: "default",
      });

      handleFileRemove();
      setName("");
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        title: "file upload failed",
        description: error.data.error,
        variant: "destructive",
      });
    } finally {
      setSelectedFile(null);
      setSelectedFilePreview(null);
      setFileUploadLoading(false);
    }
  };

  const [deleteTemplates, { isLoading: templateDeleteLoading }] =
    useDeleteTemplatesMutation();

  async function deleteTemplateHandler(template: any) {
    const confirmation = confirm(
      `Are you sure you want to delete this template (${template.name})`
    );

    if (confirmation) {
      deleteTemplates({ templateId: template._id });
    }
  }

  return (
    <div className="w-full pl-4 pr-4">
      <div className="w-full">
        <h1 className="text-xl border-b-2 w-fit pb-2 border-b-slate-400">
          Upload Templates
        </h1>
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="sm:w-1/2 w-full">
            <form onSubmit={onSubmit}>
              <div className="bg-white mt-8 p-8 rounded-sm">
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 font-medium text-md">
                    <Label htmlFor="name" className="font-medium text-md">
                      Title
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="title"
                    />
                  </div>

                  <div>
                    <label className="mb-4 font-medium block text-md text-[#07074D]">
                      Upload a file
                    </label>
                    <FileUpload handleFileChange={handleFileChange} />
                    {selectedFilePreview && (
                      <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                        <div className="flex items-center justify-between">
                          <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                            {selectedFilePreview}
                          </span>
                          <button
                            className="text-[#07074D]"
                            onClick={handleFileRemove}
                          >
                            <svg
                              width={10}
                              height={10}
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Button
                      loading={isLoading || fileUploadLoading}
                      disabled={isLoading || fileUploadLoading}
                      type="submit"
                    >
                      Upload Template
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="sm:w-1/2 w-full">
            <h2 className="text-md mt-8 bg-white w-full p-4 border-b-slate-400 rounded-sm">
              All Templates
            </h2>
            {isTemplatesLoading || templateDeleteLoading ? (
              <div className="mt-10 flex w-full justify-center">
                <Loader />
              </div>
            ) : (
              <div className="w-full">
                <div className="bg-white mt-4 rounded-sm">
                  <Table>
                    <TableBody>
                      {data &&
                        data.templates.map((template: any, i: number) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium w-[70%] text-md">
                              {template.name}
                            </TableCell>
                            <TableCell className="flex justify-end">
                              <div className="flex gap-6">
                                <button
                                  onClick={() =>
                                    deleteTemplateHandler(template)
                                  }
                                  className="cursor-pointer"
                                >
                                  <X />
                                </button>
                                <button
                                  onClick={() => handleDownload(template)}
                                  className="cursor-pointer"
                                >
                                  <Download />
                                </button>
                              </div>
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
      </div>
    </div>
  );
};

export default UploadTemplate;
