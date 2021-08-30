export type HighlightSQLOptions = {
  capitalizeKeywords?: boolean;
}

export default function highlightSQL(text: string, { capitalizeKeywords = false }: HighlightSQLOptions = { }): string {
  const keyWords = [
    'PRAGMA', 'CREATE', 'EXISTS', 'INTEGER', 'PRIMARY', 'VARCHAR',
    'DATETIME', 'NULL', 'REFERENCES', 'AND', 'AS', 'ASC', 'INDEX_LIST',
    'BETWEEN', 'BY', 'CASE', 'CURRENT_DATE', 'CURRENT_TIME', 'DELETE',
    'DESC', 'DISTINCT', 'EACH', 'ELSE', 'ELSEIF', 'FALSE', 'FOR', 'FROM',
    'GROUP', 'HAVING', 'IF', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS',
    'JOIN', 'KEY', 'KEYS', 'LEFT', 'LIKE', 'LIMIT', 'MATCH', 'NOT',
    'ON', 'OPTION', 'OR', 'ORDER', 'OUT', 'OUTER', 'REPLACE', 'TINYINT',
    'RIGHT', 'SELECT', 'SET', 'TABLE', 'THEN', 'TO', 'TRUE', 'UPDATE',
    'VALUES', 'WHEN', 'WHERE', 'UNSIGNED', 'CASCADE', 'UNIQUE', 'DEFAULT',
    'ENGINE', 'TEXT', 'auto_increment', 'SHOW', 'INDEX'
  ];
  const len = keyWords.length;

  // storing LC to UC map
  const keywordsMap: {[key: string]: string} = {};

  // adding lowercase keyword support
  for (let i = 0; i < len; i += 1) {
    const lcKeyWord = keyWords[i].toLowerCase();
    keywordsMap[lcKeyWord] = keyWords[i];
    keyWords.push(lcKeyWord)
  }

  let regEx;
  const clearStyle = '\x1b[0m';
  const red = '\x1b[31m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const magenta = '\x1b[35m';

  // just store original
  // to  compare for
  let newText = text;

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
  //eslint-disable-next-line
  newText = newText.replace(/([\(\)])/g, yellow + '$1' + clearStyle);

  //reserved mysql keywords
  for (let i = 0; i < keyWords.length; i += 1) {
    //regex pattern will be formulated based on the array values surrounded by word boundaries. since the replace function does not accept a string as a regex pattern, we will use a regex object this time
    regEx = new RegExp('\\b' + keyWords[i] + '\\b', 'g');
    let keyWord = keyWords[i]
    if (capitalizeKeywords && keywordsMap[keyWord]) {
      keyWord = keywordsMap[keyWord]
    }
    newText = newText.replace(regEx, magenta + keyWord + clearStyle);
  }

  return newText;
}
