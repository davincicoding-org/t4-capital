"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { unlockProductData } from "@/server/requests/prices";

import { cn } from "../utils";

export function ProductLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (password: string) => {
    setLoading(true);
    const { success } = await unlockProductData(password);
    if (success) {
      router.refresh();
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const authForm = useForm({
    defaultValues: {
      password: "",
    },
    onSubmit: async ({ value }) => handleSubmit(value.password),
  });

  return (
    <main className="bg-base-200 fixed inset-0 z-10 flex flex-col">
      <form
        className="m-auto"
        onSubmit={async (event) => {
          event.preventDefault();
          return authForm.handleSubmit(event);
        }}
      >
        <authForm.Field name="password">
          {(field) => (
            // <Tooltip
            //   label={error ? "Invalid password" : ""}
            //   opened={error}
            //   position="bottom-start"
            //   color="red"
            //   transitionProps={{
            //     transition: "pop",
            //     duration: 300,
            //     exitDuration: 0,
            //   }}
            // >
            <div className="relative">
              <input
                className={cn("input input-xl rounded-lg text-center")}
                placeholder="Enter Password"
                type="password"
                disabled={loading}
                // rightSection={loading ? <Loader size="sm" /> : null}
                value={field.state.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                  setError(false);
                }}
              />
              <div
                className={cn(
                  "invisible absolute inset-x-0 mt-2 flex -translate-y-1/2 opacity-0 transition-all duration-700",
                  {
                    "visible translate-y-0 opacity-100": error,
                  },
                )}
              >
                {error && (
                  <div
                    className={cn(
                      "alert alert-error mx-auto rounded-md px-3 py-1",
                    )}
                  >
                    <p className="text-lg tracking-wider">Invalid password</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </authForm.Field>
      </form>
    </main>
  );
}
