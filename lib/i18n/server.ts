import { readFile } from "node:fs/promises";
import path from "node:path";
import { createInstance, type i18n } from "i18next";

import { fallbackLocale, type Locale } from "./config";

type NamespaceResource = Record<string, unknown>;

async function loadNamespace(locale: Locale, namespace: string): Promise<NamespaceResource> {
	const filePath = path.join(process.cwd(), "locales", locale, `${namespace}.json`);
	const fileContent = await readFile(filePath, "utf8");

	return JSON.parse(fileContent) as NamespaceResource;
}

export async function getI18n(locale: Locale, namespaces: string[]): Promise<i18n> {
	const instance = createInstance();
	const uniqueNamespaces = [...new Set(namespaces)];

	const resources = Object.fromEntries(
		await Promise.all(
			uniqueNamespaces.map(async (namespace) => [
				namespace,
				await loadNamespace(locale, namespace),
			])
		)
	);

	await instance.init({
		lng: locale,
		fallbackLng: fallbackLocale,
		supportedLngs: ["pt", "en"],
		defaultNS: uniqueNamespaces[0],
		ns: uniqueNamespaces,
		resources: {
			[locale]: resources,
		},
		interpolation: {
			escapeValue: false,
		},
		returnObjects: true,
	});

	return instance;
}
