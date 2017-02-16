export default {
  event: 'user.data',
  invoke: async function (params) {
    const {equipment, packet} = params;

    equipment.taskArrive(packet)

  }
}
