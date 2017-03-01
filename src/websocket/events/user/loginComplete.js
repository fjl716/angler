export default {
  event: 'user.loginComplete',
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
