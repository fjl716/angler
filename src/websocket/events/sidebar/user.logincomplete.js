export default {
  event: 'user.logincomplete',
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
  }
}
