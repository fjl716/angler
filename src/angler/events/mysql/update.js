export default function (event, table) {
  return {
    event,
    invoke: async function (params) {
      const {container, packet} = params;
      await container.mysql.tables[table].update(
        packet.data
      );
    }
  }
}

