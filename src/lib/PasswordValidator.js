import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'パスワード', 'password');
    this._checkLength = this._checkLength.bind(this);
    this._checkFormat = this._checkFormat.bind(this);
    this._includeCapLetter = this._includeCapLetter.bind(this);
    this._includeSymble = this._includeSymble.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkLength)
      .then(this._checkFormat)
      .then(this._includeCapLetter)
      .then(this._includeSymble)
      .then((res) => {
        return { success: true }; // Promise.resolve({ success: true })と同一
      })
      .catch(err => {
        return err; // Promise.resolve(err)と同一
      });
  }

  _checkFormat(){
    const re = /^[a-zA-Z0-9_.-@]*$/;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: '使用できるのは半角英数字及び_-.@のみです。'
      });
    }
  }

  _includeCapLetter(){
    const re = /[A-Z]+/;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: 'アルファベットは一文字以上の大文字を使用してください'
      });
    }
  }

  _includeSymble(){
    const re = /[_.-@]+/;
    const match = re.test(this.val);
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: '一文字以上の記号を使用してください'
      });
    }
  }

  _checkLength() {
    if (this.val.length >= 8) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: 'パスワードが短すぎます。'
      });
    }
  }
}