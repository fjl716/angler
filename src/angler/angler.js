
const angler={
  express: {},
  containers: {},
  startFunc: [],
};

angler.addStart=(func)=>{
  angler.startFunc.push(func);
};

angler.start =()=> {
  angler.startFunc.map(func => {
    func();
  });
};
export default angler;
