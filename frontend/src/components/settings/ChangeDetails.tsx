import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/userSlice";
import { toast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "../custom/button";
import { DialogClose } from "@/components/ui/dialog";

const profileDetailsChangeSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

const ChangeDetails = () => {
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof profileDetailsChangeSchema>>({
    resolver: zodResolver(profileDetailsChangeSchema),
    defaultValues: {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      companyName: userInfo?.companyName,
      phone: userInfo?.phone,
      email: userInfo?.email,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (
    formData: z.infer<typeof profileDetailsChangeSchema>
  ) => {
    try {
      const data = await updateUserProfile(formData).unwrap();
      dispatch(setUser(data?.userInfo));

      toast({
        title: data?.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "User info change failed",
        description: error?.data?.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Change Your Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid gap-3 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="first name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="last name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="company name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-3 w-full">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone no.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="phone no."
                        {...field}
                        type="number"
                        min={0}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="flex w-full justify-between p-0 pt-4">
              <DialogClose>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button disabled={isLoading} loading={isLoading} type="submit">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangeDetails;
