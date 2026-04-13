export const supportedLocales = ["pt", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export const fallbackLocale: Locale = "pt";
export const localeCookieName = "preferred-locale";
export const localeHeaderName = "x-roda-locale";

const localePattern = new RegExp(`^/(${supportedLocales.join("|")})(?=/|$)`);

export function isSupportedLocale(value: string | null | undefined): value is Locale {
	return supportedLocales.includes(value as Locale);
}

export function normalizeLocale(value: string | null | undefined): Locale | null {
	if (!value) {
		return null;
	}

	const normalized = value.toLowerCase();

	if (normalized === "pt" || normalized.startsWith("pt-")) {
		return "pt";
	}

	if (normalized === "en" || normalized.startsWith("en-")) {
		return "en";
	}

	return null;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
	const match = pathname.match(localePattern);

	return normalizeLocale(match?.[1]);
}

export function stripLocaleFromPathname(pathname: string): string {
	const strippedPath = pathname.replace(localePattern, "");

	return strippedPath.length > 0 ? strippedPath : "/";
}

export function buildLocalizedPath(locale: Locale, pathname: string): string {
	const safePathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
	const strippedPath = stripLocaleFromPathname(safePathname);

	return strippedPath === "/" ? `/${locale}` : `/${locale}${strippedPath}`;
}

export function detectPreferredLocale(input: {
	cookieLocale?: string | null;
	acceptLanguage?: string | null;
}): Locale {
	const cookieLocale = normalizeLocale(input.cookieLocale);

	if (cookieLocale) {
		return cookieLocale;
	}

	const acceptedLanguages = input.acceptLanguage
		?.split(",")
		.map((entry) => entry.split(";")[0]?.trim())
		.filter(Boolean);

	for (const language of acceptedLanguages ?? []) {
		const locale = normalizeLocale(language);

		if (locale) {
			return locale;
		}
	}

	return fallbackLocale;
}
