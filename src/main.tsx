import { MedusaProvider } from "medusa-react"
import type { PropsWithChildren } from "react"
import React from "react"
import { createRoot } from "react-dom/client"
import * as Sentry from "@sentry/react";
import { HttpClient } from "@sentry/integrations";
import App from "./App"
import "./assets/styles/global.css"
import { LayeredModalProvider } from "./components/molecules/modal/layered-modal"
import { SteppedProvider } from "./components/molecules/modal/stepped-modal"
import { FeatureFlagProvider } from "./context/feature-flag"
import { sentryDSN, sentryDebug, medusaUrl } from "./services/config"
import queryClient from "./services/queryClient"



Sentry.init({
  dsn: sentryDSN || "",
  debug: sentryDebug,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        "server.gallowayfamilyfarm.com",
        "gallowayfamilyfarm.com",
        "/https:\/\/*",
        "localhost",
        /^\//
        //"localhost", "127.0.0.1",
        //"/https:\/\/server\.gallowayfamilyfarm\.com\/*"
      ],
    }),
    new Sentry.Replay(),
    new HttpClient({
      failedRequestStatusCodes: [[400, 499], [500-599]],
      failedRequestTargets: ["/https:\/\/*"]
  })
  ],
});

const Page = ({ children }: PropsWithChildren) => {
  return (
    <MedusaProvider
      baseUrl={medusaUrl}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <FeatureFlagProvider>
        <SteppedProvider>
          <LayeredModalProvider>{children}</LayeredModalProvider>
        </SteppedProvider>
      </FeatureFlagProvider>
    </MedusaProvider>
  )
}

const root = createRoot(document.getElementById("root")!)
root.render(
  <React.StrictMode>
    <Page>
      <App />
    </Page>
  </React.StrictMode>
)
