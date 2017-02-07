import server from './server';
import {event} from '../../angler';

export default {
  invoke: async function (msg) {
    event.send(
      msg,
      {
        event: `remoting.result`,
        data: server.callProxy(msg.data)
      },
      true
    );
  }
};
