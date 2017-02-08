import server from './server';
import {event} from '../../angler';
export default {
  invoke: async function (msg) {
    event.send(
      msg,
      {
        event: `remoting.set`,
        data: server.getObjects()
      },
      true
    );
  }
};
