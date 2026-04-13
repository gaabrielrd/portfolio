import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const localesRoot = path.join(process.cwd(), "locales");
const baseLocale = "pt";
const compareLocale = "en";

function collectShape(value) {
	if (Array.isArray(value)) {
		return value.map((entry) => collectShape(entry));
	}

	if (value && typeof value === "object") {
		return Object.keys(value)
			.sort()
			.reduce((shape, key) => {
				shape[key] = collectShape(value[key]);
				return shape;
			}, {});
	}

	return typeof value;
}

function compareShapes(baseShape, otherShape, currentPath = []) {
	const differences = [];

	if (Array.isArray(baseShape) && Array.isArray(otherShape)) {
		if (baseShape.length !== otherShape.length) {
			differences.push(
				`${currentPath.join(".") || "<root>"} array length differs: ${baseShape.length} !== ${otherShape.length}`
			);
		}

		const maxLength = Math.min(baseShape.length, otherShape.length);

		for (let index = 0; index < maxLength; index += 1) {
			differences.push(
				...compareShapes(baseShape[index], otherShape[index], [...currentPath, `[${index}]`])
			);
		}

		return differences;
	}

	if (
		baseShape &&
		otherShape &&
		typeof baseShape === "object" &&
		typeof otherShape === "object" &&
		!Array.isArray(baseShape) &&
		!Array.isArray(otherShape)
	) {
		const baseKeys = Object.keys(baseShape);
		const otherKeys = Object.keys(otherShape);

		for (const key of baseKeys) {
			if (!(key in otherShape)) {
				differences.push(`${[...currentPath, key].join(".")} missing in ${compareLocale}`);
				continue;
			}

			differences.push(
				...compareShapes(baseShape[key], otherShape[key], [...currentPath, key])
			);
		}

		for (const key of otherKeys) {
			if (!(key in baseShape)) {
				differences.push(`${[...currentPath, key].join(".")} missing in ${baseLocale}`);
			}
		}

		return differences;
	}

	if (baseShape !== otherShape) {
		differences.push(
			`${currentPath.join(".") || "<root>"} type differs: ${String(baseShape)} !== ${String(otherShape)}`
		);
	}

	return differences;
}

async function readJson(filePath) {
	const content = await readFile(filePath, "utf8");
	return JSON.parse(content);
}

const baseFiles = (await readdir(path.join(localesRoot, baseLocale))).filter((file) =>
	file.endsWith(".json")
);

const compareFiles = new Set(
	(await readdir(path.join(localesRoot, compareLocale))).filter((file) => file.endsWith(".json"))
);

const allDifferences = [];

for (const fileName of baseFiles) {
	if (!compareFiles.has(fileName)) {
		allDifferences.push(`${fileName} missing in ${compareLocale}`);
		continue;
	}

	const [baseJson, compareJson] = await Promise.all([
		readJson(path.join(localesRoot, baseLocale, fileName)),
		readJson(path.join(localesRoot, compareLocale, fileName)),
	]);

	const differences = compareShapes(collectShape(baseJson), collectShape(compareJson));

	for (const difference of differences) {
		allDifferences.push(`${fileName}: ${difference}`);
	}

	compareFiles.delete(fileName);
}

for (const extraFile of compareFiles) {
	allDifferences.push(`${extraFile} missing in ${baseLocale}`);
}

if (allDifferences.length > 0) {
	console.error("Locale parity check failed:");

	for (const difference of allDifferences) {
		console.error(`- ${difference}`);
	}

	process.exit(1);
}

console.log("Locale parity check passed.");
