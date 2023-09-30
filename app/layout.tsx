import Navbar from "@/components/navbar";
import "./globals.scss";
import type { Metadata } from "next";

import { Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";
import Blobs from "@/components/blobs";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";

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
	description: "Gabriel Roda, front-end dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head></head>

			<body className={[bodyFont.variable, navFont.variable].join(" ")}>
				<Navbar />
				{children}

				<Blobs />
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
