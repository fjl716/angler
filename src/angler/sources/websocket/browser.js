import Equipment,{Close} from '../../equipment'

class Browser extends Equipment {
  constructor(source, channel) {
    super(`${Math.random()}`.substr(2), source);

    this.channel = channel;

  }
}

export default Browser
