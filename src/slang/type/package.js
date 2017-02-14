class PPackage {
  constructor(parent) {
    this.parent = parent;
  }

  sub(name) {
    this[name] = new PPackage(this);
    return this[name];
  }

  arr(){
    return new PPackage(this);
  }

  get(name) {
    if (this[name])
      return this[name];
    else if (this.parent)
      return this.parent.get(name);
    else
      return undefined;
  }
}

PPackage.prototype.toJSON = function() {
  let result = {};
  result = Object.assign(result, this);
  delete result.parent;
  delete result.protocol;
  return result;
};
export default PPackage;