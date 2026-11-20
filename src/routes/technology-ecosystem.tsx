import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address, kept so existing links and search results still work.
export const Route = createFileRoute("/technology-ecosystem")({
  beforeLoad: () => {
    throw redirect({ to: "/partners-platforms", statusCode: 301 });
  },
});
