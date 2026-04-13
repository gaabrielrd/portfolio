import Blobs from "@/components/blobs";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import type { Locale } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";
import { requireLocale } from "@/lib/i18n/validation";

type NavigationItem = {
	href: string;
	label: string;
};

type FooterLink = {
	href: string;
	label: string;
};

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: Promise<{
		locale: string;
	}>;
};

export default async function LocaleLayout({
	children,
	params,
}: LocaleLayoutProps) {
	const { locale: localeParam } = await params;
	const locale = requireLocale(localeParam);
	const i18n = await getI18n(locale, ["common"]);
	const t = i18n.getFixedT(locale, "common");

	return (
		<>
			<div className="app-shell">
				<Navbar
					brandAlt={t("navigation.brandAlt")}
					brandName={t("navigation.brandName")}
					items={t("navigation.items", {
						returnObjects: true,
					}) as NavigationItem[]}
					languageLabel={t("navigation.languageLabel")}
					locale={locale}
					localeOptions={[
						{ code: "pt", label: t("navigation.localeOptions.pt") },
						{ code: "en", label: t("navigation.localeOptions.en") },
					]}
				/>
				<div className="page-shell">
					{children}
					<Blobs />
				</div>
			</div>
			<Footer
				creditsLabel={t("footer.creditsLabel")}
				email={t("footer.email")}
				emailLabel={t("footer.emailLabel")}
				externalLinks={t("footer.externalLinks", {
					returnObjects: true,
				}) as FooterLink[]}
				iconsByLabel={t("footer.iconsByLabel")}
				iconsByUrl={t("footer.iconsByUrl")}
				rightsLabel={t("footer.rightsLabel")}
			/>
		</>
	);
}
