import util from 'util'

class Table {
  constructor(db, table, key, fields) {
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
    this.key = this.fields.find(field => field.name === key);
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

  insert(obj) {
    let query = this.insertSql(obj);
    this.db.query(query);
  }

  updateSql(obj) {
    let fields = [];
    let values = [];
    this.fields.map(field => {
      if (field.name !== this.key) {
        fields.push(`\`${field.name}\` = ?`);
        values.push(field.value(obj));
      }
    });

    values.push(this.key.value(obj));

    let sql = `UPDATE ${this.table} SET ${fields} WHERE \`${this.key.name}\` = ?`;
    return {
      sql,
      values
    };
  }

  update(obj) {
    let query = this.updateSql(obj);
    this.db.query(query);
  }

  deleteSql(obj) {
    let sql = `DELETE FROM ${this.table} WHERE \`${this.key.name}\` = ?`;
    let values = [this.key.value(obj)];
    return {
      sql,
      values
    }
  }

  'delete'(obj) {
    let query = this.deleteSql(obj);
    this.db.query(query);
  }
}

export default Table
