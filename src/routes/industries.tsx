import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address, kept so existing links and search results still work.
export const Route = createFileRoute("/industries")({
  beforeLoad: () => {
    throw redirect({ to: "/sectors", statusCode: 301 });
  },
});
