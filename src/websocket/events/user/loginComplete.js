import {TestTask} from '../../tasks'
export default {
  event: 'user.loginComplete',
  invoke: async function (params) {
    const {equipment} = params;

    equipment.work(new TestTask(`${Math.random()}`.substr(2), (result) => {
      console.log(result);
    }));
  }
}
