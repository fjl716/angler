import TestRetry from './taskretry'

export default {
  event: 'task.retry',
  invoke: async function (params) {
    const {angler,equipment} = params;

    equipment.work(new TestRetry(`${Math.random()}`.substr(2), (result) => {
      angler.send(
        params,
        {
          packet: {
            event: `tick.complete`,
            data: result
          }
        },
        true
      );
    }));

  }
}
