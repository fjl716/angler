export default {
  event:'data',
  invoke: function (angler, msg) {
    angler.send(
      msg,
      {
        event: 'save', data: {}
      },
    );
  }
};
