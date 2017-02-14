import Equipment,{Close} from '../../equipment'

class Browser extends Equipment {
  constructor(channel, source) {
    super(`${Math.random()}`.substr(2), source);

    this.channel = channel;
    channel.on('text', (str) => {
      source.arrive(this, str);
    });
    channel.on('close', (code, reason) => {
      source.arrive(this, Close);
    });
    channel.on("error", (err) => {
    })
  }

  out(data) {
    this.channel.send(data);
  }
}

export default Browser