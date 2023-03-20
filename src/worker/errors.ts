type Loc = { offset: number; start: number; end: number };
export type ParseError = {
    desc: string;
    terminalDesc: string;
    location: { start: Loc; end: Loc };
    found: string;
    name: string;
};

/**
 * Determine whether or not an Error is a ParseError
 */
export function isParseError(e: any): e is ParseError {
    if (!e) {
        return false;
    }
    return Boolean(e.desc);
}
