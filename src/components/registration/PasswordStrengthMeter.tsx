"use client";

import { getPasswordStrength } from "../lib/passwordStrength";
import { Progress } from "../ui/progress";
import { cn } from "../lib/utils";

const STRENGTH_COLORS: Record<number, string> = {
  0: "bg-destructive",
  1: "bg-destructive",
  2: "bg-amber-500",
  3: "bg-emerald-500",
  4: "bg-success",
};

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;

  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2 space-y-1.5" aria-live="polite">
      <Progress
        value={strength.percent}
        // indicatorClassName={cn(STRENGTH_COLORS[strength.score])}
        aria-label="Password strength"
      />
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-medium">{strength.label}</span>
      </p>
    </div>
  );
}
