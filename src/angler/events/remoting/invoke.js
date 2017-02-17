import proxys from '../../proxys';

export default {
  event:'remoting.invoke',
  invoke: async function (params) {
    const {angler,packet} = params;
    angler.send(
      params,
      {
        packet: {
          event: `remoting.result`,
          data: proxys.apply(packet.data)
        }
      },
      true
    );
  }
};
