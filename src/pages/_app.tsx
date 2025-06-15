import { ThemeProvider } from "@/components/theme-provider";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		require("jquery/dist/jquery.min.js");
		require("@popperjs/core/dist/umd/popper.min.js");
		require("bootstrap/dist/js/bootstrap.min.js");
		fetch("/api/init-db");
	}, []);
	return (
		<SessionProvider session={pageProps.session}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<Component {...pageProps} />
			</ThemeProvider>
		</SessionProvider>
	);
}
