import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { StoreProvider } from "@/util/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component
        className={
          [inter.variable, calSans.variable].join(" ") +
          " bg-black undefined vsc-initialized"
        }
        {...pageProps}
      />
    </StoreProvider>
  );
}
