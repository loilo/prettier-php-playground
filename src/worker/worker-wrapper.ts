import * as Comlink from "comlink";
//import Worker from "worker-loader!"
/* eslint-disable import/no-webpack-loader-syntax */
//@ts-ignore
import workerFactory from "./parsing-worker?worker";
import { Exposed } from "./parsing-worker";

const rawWorker = new workerFactory();
export const parsingWorker = Comlink.wrap(rawWorker) as Comlink.Remote<Exposed>;
