var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = {};
__export(entry_server_node_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  return userAgent ? "isbot" in isbotModule && typeof isbotModule.isbot == "function" ? isbotModule.isbot(userAgent) : "default" in isbotModule && typeof isbotModule.default == "function" ? isbotModule.default(userAgent) : !1 : !1;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 66,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "node_modules/@remix-run/dev/dist/config/defaults/entry.server.node.tsx",
          lineNumber: 116,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-LR56NM2Z.css";

// app/root.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "ReValidate - Strengthen Scientific Integrity" },
  {
    name: "description",
    content: "Our platform enables researchers to verify, replicate, and strengthen scientific studies with transparent methodologies."
  }
];
function links() {
  return [{ rel: "stylesheet", href: tailwind_default }];
}
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
import { Link } from "@remix-run/react";

// app/components/ui/button.tsx
import * as React from "react";
import { cva } from "class-variance-authority";

// app/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// app/components/ui/button.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
    "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/button.tsx",
      lineNumber: 45,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/components/ui/card.tsx
import * as React2 from "react";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var Card = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 8,
    columnNumber: 3
  },
  this
));
Card.displayName = "Card";
var CardHeader = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 23,
    columnNumber: 3
  },
  this
));
CardHeader.displayName = "CardHeader";
var CardTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 35,
    columnNumber: 3
  },
  this
));
CardTitle.displayName = "CardTitle";
var CardDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  "p",
  {
    ref,
    className: cn("text-sm text-slate-500 dark:text-slate-400", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 50,
    columnNumber: 3
  },
  this
));
CardDescription.displayName = "CardDescription";
var CardContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV4("div", { ref, className: cn("p-6 pt-0", className), ...props }, void 0, !1, {
  fileName: "app/components/ui/card.tsx",
  lineNumber: 62,
  columnNumber: 3
}, this));
CardContent.displayName = "CardContent";
var CardFooter = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/card.tsx",
    lineNumber: 70,
    columnNumber: 3
  },
  this
));
CardFooter.displayName = "CardFooter";

// app/components/ui/separator.tsx
import * as React3 from "react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var Separator = React3.forwardRef(
  ({ className, orientation = "horizontal", decorative = !0, ...props }, ref) => /* @__PURE__ */ jsxDEV5(
    "div",
    {
      ref,
      className: cn(
        "shrink-0 bg-slate-200 dark:bg-slate-800",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props,
      role: decorative ? "none" : "separator",
      "aria-orientation": decorative ? void 0 : orientation
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/separator.tsx",
      lineNumber: 14,
      columnNumber: 5
    },
    this
  )
);
Separator.displayName = "Separator";

// app/routes/_index.tsx
import {
  ArrowRight,
  CheckCircle,
  FileCheck,
  BarChart3,
  Users,
  Search,
  Shield,
  Clock,
  Trophy,
  Star
} from "lucide-react";

// app/components/ui/EvervaultCard.tsx
import { useMotionValue } from "motion/react";
import { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "motion/react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var EvervaultCard = ({
  text,
  className
}) => {
  let mouseX = useMotionValue(0), mouseY = useMotionValue(0), [randomString, setRandomString] = useState("");
  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);
  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left), mouseY.set(clientY - top);
    let str = generateRandomString(1500);
    setRandomString(str);
  }
  return /* @__PURE__ */ jsxDEV6(
    "div",
    {
      className: cn(
        "p-0.5  bg-transparent aspect-square  flex items-center justify-center w-full h-full relative",
        className
      ),
      children: /* @__PURE__ */ jsxDEV6(
        "div",
        {
          onMouseMove,
          className: "group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full",
          children: [
            /* @__PURE__ */ jsxDEV6(
              CardPattern,
              {
                mouseX,
                mouseY,
                randomString
              },
              void 0,
              !1,
              {
                fileName: "app/components/ui/EvervaultCard.tsx",
                lineNumber: 44,
                columnNumber: 9
              },
              this
            ),
            /* @__PURE__ */ jsxDEV6("div", { className: "relative z-10 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV6("div", { className: "relative h-20 w-25 flex items-center justify-center text-white font-bold text-4xl p-4", children: [
              /* @__PURE__ */ jsxDEV6("div", { className: "absolute w-full h-full bg-white/[0.5] dark:bg-black/[0.8] blur-sm rounded-2xl" }, void 0, !1, {
                fileName: "app/components/ui/EvervaultCard.tsx",
                lineNumber: 51,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV6("span", { className: "dark:text-white text-black z-20 center text-3xl px-2 py-1", children: text }, void 0, !1, {
                fileName: "app/components/ui/EvervaultCard.tsx",
                lineNumber: 52,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/ui/EvervaultCard.tsx",
              lineNumber: 50,
              columnNumber: 11
            }, this) }, void 0, !1, {
              fileName: "app/components/ui/EvervaultCard.tsx",
              lineNumber: 49,
              columnNumber: 9
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/ui/EvervaultCard.tsx",
          lineNumber: 40,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
};
function CardPattern({ mouseX, mouseY, randomString }) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`, style = { maskImage, WebkitMaskImage: maskImage };
  return /* @__PURE__ */ jsxDEV6("div", { className: "pointer-events-none", children: [
    /* @__PURE__ */ jsxDEV6("div", { className: "absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" }, void 0, !1, {
      fileName: "app/components/ui/EvervaultCard.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(
      motion.div,
      {
        className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500",
        style
      },
      void 0,
      !1,
      {
        fileName: "app/components/ui/EvervaultCard.tsx",
        lineNumber: 69,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV6(
      motion.div,
      {
        className: "absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100",
        style,
        children: /* @__PURE__ */ jsxDEV6("p", { className: "absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500", children: randomString }, void 0, !1, {
          fileName: "app/components/ui/EvervaultCard.tsx",
          lineNumber: 77,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/ui/EvervaultCard.tsx",
        lineNumber: 73,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/ui/EvervaultCard.tsx",
    lineNumber: 67,
    columnNumber: 5
  }, this);
}
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", generateRandomString = (length) => {
  let result = "";
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length)).repeat(Math.ceil(100 / length) * 5);
  return result;
};

// app/routes/_index.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
function Index() {
  return /* @__PURE__ */ jsxDEV7("div", { className: "min-h-screen bg-white text-slate-900", children: [
    /* @__PURE__ */ jsxDEV7("header", { className: "sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto py-4 px-4 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV7(FileCheck, { className: "h-8 w-8 text-indigo-600" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 30,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("span", { className: "font-semibold text-xl tracking-tight", children: "ReValidate" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 31,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("nav", { className: "hidden md:flex items-center gap-8", children: [
        /* @__PURE__ */ jsxDEV7(
          Link,
          {
            to: "#features",
            className: "text-slate-600 hover:text-indigo-600 transition text-sm font-medium",
            children: "features"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 36,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(
          Link,
          {
            to: "#how-it-works",
            className: "text-slate-600 hover:text-indigo-600 transition text-sm font-medium",
            children: "how it works"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 42,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(
          Link,
          {
            to: "#testimonials",
            className: "text-slate-600 hover:text-indigo-600 transition text-sm font-medium",
            children: "testimonials"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 48,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV7(
          Link,
          {
            to: "#pricing",
            className: "text-slate-600 hover:text-indigo-600 transition text-sm font-medium",
            children: "pricing"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 54,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7(Button, { className: "bg-indigo-600 hover:bg-indigo-700 shadow-sm", children: [
        "Get started",
        /* @__PURE__ */ jsxDEV7(ArrowRight, { className: "ml-2 h-4 w-4" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 63,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("section", { className: "relative overflow-hidden bg-slate-50 py-21", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "container relative mx-auto py-15 px-4", children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "max-w-3xl mx-auto text-center", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-6 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ jsxDEV7("span", { children: "Science that stands the test of time" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 74,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 73,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV7("h1", { className: "text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500 leading-tight", children: "Restore trust in science through rigorous revalidation" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 76,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-xl text-slate-600 mb-8 leading-relaxed", children: "The replication crisis undermines scientific credibility. Our platform enables researchers to verify, replicate, and strengthen scientific studies with transparent methodologies." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 79,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-lg font-medium mb-10 text-indigo-600", children: "Validate findings. Build confidence. Advance science." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 84,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mb-16", children: [
            /* @__PURE__ */ jsxDEV7(
              Button,
              {
                size: "lg",
                className: "bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full px-8",
                children: [
                  "Start revalidating",
                  /* @__PURE__ */ jsxDEV7(ArrowRight, { className: "ml-2 h-5 w-5" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 93,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 88,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full px-8",
                children: [
                  "See how it works",
                  /* @__PURE__ */ jsxDEV7(CheckCircle, { className: "ml-2 h-5 w-5" }, void 0, !1, {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 101,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 95,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 87,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "rounded-xl bg-white border border-slate-200 p-8 mb-12 shadow-sm hover:shadow-md transition-shadow duration-300", children: [
            /* @__PURE__ */ jsxDEV7("div", { className: "aspect-video bg-slate-50 rounded-lg flex items-center justify-center mb-6 overflow-hidden relative border border-slate-100", children: [
              /* @__PURE__ */ jsxDEV7("div", { className: "absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 106,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV7("div", { className: "z-10 flex flex-col items-center", children: [
                /* @__PURE__ */ jsxDEV7(FileCheck, { className: "h-16 w-16 text-indigo-200 mb-3" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 108,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV7("span", { className: "text-slate-400", children: "Dashboard preview: Grayscale interface with indigo highlights for actions and progress indicators" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 109,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 107,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 105,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-wrap justify-center gap-8 items-center", children: [
              /* @__PURE__ */ jsxDEV7("span", { className: "text-sm text-slate-500 font-medium", children: "Trusted by" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 116,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-wrap gap-8 justify-center", children: [
                /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Stanford University" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 120,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Nature" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 123,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Science Foundation" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 126,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "MIT" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 129,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "OSF" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 132,
                  columnNumber: 19
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 119,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 115,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 104,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 72,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "text-center max-w-xl mx-auto", children: [
          /* @__PURE__ */ jsxDEV7("p", { className: "text-lg font-medium text-slate-700 mb-4", children: "Transform hypothesis to verified knowledge in a transparent, collaborative ecosystem" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 140,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDEV7("div", { className: "p-3 bg-indigo-50 rounded-full", children: /* @__PURE__ */ jsxDEV7(BarChart3, { className: "h-8 w-8 text-indigo-600" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 146,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 145,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 144,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 139,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("section", { id: "features", className: "py-24 bg-white", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ jsxDEV7("span", { children: "Why choose us" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 158,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 157,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("h2", { className: "text-3xl font-bold mb-4", children: "Why researchers choose ReValidate" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 160,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 max-w-2xl mx-auto", children: "Our platform provides the tools and framework needed to ensure scientific integrity" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 163,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 156,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxDEV7(Card, { className: "p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors", children: /* @__PURE__ */ jsxDEV7(Search, { className: "h-8 w-8 text-indigo-600" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 172,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 171,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("h3", { className: "text-xl font-semibold mb-3", children: "Transparent Methodology" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 174,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-6 leading-relaxed", children: "Detailed protocols and complete methodologies ensure true replicability and build trust in the scientific community." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 177,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(
            Button,
            {
              variant: "ghost",
              className: "text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform",
              children: [
                "Learn more ",
                /* @__PURE__ */ jsxDEV7(ArrowRight, { className: "ml-1 h-4 w-4" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 185,
                  columnNumber: 30
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 181,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 170,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 169,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7(Card, { className: "p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors", children: /* @__PURE__ */ jsxDEV7(Shield, { className: "h-8 w-8 text-indigo-600" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 192,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 191,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("h3", { className: "text-xl font-semibold mb-3", children: "Verification Framework" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 194,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-6 leading-relaxed", children: "Standardized protocols and statistical tools to verify or challenge existing research with confidence and accuracy." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 197,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(
            Button,
            {
              variant: "ghost",
              className: "text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform",
              children: [
                "Learn more ",
                /* @__PURE__ */ jsxDEV7(ArrowRight, { className: "ml-1 h-4 w-4" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 205,
                  columnNumber: 30
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 201,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 190,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 189,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7(Card, { className: "p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors", children: /* @__PURE__ */ jsxDEV7(Users, { className: "h-8 w-8 text-indigo-600" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 212,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 211,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("h3", { className: "text-xl font-semibold mb-3", children: "Collaborative Network" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 214,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-6 leading-relaxed", children: "Connect with peers for independent validation and strengthen the scientific community through collective expertise." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 217,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7(
            Button,
            {
              variant: "ghost",
              className: "text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform",
              children: [
                "Learn more ",
                /* @__PURE__ */ jsxDEV7(ArrowRight, { className: "ml-1 h-4 w-4" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 225,
                  columnNumber: 30
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 221,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 210,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 209,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 168,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 155,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 154,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("section", { className: "flex flex-col items-center py-0 px-0 bg-white w-full min-h-[350px]", children: /* @__PURE__ */ jsxDEV7("div", { className: "w-full h-[350px] md:h-[420px] flex items-center justify-center", children: /* @__PURE__ */ jsxDEV7(
      EvervaultCard,
      {
        text: "Bringing trust with math",
        className: "w-full h-full"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/_index.tsx",
        lineNumber: 236,
        columnNumber: 11
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 235,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 234,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("section", { id: "how-it-works", className: "py-24 bg-slate-50", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ jsxDEV7("span", { children: "The process" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 248,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 247,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("h2", { className: "text-3xl font-bold mb-4", children: "Revalidation in three simple steps" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 250,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("p", { className: "text-lg text-slate-600 max-w-2xl mx-auto", children: "Our structured approach ensures consistency and reliability across all revalidation projects." }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 253,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 246,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative", children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-indigo-100 -translate-y-1/2 z-0" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 259,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md", children: /* @__PURE__ */ jsxDEV7("span", { className: "text-indigo-600 font-bold text-lg", children: "1" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 262,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 261,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("h3", { className: "text-xl font-semibold mb-3", children: "Submit Study" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 264,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-4 leading-relaxed", children: "Upload original research data and methodology for revalidation through our secure platform." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 265,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "p-2 bg-white rounded-full shadow-sm", children: /* @__PURE__ */ jsxDEV7(Search, { className: "h-6 w-6 text-indigo-600" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 270,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 269,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 260,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md", children: /* @__PURE__ */ jsxDEV7("span", { className: "text-indigo-600 font-bold text-lg", children: "2" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 275,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 274,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("h3", { className: "text-xl font-semibold mb-3", children: "Verify Process" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 277,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-4 leading-relaxed", children: "Independent researchers replicate experiments following standardized protocols with complete transparency." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 278,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "p-2 bg-white rounded-full shadow-sm", children: /* @__PURE__ */ jsxDEV7(Clock, { className: "h-6 w-6 text-indigo-600" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 283,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 282,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 273,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md", children: /* @__PURE__ */ jsxDEV7("span", { className: "text-indigo-600 font-bold text-lg", children: "3" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 288,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 287,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("h3", { className: "text-xl font-semibold mb-3", children: "Publish Results" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 290,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-4 leading-relaxed", children: "Receive detailed revalidation reports with confidence metrics and recommendations for improvement." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 291,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "p-2 bg-white rounded-full shadow-sm", children: /* @__PURE__ */ jsxDEV7(Trophy, { className: "h-6 w-6 text-indigo-600" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 296,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 295,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 286,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 258,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsxDEV7(Button, { className: "bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full px-8", children: [
        "Start the revalidation process",
        /* @__PURE__ */ jsxDEV7(ArrowRight, { className: "ml-2 h-4 w-4" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 303,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 301,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 300,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 245,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 244,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("section", { className: "py-20 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxDEV7("h2", { className: "text-2xl md:text-3xl font-bold mb-6", children: "Strengthen the foundation of scientific knowledge" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 312,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7(
        Button,
        {
          size: "lg",
          className: "bg-white text-indigo-700 hover:bg-slate-100 shadow-lg rounded-full px-8",
          children: "Join the revalidation movement"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 315,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 311,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 310,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("section", { id: "testimonials", className: "py-24 bg-white", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ jsxDEV7("span", { children: "Testimonials" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 329,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 328,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("h2", { className: "text-3xl font-bold mb-4", children: "What researchers are saying" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 331,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 max-w-2xl mx-auto", children: "Hear from scientists who have strengthened their research through our platform" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 334,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 327,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxDEV7(Card, { className: "p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxDEV7("div", { className: "w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm", children: /* @__PURE__ */ jsxDEV7("span", { className: "text-indigo-600 font-medium", children: "JD" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 344,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 343,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7("div", { children: [
              /* @__PURE__ */ jsxDEV7("h4", { className: "font-semibold", children: "Dr. Jane Doe" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 347,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7("p", { className: "text-sm text-slate-500", children: "Neuroscience Professor" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 348,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 346,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 342,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "mb-4 text-indigo-50 relative", children: /* @__PURE__ */ jsxDEV7("div", { className: "absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3", children: /* @__PURE__ */ jsxDEV7(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "w-8 h-8 opacity-20",
              children: [
                /* @__PURE__ */ jsxDEV7("path", { d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 367,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV7("path", { d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 368,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 355,
              columnNumber: 21
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 354,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 353,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-6 leading-relaxed", children: '"ReValidate helped confirm our key findings while identifying important methodological improvements. Our work is now stronger and more credible."' }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 372,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex text-indigo-500 mt-auto", children: [
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 378,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 379,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 380,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 381,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 382,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 377,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 341,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 340,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7(Card, { className: "p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxDEV7("div", { className: "w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm", children: /* @__PURE__ */ jsxDEV7("span", { className: "text-indigo-600 font-medium", children: "MS" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 390,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 389,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7("div", { children: [
              /* @__PURE__ */ jsxDEV7("h4", { className: "font-semibold", children: "Dr. Mark Smith" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 393,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7("p", { className: "text-sm text-slate-500", children: "Clinical Research Director" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 394,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 392,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 388,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "mb-4 text-indigo-50 relative", children: /* @__PURE__ */ jsxDEV7("div", { className: "absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3", children: /* @__PURE__ */ jsxDEV7(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "w-8 h-8 opacity-20",
              children: [
                /* @__PURE__ */ jsxDEV7("path", { d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 413,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV7("path", { d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 414,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 401,
              columnNumber: 21
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 400,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 399,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-6 leading-relaxed", children: `"The platform's rigorous approach revealed subtle statistical issues in our initial analysis that we were able to correct before publication."` }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 418,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex text-indigo-500 mt-auto", children: [
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 424,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 425,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 426,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 427,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 428,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 423,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 387,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 386,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7(Card, { className: "p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl", children: /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center mb-6", children: [
            /* @__PURE__ */ jsxDEV7("div", { className: "w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm", children: /* @__PURE__ */ jsxDEV7("span", { className: "text-indigo-600 font-medium", children: "AL" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 436,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 435,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7("div", { children: [
              /* @__PURE__ */ jsxDEV7("h4", { className: "font-semibold", children: "Dr. Anna Lee" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 439,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV7("p", { className: "text-sm text-slate-500", children: "Psychology Researcher" }, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 440,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 438,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 434,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "mb-4 text-indigo-50 relative", children: /* @__PURE__ */ jsxDEV7("div", { className: "absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3", children: /* @__PURE__ */ jsxDEV7(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "w-8 h-8 opacity-20",
              children: [
                /* @__PURE__ */ jsxDEV7("path", { d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 459,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV7("path", { d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" }, void 0, !1, {
                  fileName: "app/routes/_index.tsx",
                  lineNumber: 460,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 447,
              columnNumber: 21
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 446,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 445,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-600 mb-6 leading-relaxed", children: '"ReValidate is transforming how we approach scientific validation. The transparent ecosystem builds confidence in findings across disciplines."' }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 464,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex text-indigo-500 mt-auto", children: [
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 470,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 471,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 472,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 473,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV7(Star, { className: "h-5 w-5 fill-current" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 474,
              columnNumber: 19
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 469,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 433,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 432,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 339,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "mt-16 text-center", children: [
        /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-500 mb-6 font-medium", children: "Featured in" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 480,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-wrap justify-center gap-12 items-center", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Science" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 482,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Nature" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 485,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "PNAS" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 488,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "h-8 opacity-60 text-slate-400 font-medium", children: "Cell" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 491,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 481,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 479,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 326,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 325,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("section", { className: "py-24 bg-slate-50", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxDEV7("div", { className: "bg-white rounded-2xl p-12 shadow-xl border border-slate-100", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxDEV7("div", { className: "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20", children: /* @__PURE__ */ jsxDEV7("span", { children: "Get started" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 505,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 504,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Ready to strengthen scientific integrity?" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 507,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 503,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7("ul", { className: "mb-8 space-y-4 max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxDEV7("li", { className: "flex items-start", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "flex-shrink-0 p-1", children: /* @__PURE__ */ jsxDEV7(CheckCircle, { className: "h-5 w-5 text-indigo-600 mt-0.5" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 514,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 513,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("span", { className: "ml-3 text-slate-700", children: "Validate methods and reproduce results with confidence" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 516,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 512,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("li", { className: "flex items-start", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "flex-shrink-0 p-1", children: /* @__PURE__ */ jsxDEV7(CheckCircle, { className: "h-5 w-5 text-indigo-600 mt-0.5" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 522,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 521,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("span", { className: "ml-3 text-slate-700", children: "Join a community committed to scientific excellence" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 524,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 520,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV7("li", { className: "flex items-start", children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "flex-shrink-0 p-1", children: /* @__PURE__ */ jsxDEV7(CheckCircle, { className: "h-5 w-5 text-indigo-600 mt-0.5" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 530,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 529,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV7("span", { className: "ml-3 text-slate-700", children: "Enhance the credibility and impact of your research" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 532,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 528,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 511,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "text-center", children: /* @__PURE__ */ jsxDEV7(
        Button,
        {
          size: "lg",
          className: "bg-indigo-600 hover:bg-indigo-700 shadow-lg rounded-full px-8",
          children: [
            "Get started today",
            /* @__PURE__ */ jsxDEV7(Clock, { className: "ml-2 h-5 w-5" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 543,
              columnNumber: 17
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 538,
          columnNumber: 15
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 537,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 502,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 501,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 500,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("footer", { className: "bg-white pt-16 pb-8", children: /* @__PURE__ */ jsxDEV7("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxDEV7("div", { className: "grid md:grid-cols-4 gap-8 mb-12", children: [
        /* @__PURE__ */ jsxDEV7("div", { children: [
          /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxDEV7(FileCheck, { className: "h-6 w-6 text-indigo-600" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 556,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("span", { className: "font-semibold text-lg", children: "ReValidate" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 557,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 555,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("p", { className: "text-slate-500 mb-4 leading-relaxed", children: "Strengthening scientific integrity through transparent revalidation." }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 559,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-400 hover:text-indigo-600 transition",
                "aria-label": "Facebook",
                children: /* @__PURE__ */ jsxDEV7(
                  "svg",
                  {
                    className: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxDEV7(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                        clipRule: "evenodd"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 575,
                        columnNumber: 21
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 569,
                    columnNumber: 19
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 564,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-400 hover:text-indigo-600 transition",
                "aria-label": "Twitter",
                children: /* @__PURE__ */ jsxDEV7(
                  "svg",
                  {
                    className: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxDEV7("path", { d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" }, void 0, !1, {
                      fileName: "app/routes/_index.tsx",
                      lineNumber: 593,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 587,
                    columnNumber: 19
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 582,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-400 hover:text-indigo-600 transition",
                "aria-label": "GitHub",
                children: /* @__PURE__ */ jsxDEV7(
                  "svg",
                  {
                    className: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxDEV7(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                        clipRule: "evenodd"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 607,
                        columnNumber: 21
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 601,
                    columnNumber: 19
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 596,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-400 hover:text-indigo-600 transition",
                "aria-label": "Dribbble",
                children: /* @__PURE__ */ jsxDEV7(
                  "svg",
                  {
                    className: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxDEV7(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z",
                        clipRule: "evenodd"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/_index.tsx",
                        lineNumber: 625,
                        columnNumber: 21
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/_index.tsx",
                    lineNumber: 619,
                    columnNumber: 19
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 614,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 563,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 554,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { children: [
          /* @__PURE__ */ jsxDEV7("h4", { className: "font-semibold mb-4 text-slate-800", children: "Platform" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 635,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#features",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "Features"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 638,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 637,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#how-it-works",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "How it works"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 646,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 645,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#pricing",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "Pricing"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 654,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 653,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "FAQs"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 662,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 661,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 636,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 634,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { children: [
          /* @__PURE__ */ jsxDEV7("h4", { className: "font-semibold mb-4 text-slate-800", children: "Company" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 672,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "About"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 675,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 674,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "Blog"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 683,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 682,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "Careers"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 691,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 690,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "Contact"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 699,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 698,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 673,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 671,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { children: [
          /* @__PURE__ */ jsxDEV7("h4", { className: "font-semibold mb-4 text-slate-800", children: "Legal" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 709,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("ul", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "Privacy Policy"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 712,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 711,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "Terms of Service"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 720,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 719,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV7("li", { children: /* @__PURE__ */ jsxDEV7(
              Link,
              {
                to: "#",
                className: "text-slate-500 hover:text-indigo-600 transition text-sm",
                children: "Data Handling"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_index.tsx",
                lineNumber: 728,
                columnNumber: 19
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 727,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 710,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 708,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 553,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7(Separator, { className: "bg-slate-200 mb-8" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 738,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV7("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
        /* @__PURE__ */ jsxDEV7("p", { className: "text-sm text-slate-500 mb-4 md:mb-0", children: "\xA9 2023 ReValidate. All rights reserved." }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 740,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxDEV7("span", { className: "text-xs text-slate-400 mr-2", children: "Made with" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 744,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("span", { className: "text-indigo-500", children: "\u2665" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 745,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV7("span", { className: "text-xs text-slate-400 ml-2", children: "for scientific integrity" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 746,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 743,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 739,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 552,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 551,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-TUTM7ZLM.js", imports: ["/build/_shared/chunk-X3PXDGUE.js", "/build/_shared/chunk-G2WSVXPZ.js", "/build/_shared/chunk-F4KNNEUR.js", "/build/_shared/chunk-PLT55Z5M.js", "/build/_shared/chunk-2Z2JGDFU.js", "/build/_shared/chunk-RJ5JRAEL.js", "/build/_shared/chunk-JR22VO6P.js", "/build/_shared/chunk-PZDJHGND.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-T4GGNSA4.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-DHB22IUH.js", imports: ["/build/_shared/chunk-Y6RJRNBS.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "4e2acd88", hmr: { runtime: "/build/_shared/chunk-RJ5JRAEL.js", timestamp: 1746102115403 }, url: "/build/manifest-4E2ACD88.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_routeConfig: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_node_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
