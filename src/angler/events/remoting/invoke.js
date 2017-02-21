import proxys from '../../proxys';

export default {
  event:'remoting.invoke',
  invoke: async function (params) {
    const {angler,packet} = params;
    const data = await proxys.call(packet.data);
    angler.send(
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
