import {dbs} from '../../../angler';
export default {
  event: 'user.test',
  invoke: async function (params) {
    const {container, equipment, packet} = params;
    // await dbs.solrs.users.add({
    //   'id': '58b682bfc044bf1277263397',
    //   'loginid': 'admin1',
    //   'sex': 1,
    //   'name': '管理员',
    //   'email': 'admin@admin.com',
    // });
    // await dbs.solrs.users.add({
    //   'id': '58b682bfc044bf1277263398',
    //   'loginid': 'admin2',
    //   'sex': 1,
    //   'name': '管理员',
    //   'email': 'admin@admin.com',
    // });
    // await dbs.solrs.users.add({
    //   'id': '58b682bfc044bf1277263399',
    //   'loginid': 'admin3',
    //   'sex': 1,
    //   'name': '管理员',
    //   'email': 'admin@admin.com',
    // });
    // console.log('add 3');
    // try {
    //   await dbs.mysql.transaction(async (query) => {
    //     let result = await query('INSERT INTO tblUser VALUES ("123456789012345678901235","test")');
    //     console.log(result);
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }
};
