import { Actions } from "easy-peasy";
import { parsingWorker } from "../worker/worker-wrapper";
import { StoreModel } from "./model";
import { Options } from "./types";

let isInRender = false;
let startOfLastRender = Date.now();
let maxDelay = 500;
let renderQueue: string | null = null;

/**
 * Set `generatedTypes` to `payload`, but debounce the input so that re-renders are not
 * requested too frequently.
 */
export async function debounceRender(
    actions: Actions<StoreModel>,
    payload: string,
    options: Options
) {
    renderQueue = payload;
    async function doRender() {
        if (renderQueue == null || isInRender) {
            return;
        }
        try {
            isInRender = true;
            const text = renderQueue;
            const generatedTypes = await parsingWorker.parse(text, options);
            // Some other thread may have decided to render in the mean time.
            // Make sure we are the most current before we actually go setting things.
            actions.setError(null);
            actions.setGeneratedTypes(generatedTypes);
            // If we finished rendering and something different wasn't pushed onto the queue, set
            // the queue to null so that we know we can stop rendering.
            if (renderQueue === text) {
                renderQueue = null;
            }
        } finally {
            isInRender = false;
        }
    }
    const currentTime = Date.now();
    if (currentTime - startOfLastRender > maxDelay || !isInRender) {
        startOfLastRender = currentTime;
        await doRender();
    } else {
        await new Promise((resolve) => setTimeout(resolve, maxDelay));
        if (renderQueue) {
            debounceRender(actions, renderQueue, options);
        }
    }
}
