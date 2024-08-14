import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { useAdminLoginMutation } from "@/redux/api/adminAuthApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { setUser } from "@/redux/features/userSlice";
import { PasswordInput } from "@/components/custom/password-input";

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const AdminLogin = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminLogin, { isLoading, isSuccess }] = useAdminLoginMutation();

  const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
    try {
      const data = await adminLogin(formData).unwrap();
      localStorage.setItem("accessToken", data.token);
      console.log(localStorage.getItem("accessToken"));
      dispatch(setUser(data?.userInfo));
      toast({
        title: data.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.data.error,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/all-users");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden bg-slate-50">
      <div className="w-full">
        <div className="flex items-center justify-center py-12 px-4 sm:px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mx-auto grid w-[400px] gap-6 bg-white sm:p-8 p-6 rounded-md shadow">
                <div className="flex flex-col space-y-2 text-left">
                  <div className="w-full flex justify-center mb-2 items-center">
                    <img
                      src={"/images/gumflow_dark_transparent_croped.png"}
                      alt="Brand logo"
                      className={`overflow-hidden transition-all w-52`}
                    />
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Login
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your email and password below <br />
                    to log into your account
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
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
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel>Password</FormLabel>
                            <Link
                              to="/forgot-password"
                              className="ml-auto inline-block text-sm underline"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                          <FormControl>
                            <PasswordInput placeholder="*******" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button loading={isLoading} className="w-full">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
