export type ProjectStatus = "published" | "teaser";

export type ProjectLink = {
	label: string;
	href: string;
};

export type ProjectEntry = {
	title: string;
	description: string;
	highlights?: string[];
	links?: ProjectLink[];
	tags?: string[];
	status: ProjectStatus;
};

export type CompanySection = {
	slug: string;
	company: string;
	period: string;
	role: string;
	summary: string;
	projects: ProjectEntry[];
};
