"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { RegisterFormValues } from "../lib/validations/registerSchema";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function TermsCheckbox({
  control,
  errors,
}: {
  control: Control<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
}) {
  return (
    <div className="space-y-3">
      <Controller
        name="agreeToTerms"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value ? "agree" : "disagree"}
            onValueChange={(value) => field.onChange(value === "agree")}
            className="flex flex-col gap-3"
            aria-invalid={!!errors.agreeToTerms}
            aria-describedby={
              errors.agreeToTerms ? "agreeToTerms-error" : undefined
            }
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="agree" id="terms-agree" />
              <Label
                htmlFor="terms-agree"
                className="cursor-pointer text-base font-normal text-color2 !mb-0"
              >
                I agree to terms &amp; conditions
              </Label>
            </div>
          </RadioGroup>
        )}
      />
      {errors.agreeToTerms && (
        <p
          id="agreeToTerms-error"
          role="alert"
          className="mt-1.5 text-xs text-destructive"
        >
          {errors.agreeToTerms.message}
        </p>
      )}
    </div>
  );
}
