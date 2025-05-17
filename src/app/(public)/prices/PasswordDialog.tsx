"use client";

import { useState } from "react";

import { Alert, Loader, Modal, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { signIn } from "next-auth/react";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export function PasswordDialog({ open }: { open: boolean }) {
  const [password, setPassword] = useInputState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      opened={open}
      onClose={() => void 0}
      centered
      withCloseButton={false}
      classNames={{ body: "space-y-4" }}
    >
      {hasError ? <Alert title="Wrong Password" color="red" /> : null}
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          try {
            setIsLoading(true);
            await signIn("credentials", { password });
            setHasError(false);
          } catch (err) {
            if (isRedirectError(err)) return;
            setHasError(true);
            setIsLoading(false);
          }
        }}
      >
        <TextInput
          size="xl"
          name="password"
          type="password"
          disabled={isLoading}
          rightSection={isLoading ? <Loader size="sm" /> : null}
          autoComplete="off"
          value={password}
          onChange={setPassword}
          placeholder="Enter Password"
        />
      </form>
    </Modal>
  );
}
