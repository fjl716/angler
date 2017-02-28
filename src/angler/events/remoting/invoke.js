import proxys from '../../proxys';

export default {
  event:'remoting.invoke',
  invoke: async function (params) {
    const {container,packet} = params;
    const data = await proxys.call(packet.data);
    container.send(
      params,
      {
        packet: {
          event: `remoting.result`,
          data
        }
      },
      true
    );
  }
};
