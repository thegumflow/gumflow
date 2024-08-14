import { Button } from "@/components/custom/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/custom/password-input";
import { useUpdatePasswordMutation } from "@/redux/api/authApi";

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Password should be atleast 6 character" }),
    newPassword: z
      .string()
      .min(6, { message: "Password should be atleast 6 character" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password should be atleast 6 character" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
    },
  });

  const formValues = form.watch();

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const onSubmit = async (formData: z.infer<typeof changePasswordSchema>) => {
    try {
      const data = await updatePassword(formData).unwrap();
      toast({
        title: data?.message,
        variant: "default",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Password change failed",
        description: error?.data?.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="p-5 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="*******" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="*******" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="*******" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex w-full justify-between p-0 pt-4">
                {formValues.confirmPassword ||
                formValues.newPassword ||
                formValues.oldPassword ? (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                ) : (
                  <div></div>
                )}

                <Button disabled={isLoading} loading={isLoading}>
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
