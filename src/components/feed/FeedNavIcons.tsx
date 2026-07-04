import Link from "next/link";
import { Home, Users, MessageCircle, Badge } from "lucide-react";

function NavIconLink({
  href,
  label,
  active,
  count,
  children,
}: {
  href: string;
  label: string;
  active?: boolean;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-secondary ${active ? "bg-secondary text-primary" : "text-foreground/70"
        }`}
    >
      {children}
      {typeof count === "number" && count > 0 && (
        <Badge className="absolute -right-0.5 -top-0.5 h-5 min-w-5 justify-center px-1">
          {count}
        </Badge>
      )}
    </Link>
  );
}

export function FeedNavIcons() {
  return (
    <div className="flex items-center gap-1">
      <NavIconLink href="/feed" label="Home" active>
        <Home className="h-5 w-5" />
      </NavIconLink>
      <NavIconLink href="/friend-requests" label="Friend requests" count={6}>
        <Users className="h-5 w-5" />
      </NavIconLink>
      <NavIconLink href="/chat" label="Messages" count={2}>
        <MessageCircle className="h-5 w-5" />
      </NavIconLink>
    </div>
  );
}
