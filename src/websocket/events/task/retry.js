import TestRetry from './taskretry'

export default {
  event: 'task.retry',
  invoke: async function (params) {
    const {equipment} = params;

    equipment.work(new TestRetry(`${Math.random()}`.substr(2), (result) => {
      console.log(result);
    }));

    equipment.work(new TestRetry(`${Math.random()}`.substr(2), (result) => {
      console.log(result);
    }));

  }
}
