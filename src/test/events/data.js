import {ReadTask} from '../tasks';

export default {
  event: 'data',
  invoke: function (angler, equipment, msg) {

    equipment.work(new ReadTask());

    // angler.send(
    //   msg,
    //   {
    //     event: 'save', data: {}
    //   },
    // );
  }
};
