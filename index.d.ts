export interface highlightSQLOptions {
  capitalizeKeywords?:boolean
}

declare module 'sequelize-log-syntax-colors' {
  export default function highlightSQL(text: string, options?:highlightSQLOptions): string;
}
