import TaskTick from './tasktick'

export default {
  event: 'task.tick',
  invoke: async function (params) {
    const {container,equipment} = params;
    equipment.work(new TaskTick(`${Math.random()}`.substr(2), (result) => {
      container.send(
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
