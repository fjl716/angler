import {session} from '../../../angler'
export default {
  event: 'sidebar.select',
  invoke: async function (params) {
    const {packet} = params;
    await session.set(params, {selectedKey: packet.data});
  }
}
