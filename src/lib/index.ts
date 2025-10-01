// place files you want to import through the `$lib` alias in this folder.
export const serializeNonPOJOs = (obj: unknown) => {
	return structuredClone(obj);
};
