function formatParams(data,opt) {
  let sp = data.split('.');
  let collection = sp[0];
  let event = sp.length === 1 ? `${data}.${opt}` : data;
  return {
    event,
    collection
  }
}

export {
  formatParams
}
