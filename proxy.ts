import { NextResponse, type NextRequest } from "next/server";

import {
	buildLocalizedPath,
	detectPreferredLocale,
	getLocaleFromPathname,
	localeCookieName,
	localeHeaderName,
} from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
	const pathnameLocale = getLocaleFromPathname(request.nextUrl.pathname);

	if (!pathnameLocale) {
		const locale = detectPreferredLocale({
			cookieLocale: request.cookies.get(localeCookieName)?.value,
			acceptLanguage: request.headers.get("accept-language"),
		});
		const redirectUrl = request.nextUrl.clone();

		redirectUrl.pathname = buildLocalizedPath(locale, request.nextUrl.pathname);

		return NextResponse.redirect(redirectUrl);
	}

	const requestHeaders = new Headers(request.headers);

	requestHeaders.set(localeHeaderName, pathnameLocale);

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
