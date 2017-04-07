import {session} from '../../../angler'
export default {
  event: 'user._login',
  invoke: async function (params) {
    const {container} = params;
    container.send(
      params,
      {
        packet: {
          event: `sidebar.findall`
        }
      }
    );
    const data = await session.get(params);
    if (data.openKeys) {
      container.send(
        params,
        {
          packet: {
            event: `sidebar.open`,
            data: data.openKeys
          }
        },
        true
      );
    }
    if (data.selectedKey) {
      container.send(
        params,
        {
          packet: {
            event: `sidebar.select`,
            data: data.selectedKey
          }
        },
        true
      );
    }
  }
}
