

export default function (table) {
  return {
    event: `${table}._update`,
    invoke: async function (params) {
      const {container, packet} = params;
      console.log(packet);
    }
  }
}
