export type ClassValue =
	| ClassArray
	| ClassDictionary
	| string
	| number
	| null
	| boolean
	| undefined;

interface ClassDictionary {
	[className: string]: boolean | undefined | null;
}

interface ClassArray extends Array<ClassValue> {}

function normalizeClassValue(value: ClassValue): string[] {
	if (!value) {
		return [];
	}

	if (typeof value === "string" || typeof value === "number") {
		return [String(value)];
	}

	if (Array.isArray(value)) {
		return value.flatMap(normalizeClassValue);
	}

	return Object.entries(value)
		.filter(([, isEnabled]) => Boolean(isEnabled))
		.map(([className]) => className);
}

export function clsx(...values: ClassValue[]) {
	return values.flatMap(normalizeClassValue).join(" ");
}
