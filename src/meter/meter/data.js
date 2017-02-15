export default {
  invoke: function (angler, msg) {
    angler.send(
      msg,
      {
        event: 'save', data: {}
      },
    );
  }
};
