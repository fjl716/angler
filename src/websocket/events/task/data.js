export default {
  event: 'task.data',
  invoke: async function (params) {
    const {equipment, packet} = params;

    equipment.taskArrive(packet)

  }
}
