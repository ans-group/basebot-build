'use strict';require('./config');
var _botkit = require('botkit');var _botkit2 = _interopRequireDefault(_botkit);
var _azureTables = require('./services/storage/azureTables');var _azureTables2 = _interopRequireDefault(_azureTables);
var _bot = require('./bot');var _bot2 = _interopRequireDefault(_bot);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const botOptions = { storage: _azureTables2.default

  // Create the Botkit controller
};const controller = _botkit2.default.botframeworkbot(botOptions);

(0, _bot2.default)(controller);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbImJvdE9wdGlvbnMiLCJzdG9yYWdlIiwiY29udHJvbGxlciIsIkJvdGtpdCIsImJvdGZyYW1ld29ya2JvdCJdLCJtYXBwaW5ncyI6ImFBQUE7QUFDQSxnQztBQUNBLDZEO0FBQ0EsNEI7O0FBRUEsTUFBTUEsYUFBYSxFQUFFQzs7QUFFckI7QUFGbUIsQ0FBbkIsQ0FHQSxNQUFNQyxhQUFhQyxpQkFBT0MsZUFBUCxDQUF1QkosVUFBdkIsQ0FBbkI7O0FBRUEsbUJBQVNFLFVBQVQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vY29uZmlnJ1xuaW1wb3J0IEJvdGtpdCBmcm9tICdib3RraXQnXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3NlcnZpY2VzL3N0b3JhZ2UvYXp1cmVUYWJsZXMnXG5pbXBvcnQgc3RhcnRCb3QgZnJvbSAnLi9ib3QnXG5cbmNvbnN0IGJvdE9wdGlvbnMgPSB7IHN0b3JhZ2UgfVxuXG4vLyBDcmVhdGUgdGhlIEJvdGtpdCBjb250cm9sbGVyXG5jb25zdCBjb250cm9sbGVyID0gQm90a2l0LmJvdGZyYW1ld29ya2JvdChib3RPcHRpb25zKVxuXG5zdGFydEJvdChjb250cm9sbGVyKVxuIl19