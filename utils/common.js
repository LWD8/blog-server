/**
   *  js中字符串超长作固定长度加省略号（...）处理
   * @param str 需要进行处理的字符串，可含汉字
   * @param len 需要显示多少个汉字，两个英文字母相当于一个汉字
   * @returns {string}
   */
exports.beautySub = (str, len) => {
    let slice = str.substring(0, len),
        realen = slice.length;
    return str.substr(0, realen) + (realen < str.length ? "..." : "");
}