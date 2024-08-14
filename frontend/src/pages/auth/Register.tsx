import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { setUser } from "@/redux/features/userSlice";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/custom/password-input";

const registerSchema = z.object({
  firstName: z.string().min(1, { message: "first name is required" }),
  lastName: z.string().min(1, { message: "last name is required" }),
  companyName: z.string().min(1, { message: "company name is required" }),
  phone: z.string().optional(),
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be atleast 6 character" }),
});

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const onSubmit = async (formData: z.infer<typeof registerSchema>) => {
    try {
      const data = await register(formData).unwrap();
      localStorage.setItem("accessToken", data?.token);
      dispatch(setUser(data?.userInfo));

      toast({
        title: "Register Success",
        description: data?.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "SignUp Failed",
        description: error?.data?.error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-50">
      <Card className="p-6 w-full sm:w-fit sm:p-4 mx-4 sm:mx-0">
        <div className="mb-2 flex flex-col space-y-2 text-left">
          <div className="w-full flex justify-center mb-2 items-center">
            <img
              src={"/images/gumflow_dark_transparent_croped.png"}
              alt="Brand logo"
              className={`overflow-hidden transition-all w-56`}
            />
          </div>
          <h1 className="text-lg font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create an account <br />
          </p>
        </div>
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
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input placeholder="company name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="*******" {...field} />
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

            <div className="checkbox flex items-center pt-2 pb-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:opacity-70"
              >
                &nbsp; Accept terms and conditions
              </label>
            </div>

            <div>
              <Button type="submit" loading={isLoading} className="w-full">
                Create an account
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
