import chalk from "chalk";

import { keywordsMap, regexMap, extractKeywords } from "./keywords";

//eslint-disable-next-line
namespace highlightSQL {
  export interface HighlightSQLOptions {
    capitalizeKeywords?: boolean;
  }
}

function highlightSQL(
  text: string,
  { capitalizeKeywords = false }: highlightSQL.HighlightSQLOptions = {}
): string {
  // just store original
  // to  compare for
  let newText = text;

  // first we need to find keywords used in string
  const presentKeywords = extractKeywords(text);

  // regex time
  // looking for defaults
  newText = newText.replace(/Executing \(default\): /g, "");

  // strings - text inside single quotes and backticks
  newText = newText.replace(/(['`].*?['`])/g, chalk.green("$1"));

  // numbers - same color as strings
  newText = newText.replace(/ (\d+)/g, " " + chalk.green("$1"));

  // special chars
  newText = newText.replace(/(=|%|\/|\*|-|,|;|:|\+|<|>)/g, chalk.yellow("$1"));

  // functions - any string followed by a '('
  newText = newText.replace(/(\w*?)\(/g, chalk.red("$1") + "(");

  // brackets - same as special chars
  // eslint-disable-next-line
  newText = newText.replace(/([\(\)])/g, chalk.yellow("$1"));

  // reserved mysql keywords present in string
  for (const keyWord of presentKeywords) {
    let replace = keyWord;
    // regex pattern will be formulated based on the array values surrounded by word boundaries. since the replace function does not accept a string as a regex pattern, we will use a regex object this time
    if (capitalizeKeywords && keywordsMap[keyWord]) {
      replace = keywordsMap[keyWord];
    }
    newText = newText.replace(regexMap[keyWord], chalk.magenta(replace));
  }

  return newText;
}

export = highlightSQL;
