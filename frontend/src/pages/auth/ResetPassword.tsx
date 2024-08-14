import { PasswordInput } from "@/components/custom/password-input";
import { Button } from "@/components/custom/button";
import { Label } from "@/components/ui/label";
import {
  useIsValidPasswordResetTokenQuery,
  useResetPasswordMutation,
} from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");

  const [resetPassword, { isLoading, error, isError }] =
    useResetPasswordMutation();

  const { token } = useParams();

  const submitHandler = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password don't match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 5) {
      toast({
        title: "Password length should be at least 6 character",
        variant: "destructive",
      });

      return;
    }

    const res = await resetPassword({
      body: { newPassword, confirmPassword },
      token,
    });
    toast({
      title: res?.data.message,
    });
  };

  useEffect(() => {
    if (isError) {
      toast({
        // @ts-expect-error message
        title: error?.data?.error,
        variant: "destructive",
      });
    }
  }, [isError, error]);

  const { isError: IsValidIsError, error: IsValidError } =
    useIsValidPasswordResetTokenQuery({ token });

  useEffect(() => {
    if (IsValidIsError) {
      toast({
        // @ts-expect-error message
        title: IsValidError?.data?.error,
        variant: "destructive",
      });
    }
  }, [IsValidIsError, IsValidError]);

  return (
    <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
      <div className="w-full h-full bg-slate-50">
        <div className="w-full  xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12 bg-slate-50">
            <div className="mx-auto grid w-[350px] gap-6 ">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Reset Password</h1>
                <p className="text-balance text-muted-foreground">
                  Enter new password for your account
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>
                  <PasswordInput
                    id="password"
                    placeholder="*********"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cpassword">Confirm Password</Label>
                  <PasswordInput
                    id="cpassword"
                    placeholder="*********"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfrimPassword(e.target.value)}
                  />
                </div>

                <Button
                  disabled={isLoading}
                  loading={isLoading}
                  type="submit"
                  className="w-full"
                  onClick={() => submitHandler()}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
