import TaskTick from './tasktick'

export default {
  event: 'task.tick',
  invoke: async function (params) {
    const {equipment} = params;
    equipment.work(new TaskTick(`${Math.random()}`.substr(2), (result) => {
      console.log(result);
    }));
  }
}
