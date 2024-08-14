import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { setUser } from "@/redux/features/userSlice";
import { useEffect } from "react";
import { PasswordInput } from "@/components/custom/password-input";
import { Button } from "@/components/custom/button";
import { Card } from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { userInfo } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
    try {
      const data = await login(formData).unwrap();
      if (data?.token) {
        localStorage.setItem("accessToken", data.token);
        dispatch(setUser(data?.userInfo));
        toast({
          title: data.message,
          variant: "default",
        });
      }
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
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden bg-slate-50">
      <div className="w-full grid lg:min-h-[600px] xl:min-h-[800px]">
        <div className="flex justify-center items-center w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex w-full items-center justify-center">
                <Card className="p-6 w-full mx-4 sm:mx-0 sm:w-[370px]">
                  <div className="mx-auto grid gap-6">
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
                                <PasswordInput
                                  placeholder="********"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button loading={isLoading}>Login</Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <Link to="/register" className="underline">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
