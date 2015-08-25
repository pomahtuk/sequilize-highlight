## Sequilize SQL syntax highlight

#### Whats it all about?
Default sequelize logger is simply really hard to read and understand:

![alt tag](https://habrastorage.org/files/b08/d52/48d/b08d5248d17b414eb1d1c9cbcca4099e.png)

So with a magic of regular expressions and one bier basic MySQL syntax highlight were created:

![alt tag](https://habrastorage.org/files/a3b/ba6/14f/a3bba614f2da4ba48336be50ca607ed4.png)

#### How to use?

```javascript
// require logger
var sequelizeLogger = require('sequlize-log-highlite');
// require config
var config = require(path.join(__dirname, '/../config/config.json'))[env];

// pass a logger function to config
config.logging = sequelizeLogger;

// initialize sequlize
const sequelize = new Sequelize(config.database, config.username, config.password, config);

```

#### Final note

This is still very basic but serves me well. Commitment much appreciated.
