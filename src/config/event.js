const events = [
  {
    // "_id": "58ec3ed1097808014511045e",
    "container" : "58ec76b30978080145110474",
    "event": "user.login",
    "result": [
      {event: 'user._login'}
    ],
    "invoke": `
      const {equipment, packet, database} = probe;
      const {loginid, password, token} = packet.data;
      let obj = null;
      if (token){
        obj = await database.mongo.collections['user'].findOneSimple({
          token
        });
      }else{
        obj = await database.mongo.collections['user'].findOneSimple({
          loginid,
          password
        });
      }
      if (obj) {
        probe.changeId = obj._id;
        obj.token = (Math.random() + '').substring(2);
        await database.mongo.collections['user'].update(
          {
            '_id':obj._id
          },
          {
            '$set':{
              token:obj.token
            }
          }
        );
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
    "container": "58ec76b30978080145110474",
    "event": "sidebar.select",
    "result": [
    ],
    "invoke": `
      const {equipment, session,packet} = probe;
      session.set(equipment,{
        selectedKey:packet.data
      });
    `
  },
  {
    "container": "58ec76b30978080145110474",
    "event": "sidebar.open",
    "result": [
    ],
    "invoke": `
      const {equipment, session,packet} = probe;
      session.set(equipment,{
        openKey:packet.data
      });
    `
  },
  {
    "container": "58ec76b30978080145110474",
    "event": "user._login",
    "result": [
      {event: 'sidebar.findall'},
      {event: 'sidebar.select'},
      {event: 'sidebar.open'},
    ],
    "invoke": `
      const {equipment, session} = probe;
      const obj = await session.get(equipment);
      probe.send(
        {
          event:'sidebar.findall'
        }
      );
      if (obj){
        const {selectedKey,openKey} = obj;
        if (selectedKey){
          probe.send(
            {
              event:'sidebar.select',
              data:selectedKey
            },true);
        }
        if(openKey){
          probe.send(
            {
              event:'sidebar.open',
              data:openKey
            },
            true);
        }
      }
    `
  },
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
