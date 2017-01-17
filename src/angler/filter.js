import crossroads from 'crossroads';
const filter = crossroads.create();

filter.greedy		 = true;
filter.shouldTypecast = true;
filter.ignoreState    = true;

filter.addFilter = (event,invoke)=> {
  filter.addRoute(event, async function (...params){
    const tmp = params[0];
    if (tmp.result) {
      params = params.slice(1);
      tmp.result = tmp.result && await invoke(...params);
    }
  });
};

filter.addModel=(model)=> {
  for (let name in model) {
    let item = model[name];
    filter.addFilter(item.event, item.invoke);
  }
};

export default filter;
