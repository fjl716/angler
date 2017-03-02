import {session} from '../../../angler'
export default {
  event: 'sidebar.open',
  invoke: async function (params) {
    const {packet} = params;
    await session.set(params, {openKeys: packet.data});
  }
}
