import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster />
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default Providers;
