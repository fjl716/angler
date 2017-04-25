const events = [
  {
    // "_id": "58ec3ed1097808014511045e",
    "container" : "58ec76b30978080145110474",
    "event": "user.login",
    "result": [
      {event: 'user._login'}
    ],
    "invoke": `
      const {equipment, packet,database} = probe;
      let obj = await database.mongo.collections['user'].findOneSimple({
        loginid: packet.data.loginid,
        password: packet.data.password
      });
      if (obj) {
        probe.changeId = obj._id;
        probe.send(
          {
              data: obj
          },true 
        );
      } else {
        
      }
    `
  },
  {
    // "_id": "58ec3ed1097808014511045e",
    "container" : "58ec76b30978080145110474",
    "event": "user._login",
    "result": [
      {event: 'sidebar.findall'},
      {event: 'sidebar.select'},
      {event: 'sidebar.open'},
    ],
    "invoke": `
        probe.send(
          {
              event:'sidebar.findall'
          });
    `
  },
  // {
  //   "container": "58ec76b30978080145110474",
  //   "event": "sidebar.findall",
  //   "path": "mongo.findall",
  //   "params": "sidebar"
  // },
];

['sidebar','user','role','calendar','course','paper','clazz','action','result'].map(name=>{
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.delete`,
    "path": "mongo.delete",
    "params": name
  });
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.find`,
    "path": "mongo.find",
    "params": name
  });
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.findall`,
    "path": "mongo.findall",
    "params": name
  });
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.findone`,
    "path": "mongo.findone",
    "params": name
  });
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.findsimple`,
    "path": "mongo.findsimple",
    "params": name
  });
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.findsimples`,
    "path": "mongo.findsimples",
    "params": name
  });
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.insert`,
    "path": "mongo.insert",
    "params": name
  });
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.paging`,
    "path": "mongo.paging",
    "params": name
  });
  events.push({
    "container": "58ec76b30978080145110474",
    "event": `${name}.update`,
    "path": "mongo.update",
    "params": name
  });

});
export default events
