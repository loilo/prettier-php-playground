import Prettifier from 'workerize-loader!../util/Prettifier'
export default process.browser ? new Prettifier() : null
