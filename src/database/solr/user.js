export default {
  name: 'user',
  core: 'users',
  key: 'docid',
  fields: [
    {
      docid: (doc) => {
        return doc._id
      }
    },
    {name: 'string'},
    {loginid: 'string'},
    {email: 'string'},
    {sex: 'int'},
  ]
}
