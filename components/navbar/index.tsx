"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import titleImage from "../../public/images/3d-fluency-laptop.png";
import flagBrazilImage from "../../public/images/flag-brazil.png";
import flagUsaImage from "../../public/images/flag-usa.png";

import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import {
	buildLocalizedPath,
	localeCookieName,
	stripLocaleFromPathname,
	type Locale,
} from "@/lib/i18n/config";

type NavigationItem = {
	href: string;
	label: string;
};

type LocaleOption = {
	code: Locale;
	label: string;
};

type NavbarProps = {
	brandAlt: string;
	brandName: string;
	items: NavigationItem[];
	languageLabel: string;
	locale: Locale;
	localeOptions: LocaleOption[];
};

function persistLocalePreference(locale: Locale) {
	document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

const localeVisuals: Record<
	Locale,
	{ shortLabel: string; flag: typeof flagBrazilImage }
> = {
	pt: {
		shortLabel: "PT",
		flag: flagBrazilImage,
	},
	en: {
		shortLabel: "EN",
		flag: flagUsaImage,
	},
};

export default function Navbar({
	brandAlt,
	brandName,
	items,
	languageLabel,
	locale,
	localeOptions,
}: NavbarProps) {
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const activePathname = stripLocaleFromPathname(pathname || "/");

	function handleLocaleChange(nextLocale: Locale) {
		if (nextLocale === locale) {
			return;
		}

		persistLocalePreference(nextLocale);

		startTransition(() => {
			router.push(buildLocalizedPath(nextLocale, pathname || "/"));
		});
	}

	return (
		<div className={styles.navbar}>
			<div className={styles.navbarWrapper}>
				<div className={styles.name}>
					<Image src={titleImage} height={24} alt={brandAlt} />
					<h1>{brandName}</h1>

					<div className="animation"></div>
				</div>
				<div className={styles.navItems}>
					{items.map((item) => (
						<Link key={item.href} href={buildLocalizedPath(locale, item.href)}>
							<span
								className={
									activePathname === item.href ? styles.activeItem : ""
								}
							>
								{item.label}
							</span>
						</Link>
					))}
				</div>
				<div
					className={styles.localeSwitcher}
					aria-label={languageLabel}
					role="group"
				>
					{localeOptions.map((option) => (
						<button
							key={option.code}
							type="button"
							className={option.code === locale ? styles.activeLocale : ""}
							onClick={() => handleLocaleChange(option.code)}
							aria-pressed={option.code === locale}
							aria-label={option.label}
							disabled={isPending}
						>
							<Image
								className={styles.localeFlag}
								src={localeVisuals[option.code].flag}
								alt=""
								width={18}
								height={12}
								aria-hidden="true"
							/>
							<span className={styles.localeMeta}>
								<span className={styles.localeCode}>
									{localeVisuals[option.code].shortLabel}
								</span>
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
