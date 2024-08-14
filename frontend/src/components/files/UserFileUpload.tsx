import { useState } from "react";
import { Button } from "../custom/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "./FileUpload";
import { uploadFilesToFirebaseAndGetUrl } from "@/utils/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFileUploadMutation } from "@/redux/api/userApi";

const fileUploadFormSchema = z.object({
  description: z.string().min(1, { message: "description is required" }),
  type: z.string().min(1, { message: "file type is required" }),
});

const UserFileUpload = () => {
  const form = useForm<z.infer<typeof fileUploadFormSchema>>({
    resolver: zodResolver(fileUploadFormSchema),
    defaultValues: {
      description: "",
      type: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(
    null
  );
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    const fileName = file?.name ?? null;

    // add Extensions like this \.pdf|
    const allowedExtensions = /(\.pdf|\.xls|\.xlsx|\.jpg|\.jpeg|\.png|\.txt)$/i; // Only allow pdf and excel files

    if (file?.name && !allowedExtensions.exec(file?.name)) {
      alert("Invalid file type. Allowed Files are (pdf,excel,jpg,png,txt)");
      setSelectedFile(null);
      setSelectedFilePreview(null);
      return;
    }
    setSelectedFile(file);
    setSelectedFilePreview(fileName);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setSelectedFilePreview(null);
  };

  const [fileUpload, { isLoading }] = useFileUploadMutation();

  const onSubmit = async (formData: z.infer<typeof fileUploadFormSchema>) => {
    if (!selectedFile) {
      toast({
        title: "Please select a file",
        variant: "destructive",
      });
      return;
    }
    setFileUploadLoading(true);
    try {
      const url = await uploadFilesToFirebaseAndGetUrl(
        selectedFile,
        "users-files"
      );

      const body = { ...formData, url };

      const data = await fileUpload(body).unwrap();

      toast({
        title: data?.message,
        variant: "default",
      });
      form.reset();
      setSelectedFile(null);
      setSelectedFilePreview(null);
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

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full bg-white rounded-sm">
          <Form {...form}>
            <form
              className="sm:py-4 sm:px-9 px-5 py-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="mb-6 sm:pt-4 space-y-6">
                <div className="grid w-full items-center gap-2 text-md">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Description</FormLabel>
                        <FormControl>
                          <Input placeholder="file description" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid w-full items-center gap-2 text-md">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a file type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent {...field}>
                            <SelectGroup>
                              <SelectItem value="Account Payable">
                                Account Payable
                              </SelectItem>
                              <SelectItem value="Account Receivable">
                                Account Receivable
                              </SelectItem>
                              <SelectItem value="Bank Statements">
                                Bank Statements
                              </SelectItem>
                              <SelectItem value="Point of Sale Transaction">
                                Point of Sale Transaction
                              </SelectItem>
                              <SelectItem value="Receipt Scans">
                                Receipt Scans
                              </SelectItem>
                              <SelectItem value="Misc.">Misc.</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <label className="mb-5 font-medium block text-md text-[#07074D]">
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
                  Send File
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserFileUpload;
