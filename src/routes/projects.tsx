import { createFileRoute, redirect } from "@tanstack/react-router";

// Old address, kept so existing links and search results still work.
export const Route = createFileRoute("/projects")({
  beforeLoad: () => {
    throw redirect({ to: "/our-work", statusCode: 301 });
  },
});
