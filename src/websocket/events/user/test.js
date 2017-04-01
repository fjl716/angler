import {dbs} from '../../../angler';
export default {
  event: 'user.test',
  invoke: async function (params) {
    const {container, equipment,packet} = params;
    // dbs.mysql
  }
};
