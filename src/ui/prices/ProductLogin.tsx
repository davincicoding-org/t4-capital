"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader, Modal, PasswordInput, Tooltip } from "@mantine/core";
import { useForm } from "@tanstack/react-form";

import { unlockProductData } from "@/server/actions";

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
    <Modal
      opened
      onClose={() => void 0}
      fullScreen
      withCloseButton={false}
      withOverlay={false}
      transitionProps={{
        transition: "fade",
        duration: 500,
      }}
      classNames={{
        body: "space-y-4 p-0 !container flex flex-col h-full",
        content: "bg-white",
      }}
    >
      <form
        className="my-auto"
        onSubmit={async (event) => {
          event.preventDefault();
          return authForm.handleSubmit(event);
        }}
      >
        <authForm.Field name="password">
          {(field) => (
            <Tooltip
              label={error ? "Invalid password" : ""}
              opened={error}
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
                radius="md"
                classNames={{
                  root: "max-w-xs mx-auto",
                  input: "border-2",
                }}
                placeholder="Enter Password"
                type="password"
                disabled={loading}
                rightSection={loading ? <Loader size="sm" /> : null}
                value={field.state.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                  setError(false);
                }}
              />
            </Tooltip>
          )}
        </authForm.Field>
      </form>
    </Modal>
  );
}
