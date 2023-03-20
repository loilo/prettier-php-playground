import { action, createStore, thunk } from "easy-peasy";
import { isParseError } from "../worker/errors";
import { debounceRender } from "./debounce-render";
import { StoreModel } from "./model";

const DEFAULT_GRAMMAR = `a = "a" b:b? { return ['a', b]; }
b = "b" a:a? { return ['b', a]; }
`;

export const store = createStore<StoreModel>({
    editorText: DEFAULT_GRAMMAR,
    error: null,
    setEditorText: action((state, payload) => {
        state.editorText = payload;
    }),
    editorChange: thunk(async (actions, payload, { getState }) => {
        actions.setEditorText(payload);
        try {
            await debounceRender(actions, payload, getState().options);
            //   const generatedTypes = await parsingWorker.parse(payload);
            //   actions.setError(null);
            //   actions.setGeneratedTypes(generatedTypes);
        } catch (e) {
            if (isParseError(e)) {
                actions.setError(e);
            } else {
                console.log(e);
                actions.setError(String(e));
            }
        }
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    generatedTypes: "",
    setGeneratedTypes: action((state, payload) => {
        state.generatedTypes = payload;
    }),
    options: {},
    _setOptions: action((state, payload) => {
        Object.assign(state.options, payload);
    }),
    setOptions: thunk((actions, payload, { getState }) => {
        actions._setOptions(payload);
        actions.editorChange(getState().editorText);
    }),
});
