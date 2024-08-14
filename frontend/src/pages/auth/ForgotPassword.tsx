import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  const submitHandler = async () => {
    try {
      const res = await forgotPassword({ email });
      toast({
        title: res?.data.message,
      });
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: error?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <div className="w-full h-full bg-slate-50">
        <div className="w-full  xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12 bg-slate-50">
            <div className="mx-auto grid w-[350px] gap-6 ">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Forgot Password</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email address to receive a password reset link
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>

                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  className="w-full"
                  onClick={() => submitHandler()}
                >
                  Send Email
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                <Link to="/login" className="underline">
                  Go to login page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
