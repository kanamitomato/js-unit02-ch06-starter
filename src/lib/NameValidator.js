import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, '名前', 'name');
    this._checkFormat = this._checkFormat.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkFormat)
      .then((res) => {
        return { success: true };
      })
      .catch(err => {
        return err;
      });
  }
  _checkFormat() {
    /* 
      名前は必ず一つのスペースを含みます。
      名前には半角英数字のみが利用可能です。
      長さ（短すぎもあり得るし長いのもあり得る）
      一文字目は大文字
    */
   const re = /^([a-zA-Z]*)+\s+([a-zA-Z]*)$/i;
   const match = re.test(this.val);
   if (match) {
     return Promise.resolve();
   } else {
     return Promise.reject({
       success: false,
       type: this.type,
       message: `${this.typeName}の形式が異なります。`
     })
   }
  }
}