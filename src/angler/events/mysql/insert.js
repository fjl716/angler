export default function (event, table) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      await container.dbs.mysql.tables[table].insert(
        packet.data
      );
    }
  }
}
