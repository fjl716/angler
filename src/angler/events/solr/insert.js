export default function (table) {
  return {
    event: `${table}.insert`,
    result: [{event: `${table}.delete`}],
    invoke: async function (probe) {
      let result = await probe.database.solrs[table].add(
        probe.packet.data
      );
      console.log(result);
    }
  }
}
