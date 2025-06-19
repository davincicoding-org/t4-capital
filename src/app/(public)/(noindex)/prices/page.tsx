"use client";

import "./globals.css";

import { Loader, Modal, PasswordInput, Tooltip } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import type { ISecurityPricesProps } from "@/ui/views";
import { fetchSecurityByPassword, fetchSecurityData } from "@/server/actions";
import { SecurityPrices } from "@/ui/views";

export default function PricesPage() {
  const authForm = useForm({
    defaultValues: {
      password: "",
    },
    onSubmit: async ({ value }) => mutate(value.password),
  });

  const { data, error, mutate, isPending, reset } = useMutation<
    ISecurityPricesProps,
    Error,
    string
  >({
    mutationFn: async (password: string) => {
      const security = await fetchSecurityByPassword(password);
      if (!security) throw new Error("Invalid password");

      const { prices, returns, performance } =
        await fetchSecurityData(security);
      return {
        isin: security.isin,
        strategy: security.strategy,
        prices,
        returns,
        performance,
      };
    },
  });

  return (
    <main className="container grid min-h-screen py-8 max-sm:px-4">
      <div className="m-auto grid w-full gap-6">
        <Modal
          opened={data === undefined}
          onClose={() => void 0}
          centered
          withCloseButton={false}
          classNames={{ body: "space-y-4 p-0" }}
        >
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              return authForm.handleSubmit(event);
            }}
          >
            <authForm.Field name="password">
              {(field) => (
                <Tooltip
                  label={error?.message}
                  opened={!!error}
                  position="bottom-start"
                  color="red"
                  transitionProps={{
                    transition: "pop",
                    duration: 300,
                    exitDuration: 0,
                  }}
                >
                  <PasswordInput
                    size="xl"
                    placeholder="Enter Password"
                    type="password"
                    disabled={isPending}
                    rightSection={isPending ? <Loader size="sm" /> : null}
                    value={field.state.value}
                    onChange={(event) => {
                      field.handleChange(event.target.value);
                      if (error) reset();
                    }}
                  />
                </Tooltip>
              )}
            </authForm.Field>
          </form>
        </Modal>
        {data && (
          <SecurityPrices
            isin={data.isin}
            strategy={data.strategy}
            prices={data.prices}
            returns={data.returns}
            performance={data.performance}
          />
        )}
      </div>
    </main>
  );
}
