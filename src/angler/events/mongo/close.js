
export default {
  event: 'close',
  invoke: function (params) {
    const {angler, packet, equipment} = params;
    console.log(equipment);
    console.log(packet);
  }
};
