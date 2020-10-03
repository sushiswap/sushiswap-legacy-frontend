declare const uuidv4: () => string;
declare const regex: {
    v4: RegExp;
    v5: RegExp;
};
declare const isUuid: (value: string) => boolean;
declare const empty: () => string;
declare const fromString: (text: string) => string;
export { uuidv4 as uuid, regex, isUuid, empty, fromString };
