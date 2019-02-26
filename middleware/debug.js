'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _logger = require('../services/logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const debug = (0, _logger2.default)('messages', 'debug');exports.default =

controller => {
  controller.middleware.receive.use(async function (bot, message, next) {
    debug(message);
    next();
  });
  controller.middleware.send.use(async function (bot, message, next) {
    debug(message);
    next();
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL21pZGRsZXdhcmUvZGVidWcuanMiXSwibmFtZXMiOlsiZGVidWciLCJjb250cm9sbGVyIiwibWlkZGxld2FyZSIsInJlY2VpdmUiLCJ1c2UiLCJib3QiLCJtZXNzYWdlIiwibmV4dCIsInNlbmQiXSwibWFwcGluZ3MiOiIyRUFBQSw0Qzs7QUFFQSxNQUFNQSxRQUFRLHNCQUFPLFVBQVAsRUFBbUIsT0FBbkIsQ0FBZCxDOztBQUVlQyxjQUFjO0FBQzNCQSxhQUFXQyxVQUFYLENBQXNCQyxPQUF0QixDQUE4QkMsR0FBOUIsQ0FBa0MsZ0JBQWVDLEdBQWYsRUFBb0JDLE9BQXBCLEVBQTZCQyxJQUE3QixFQUFtQztBQUNuRVAsVUFBTU0sT0FBTjtBQUNBQztBQUNELEdBSEQ7QUFJQU4sYUFBV0MsVUFBWCxDQUFzQk0sSUFBdEIsQ0FBMkJKLEdBQTNCLENBQStCLGdCQUFlQyxHQUFmLEVBQW9CQyxPQUFwQixFQUE2QkMsSUFBN0IsRUFBbUM7QUFDaEVQLFVBQU1NLE9BQU47QUFDQUM7QUFDRCxHQUhEO0FBSUQsQyIsImZpbGUiOiJkZWJ1Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2dnZXIgZnJvbSAnLi4vc2VydmljZXMvbG9nZ2VyJ1xuXG5jb25zdCBkZWJ1ZyA9IGxvZ2dlcignbWVzc2FnZXMnLCAnZGVidWcnKVxuXG5leHBvcnQgZGVmYXVsdCBjb250cm9sbGVyID0+IHtcbiAgY29udHJvbGxlci5taWRkbGV3YXJlLnJlY2VpdmUudXNlKGFzeW5jIGZ1bmN0aW9uKGJvdCwgbWVzc2FnZSwgbmV4dCkge1xuICAgIGRlYnVnKG1lc3NhZ2UpXG4gICAgbmV4dCgpXG4gIH0pXG4gIGNvbnRyb2xsZXIubWlkZGxld2FyZS5zZW5kLnVzZShhc3luYyBmdW5jdGlvbihib3QsIG1lc3NhZ2UsIG5leHQpIHtcbiAgICBkZWJ1ZyhtZXNzYWdlKVxuICAgIG5leHQoKVxuICB9KVxufVxuIl19