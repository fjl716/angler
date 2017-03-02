import {session} from '../../../angler'
export default {
  event: 'sidebar.select',
  invoke: async function (params) {
    const {packet} = params;

    console.log('sidebar.select', params.equipment.__ID__);

    await session.set(params, {selectedKey: packet.data});
  }
}
