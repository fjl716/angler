export default function (table) {
  return {
    event: `${table}.load`,
    invoke: async function (params) {
      //console.log(msg,table);
    }
  }
};
