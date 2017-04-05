import {dbs} from '../../../angler';
export default {
  event: 'user.test',
  invoke: async function (params) {
    const {container, equipment, packet} = params;
    try {
      await dbs.mysql.transaction(async (query) => {
        let result = await query('INSERT INTO tblUser VALUES ("123456789012345678901235","test")');
        console.log(result);
      });
    } catch (err) {
      console.log(err);
    }
  }
};
