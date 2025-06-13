import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
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
