import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chat Brief — find the signal in your conversations" },
      {
        name: "description",
        content:
          "Turn long chat conversations into a clear AI summary of priorities, decisions, mentions, deadlines, and actions.",
      },
      { property: "og:title", content: "Chat Brief — find the signal in your conversations" },
      {
        property: "og:description",
        content:
          "Turn long chat conversations into a clear AI summary of priorities, decisions, mentions, deadlines, and actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      title="Chat Brief"
      src="/chatbrief/index.html"
      className="block h-screen w-full border-0"
    />
  );
}
