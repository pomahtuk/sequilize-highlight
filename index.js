/*jslint node: true, nomen: true, indent: 2, vars: true, regexp: true */

'use strict';

var exports = function highliteSQl(text) {
  var keyWords = [
    'PRAGMA', 'CREATE', 'EXISTS', 'INTEGER', 'PRIMARY', 'VARCHAR',
    'DATETIME', 'NULL', 'REFERENCES', 'AND', 'AS', 'ASC', 'INDEX_LIST',
    'BETWEEN', 'BY', 'CASE', 'CURRENT_DATE', 'CURRENT_TIME', 'DELETE',
    'DESC', 'DISTINCT', 'EACH', 'ELSE', 'ELSEIF', 'FALSE', 'FOR', 'FROM',
    'GROUP', 'HAVING', 'IF', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS',
    'JOIN', 'KEY', 'KEYS', 'LEFT', 'LIKE', 'LIMIT', 'MATCH', 'NOT',
    'ON', 'OPTION', 'OR', 'ORDER', 'OUT', 'OUTER', 'REPLACE', 'TINYINT',
    'RIGHT', 'SELECT', 'SET', 'TABLE', 'THEN', 'TO', 'TRUE', 'UPDATE',
    'VALUES', 'WHEN', 'WHERE', 'UNSIGNED', 'CASCADE', 'UNIQUE', 'DEFAULT',
    'ENGINE', 'TEXT', 'auto_increment', 'InnoDB'
  ],
    len = keyWords.length,
    i;

  //adding lowercase keyword support
  for (i = 0; i < len; i += 1) {
    keyWords.push(keyWords[i].toLowerCase());
  }

  var regEx;
  var clearStyle = '\x1b[0m';
  var red = '\x1b[31m';
  var green = '\x1b[32m';
  var yellow = '\x1b[33m';
  var magenta = '\x1b[35m';
  // just store original
  // to  compare for
  var newText = text;

  // regex time
  // looking fo defaults
  newText = newText.replace(/Executing \(default\): /g, '');

  //numbers - same color as strings
  newText = newText.replace(/(\d+)/g, green + '$1' + clearStyle);

  // special chars
  newText = newText.replace(/(=|%|\/|\*|-|,|;|:|\+|<|>)/g, yellow + '$1' + clearStyle);

  //strings - text inside single quotes and backticks
  newText = newText.replace(/(['`].*?['`])/g, green + '$1' + clearStyle);

  //functions - any string followed by a '('
  newText = newText.replace(/(\w*?)\(/g, red + '$1' + clearStyle + '(');

  //brackets - same as special chars
  newText = newText.replace(/([\(\)])/g, yellow + '$1' + clearStyle);

  //reserved mysql keywords
  for (i = 0; i < keyWords.length; i += 1) {
    //regex pattern will be formulated based on the array values surrounded by word boundaries. since the replace function does not accept a string as a regex pattern, we will use a regex object this time
    regEx = new RegExp('\\b' + keyWords[i] + '\\b', 'g');
    newText = newText.replace(regEx, magenta + keyWords[i] + clearStyle);
  }

  console.log('Executing (default):', newText);

};

module.exports = exports;
