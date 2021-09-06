## Sequilize SQL syntax highlight

#### Whats it all about?

Default sequelize logger is simply really hard to read and understand:

![alt tag](https://habrastorage.org/files/b08/d52/48d/b08d5248d17b414eb1d1c9cbcca4099e.png)

So with a magic of regular expressions and one bier basic MySQL syntax highlight were created:

![alt tag](https://habrastorage.org/files/a3b/ba6/14f/a3bba614f2da4ba48336be50ca607ed4.png)

#### How to use?

- Install via npm

```bash
npm install sequelize-log-syntax-colors
```

- Use in code

```javascript
// require logger
var sequelizeLogger = require('sequelize-log-syntax-colors');
// require config
var config = require(path.join(__dirname, '/../config/config.json'))[env];

// pass a logger function to config
config.logging = sequelizeLogger;

// initialize sequlize
const sequelize = new Sequelize(config.database, config.username, config.password, assign(config, {
  logging : function(text) { console.log(colors(text)); }
}));

// OR use it with Winston

const log = require('./my-loggers');
const sequelize = new Sequelize(config.database, config.username, config.password, assign(config, {
  logging : log.database.info
}));

// setting up winstons loggers
const winston = require('winston');
const common = require('../../node_modules/winston/lib/winston/common');
const colors = require('sequelize-log-syntax-colors');

winston.loggers.add('database', {
  console: {
    level: 'info',
    colorize: true,
    label: 'sequelize',
    formatter: function(obj) {
      var colorfull = {
        colorize: true,
        label: obj.label,
        level: obj.level,
        message: colors(obj.message)
      }
      return common.log(colorfull);
    }
  },
  ...
});

module.exports = winston.loggers.loggers;

```

#### Final note

This is still very basic but serves me well. Commitment much appreciated.
