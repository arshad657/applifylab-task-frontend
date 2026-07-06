"use client";

import Link from "next/link";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import type { LoginFormValues } from "../lib/validations/loginSchema";

export function RememberMeAndForgotPassword({
  control,
}: {
  control: Control<LoginFormValues>;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <Controller
          name="rememberMe"
          control={control}
          render={({ }) => (
            <></>
            // <Checkbox
            //   id="rememberMe"
            //   checked={field.value}
            //   onCheckedChange={(checked) => field.onChange(checked === true)}
            // />
          )}
        />
        <Label
          htmlFor="rememberMe"
          className="cursor-pointer text-sm font-normal text-muted-foreground"
        >
          Remember me
        </Label>
      </div>
    </div>
  );
}
