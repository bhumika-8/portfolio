import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SketchFilters } from "@/components/SketchFilters";
import { PencilCursor } from "@/components/PencilCursor";
import { AmbientLife } from "@/components/AmbientLife";
import { SoundToggle } from "@/components/SoundToggle";
import { BackgroundMusicToggle } from "@/components/BackgroundMusicToggle";
import { SoundProvider } from "@/components/sound";

function NotFoundComponent() {
  return (
    <div className="paper-texture flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-hand text-7xl text-foreground">404</h1>
        <h2 className="font-marker mt-4 text-xl text-foreground">this page wandered off</h2>
        <p className="font-body mt-2 text-sm text-muted-foreground">
          The cat probably ate it. Try going home?
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-sketch sketch-underline">
            ← back to the sketchbook
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="paper-texture flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-hand text-3xl text-foreground">oops — ink smudge</h1>
        <p className="font-body mt-2 text-sm text-muted-foreground">
          Something got scribbled over. Try again?
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-sketch sketch-underline"
          >
            try again
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Sketchbook — a hand-drawn portfolio" },
      {
        name: "description",
        content:
          "A portfolio disguised as a sketchbook. Hand-drawn pages, a running cat inside a wheel, and doodles hiding on every page.",
      },
      { property: "og:title", content: "The Sketchbook — a hand-drawn portfolio" },
      {
        property: "og:description",
        content:
          "A portfolio disguised as a sketchbook. Hand-drawn pages, a running cat, and doodles hiding on every page.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/paw.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Kalam:wght@400;700&family=Patrick+Hand&family=Nunito:wght@400;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        <SketchFilters />
        <PencilCursor />
        <AmbientLife />
        <SoundToggle />
        <BackgroundMusicToggle />
        <Outlet />
      </SoundProvider>
    </QueryClientProvider>
  );
}
