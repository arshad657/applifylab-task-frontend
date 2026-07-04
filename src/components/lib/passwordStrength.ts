export type PasswordStrength = {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Very weak" | "Weak" | "Fair" | "Strong" | "Very strong";
  percent: number;
};

/**
 * Lightweight, dependency-free password strength heuristic.
 * This is a UX signal only — the authoritative check is the zod schema,
 * which is re-run on the server.
 */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: "Very weak", percent: 0 };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  const clampedScore = Math.min(4, Math.floor((score / 5) * 4)) as
    | 0
    | 1
    | 2
    | 3
    | 4;

  const labels: PasswordStrength["label"][] = [
    "Very weak",
    "Weak",
    "Fair",
    "Strong",
    "Very strong",
  ];

  return {
    score: clampedScore,
    label: labels[clampedScore],
    percent: (clampedScore / 4) * 100,
  };
}
