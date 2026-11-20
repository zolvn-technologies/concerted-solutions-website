import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address, kept so existing links and search results still work.
export const Route = createFileRoute("/how-we-deliver")({
  beforeLoad: () => {
    throw redirect({ to: "/approach", statusCode: 301 });
  },
});
