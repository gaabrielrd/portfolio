import "./globals.scss";
import type { Metadata } from "next";

import { Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

import { fallbackLocale, localeHeaderName, normalizeLocale } from "@/lib/i18n/config";

const bodyFont = Libre_Baskerville({
	weight: ["400", "700"],
	subsets: ["latin"],
	variable: "--body-font",
});

const navFont = localFont({
	src: "../public/fonts/InclusiveSans-Regular.ttf",
	display: "swap",
	variable: "--nav-font",
});

export const metadata: Metadata = {
	title: "roda.dev",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const requestHeaders = await headers();
	const requestLocale =
		normalizeLocale(requestHeaders.get(localeHeaderName)) ?? fallbackLocale;

	return (
		<html lang={requestLocale}>
			<head></head>
			<body className={[bodyFont.variable, navFont.variable].join(" ")}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
