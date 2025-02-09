export default class {
  constructor(val, typeName, type) {
    this.val = val;
    this.typeName = typeName;
    this.type = type;
    this.result = {};
  }
  _cannotEmpty() {
    return new Promise((resolve, reject) => {
      if (!!this.val) {
        resolve(this);
      } else {
        reject({
          success: false,
          type: this.type,
          message: `${this.typeName}は必須です。`
        })
      }
    });
  }
}