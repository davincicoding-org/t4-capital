import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
import { useCreate, useGetList, useNotify } from "react-admin";
import { Controller, useForm } from "react-hook-form";

import type { security, securityPrice } from "@/database/schema";

export function PricesForm() {
  const notify = useNotify();
  const [createPrice] = useCreate<typeof securityPrice.$inferInsert>();
  const { data: securities } = useGetList<typeof security.$inferSelect>(
    "security",
    {
      sort: { field: "name", order: "ASC" },
    },
  );

  const { reset, handleSubmit, control } = useForm<{
    date: string | null;
    prices: Record<(typeof security.$inferSelect)["id"], number>;
  }>({
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD"),
      prices: {},
    },
  });

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit(async ({ date, prices }) => {
        if (!date) return;

        for (const [securityId, price] of Object.entries(prices)) {
          await createPrice("security_price", {
            data: {
              security: securityId,
              date,
              price,
            },
          });
        }
        reset({
          date: null,
          prices: {},
        });
        notify("Prices saved", { type: "success" });
      })}
    >
      <Box
        sx={{
          display: "inline-flex",
          p: 12,
          flexDirection: "column",
          gap: 2,
          mx: "auto",
          fontFamily: "monospace",
        }}
      >
        <Controller
          name="date"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <input
              type="date"
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
              }}
              value={value ?? ""}
              onChange={(event) => onChange(event.target.value ?? null)}
              {...field}
            />
          )}
        />

        {securities?.map((security) => (
          <Box
            key={security.id}
            sx={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              fontSize: "1.25rem",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "0.75rem",
              }}
            >
              <span>{security.name}</span>
              <span style={{ opacity: 0.5 }}>{security.isin}</span>
            </div>

            <Controller
              name={`prices.${security.id}`}
              control={control}
              rules={{ required: true }}
              render={({
                field: { value, onChange, ...field },
                fieldState: { error },
              }) => (
                <input
                  placeholder="Price"
                  type="number"
                  style={{
                    width: 80,
                    fontSize: "inherit",
                    textAlign: "right",
                    borderColor: error ? "red" : undefined,
                  }}
                  value={value ?? ""}
                  onChange={(event) =>
                    onChange(
                      event.target.value ? parseInt(event.target.value) : null,
                    )
                  }
                  {...field}
                />
              )}
            />
          </Box>
        ))}
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </form>
  );
}
