import util from 'util'

class Table {
  constructor(db,table,fields) {
    this.db = db;
    this.table = table;
    this.fields = fields.map(field => {
      const name = Object.keys(field)[0];
      const value = Object.values(field)[0];
      if (util.isFunction(value)) {
        return {
          name,
          value
        }
      }
      if (util.isString(value)) {
        switch (value) {
          case 'string':
            return {
              name,
              value: function (obj) {
                return obj[name] + '';
              }
            }
        }
      }
    });
  }

  insertSql(obj) {
    let fields = [];
    let params = [];
    let values = [];
    this.fields.map(field => {
      fields.push(`\`${field.name}\` `);
      params.push('?');
      values.push(field.value(obj));
    });
    let sql = `INSERT INTO ${this.table} (${fields}) VALUES (${params})`;
    return {
      sql,
      values
    };
  }

  insert(obj){
    let query = this.insertSql(obj);
    this.db.query(query);
  }

  updateSql(obj) {

  }

  deleteSql(obj) {

  }
}

export default Table
