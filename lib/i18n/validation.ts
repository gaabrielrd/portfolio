import { notFound } from "next/navigation";

import { isSupportedLocale, type Locale } from "./config";

export function requireLocale(locale: string): Locale {
	if (!isSupportedLocale(locale)) {
		notFound();
	}

	return locale;
}
