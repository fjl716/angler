import Equipment from '../../equipment'

class Browser extends Equipment {
  constructor(source, channel) {
    super(`${Math.random()}`.substr(2), source, channel);
  }
}

export default Browser
