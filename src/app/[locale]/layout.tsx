import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import StoreProvider from "../../providers/StoreProvider.tsx";
import ReactQueryProvider from "../../providers/ReactQueryProvider.tsx";
import "./index.css";
import ProtectedLayout from "../../layouts/ProtectedLayout.tsx";
import ProgressBarProvider from "../../providers/ProgressBarProvider.tsx";
import { ToastContainer } from "react-toastify";
import i18nConfig from "../../../i18nConfig.ts";
import TranslationsProvider from "../../providers/TranslationsProvider.tsx";
import initTranslations from "../i18n.ts";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale: string) => ({ locale }));
}

async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, ["default"]);

  return (
    <html lang="en">
      <body>
        <TranslationsProvider locale={locale} resources={resources} namespaces={["default"]}>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <ReactQueryProvider>
              <StoreProvider>
                <ProgressBarProvider>
                  <ProtectedLayout>
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                    <div id="root">{children}</div>
                  </ProtectedLayout>
                </ProgressBarProvider>
              </StoreProvider>
            </ReactQueryProvider>
          </GoogleOAuthProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}

export default RootLayout;
