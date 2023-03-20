import { Action, Thunk } from "easy-peasy";
import { ParseError } from "../worker/errors";
import { Options } from "./types";

export interface StoreModel {
    editorText: string;
    setEditorText: Action<StoreModel, string>;
    editorChange: Thunk<StoreModel, string>;
    error: ParseError | string | null;
    setError: Action<StoreModel, ParseError | string | null>;
    generatedTypes: string;
    setGeneratedTypes: Action<StoreModel, string>;
    options: Options;
    _setOptions: Action<StoreModel, Partial<Options>>;
    setOptions: Thunk<StoreModel, Partial<Options>>;
}
