import {TestTask} from '../../tasks'
export default {
  event: 'user.loginComplete',
  invoke: async function (params) {
    const {equipment} = params;

    equipment.work(new TestTask((result)=>{
      console.log(result);
    }));
  }
}
