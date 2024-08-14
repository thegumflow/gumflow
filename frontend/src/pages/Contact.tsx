import { Button } from "@/components/custom/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useEmailSendToAdminMutation } from "@/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  issue: z.string().min(1, { message: "issue is required" }),
  phone: z.string().min(1, { message: "phone no. is required" }),
  message: z.string().min(1, { message: "message is required" }),
});

const Contact = () => {
  const [emailSendToAdmin, { isLoading }] = useEmailSendToAdminMutation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      issue: "",
      message: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
    try {
      const data = await emailSendToAdmin(formData).unwrap();
      toast({
        title: data.message,
        variant: "default",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "There was a error in sending email",
        description: error.data.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="ml-4 mr-4 mt-1">
      <section className="bg-white dark:bg-gray-900 pl-4 pr-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pb-8 pt-4 lg:pt-6 lg:pb-16 px-4 mx-auto max-w-screen-md space-y-4">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                Contact Us
              </h2>
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                Got a technical issue? Want to send feedback? Need details about
                our Business plan? Let us know.
              </p>

              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="issue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue</FormLabel>
                      <FormControl>
                        <Input placeholder="issue" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="phone no." {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea rows={7} placeholder="message" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button loading={isLoading} disabled={isLoading} type="submit">
                Send message
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default Contact;
