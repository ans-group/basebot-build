'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =











function (controller, bot) {
  bot = bot || controller.spawn({
    appId: process.env.MS_APP_ID,
    appPassword: process.env.MS_APP_PASSWORD,
    require_delivery: false });


  const luisOptions = {
    serviceUri: process.env.LUIS_URI,
    minThreshold: 0.1


    // create the webserver
  };(0, _webserver2.default)(controller, bot).
  then(app => (0, _http2.default)(app, controller)).
  catch(err => error(err));

  // Start the bot
  controller.startTicking();

  // activate middleware
  Object.values(middleware).forEach(fn => fn(controller));
  // add LUIS middleware
  controller.middleware.receive.use(_botkitMiddlewareLuis2.default.middleware.receive(luisOptions));

  // activate the bots skills
  Object.values(skills).forEach(definitions => {
    definitions.forEach(skill => {
      if (skill.hears) {
        if (skill.bypassLuis) {
          controller.hears(skill.hears, 'message_received', (bot, message) => skill.response(bot, message, controller));
        } else {
          controller.hears(skill.hears, 'message_received', _botkitMiddlewareLuis2.default.middleware.hereIntent(), (bot, message) => skill.response(bot, message, controller));
        }
      } else if (skill.on) {
        controller.on(skill.on, (bot, message) => skill.response(bot, message, controller));
      }
    });
  });

  // default response
  controller.hears('.*', 'message_received', _qnaMaker2.default);

  info('bot online');
};require('./config');var _logger = require('./services/logger');var _logger2 = _interopRequireDefault(_logger);var _botkitMiddlewareLuis = require('botkit-middleware-luis');var _botkitMiddlewareLuis2 = _interopRequireDefault(_botkitMiddlewareLuis);var _webserver = require('./services/webserver');var _webserver2 = _interopRequireDefault(_webserver);var _http = require('./services/http');var _http2 = _interopRequireDefault(_http);var _qnaMaker = require('./services/qnaMaker');var _qnaMaker2 = _interopRequireDefault(_qnaMaker);var _auth = require('./skills/auth.js');var _auth2 = _interopRequireDefault(_auth);var _calendar = require('./skills/calendar.js');var _calendar2 = _interopRequireDefault(_calendar);var _debug = require('./skills/debug.js');var _debug2 = _interopRequireDefault(_debug);var _onboarding = require('./skills/onboarding.js');var _onboarding2 = _interopRequireDefault(_onboarding);var _social = require('./skills/social.js');var _social2 = _interopRequireDefault(_social);var _trigger = require('./skills/trigger.js');var _trigger2 = _interopRequireDefault(_trigger);var _debug3 = require('./middleware/debug.js');var _debug4 = _interopRequireDefault(_debug3);var _registerPushTokens = require('./middleware/registerPushTokens.js');var _registerPushTokens2 = _interopRequireDefault(_registerPushTokens);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}const skills = { authJs: _auth2.default, calendarJs: _calendar2.default, debugJs: _debug2.default, onboardingJs: _onboarding2.default, socialJs: _social2.default, triggerJs: _trigger2.default };Object.freeze(skills);const middleware = { debugJs: _debug4.default, registerPushTokensJs: _registerPushTokens2.default };Object.freeze(middleware);const info = (0, _logger2.default)('main', 'info');const error = (0, _logger2.default)('main', 'error');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2JvdC5qcyJdLCJuYW1lcyI6WyJjb250cm9sbGVyIiwiYm90Iiwic3Bhd24iLCJhcHBJZCIsInByb2Nlc3MiLCJlbnYiLCJNU19BUFBfSUQiLCJhcHBQYXNzd29yZCIsIk1TX0FQUF9QQVNTV09SRCIsInJlcXVpcmVfZGVsaXZlcnkiLCJsdWlzT3B0aW9ucyIsInNlcnZpY2VVcmkiLCJMVUlTX1VSSSIsIm1pblRocmVzaG9sZCIsInRoZW4iLCJhcHAiLCJjYXRjaCIsImVyciIsImVycm9yIiwic3RhcnRUaWNraW5nIiwiT2JqZWN0IiwidmFsdWVzIiwibWlkZGxld2FyZSIsImZvckVhY2giLCJmbiIsInJlY2VpdmUiLCJ1c2UiLCJsdWlzIiwic2tpbGxzIiwiZGVmaW5pdGlvbnMiLCJza2lsbCIsImhlYXJzIiwiYnlwYXNzTHVpcyIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsImhlcmVJbnRlbnQiLCJvbiIsInFuYU1ha2VyIiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBWWUsVUFBU0EsVUFBVCxFQUFxQkMsR0FBckIsRUFBMEI7QUFDdkNBLFFBQU1BLE9BQU9ELFdBQVdFLEtBQVgsQ0FBaUI7QUFDNUJDLFdBQU9DLFFBQVFDLEdBQVIsQ0FBWUMsU0FEUztBQUU1QkMsaUJBQWFILFFBQVFDLEdBQVIsQ0FBWUcsZUFGRztBQUc1QkMsc0JBQWtCLEtBSFUsRUFBakIsQ0FBYjs7O0FBTUEsUUFBTUMsY0FBYztBQUNsQkMsZ0JBQVlQLFFBQVFDLEdBQVIsQ0FBWU8sUUFETjtBQUVsQkMsa0JBQWM7OztBQUdoQjtBQUxvQixHQUFwQixDQU1BLHlCQUFVYixVQUFWLEVBQXNCQyxHQUF0QjtBQUNHYSxNQURILENBQ1FDLE9BQU8sb0JBQUtBLEdBQUwsRUFBVWYsVUFBVixDQURmO0FBRUdnQixPQUZILENBRVNDLE9BQU9DLE1BQU1ELEdBQU4sQ0FGaEI7O0FBSUE7QUFDQWpCLGFBQVdtQixZQUFYOztBQUVBO0FBQ0FDLFNBQU9DLE1BQVAsQ0FBY0MsVUFBZCxFQUEwQkMsT0FBMUIsQ0FBa0NDLE1BQU1BLEdBQUd4QixVQUFILENBQXhDO0FBQ0E7QUFDQUEsYUFBV3NCLFVBQVgsQ0FBc0JHLE9BQXRCLENBQThCQyxHQUE5QixDQUFrQ0MsK0JBQUtMLFVBQUwsQ0FBZ0JHLE9BQWhCLENBQXdCZixXQUF4QixDQUFsQzs7QUFFQTtBQUNBVSxTQUFPQyxNQUFQLENBQWNPLE1BQWQsRUFBc0JMLE9BQXRCLENBQThCTSxlQUFlO0FBQzNDQSxnQkFBWU4sT0FBWixDQUFvQk8sU0FBUztBQUMzQixVQUFJQSxNQUFNQyxLQUFWLEVBQWlCO0FBQ2YsWUFBSUQsTUFBTUUsVUFBVixFQUFzQjtBQUNwQmhDLHFCQUFXK0IsS0FBWCxDQUFpQkQsTUFBTUMsS0FBdkIsRUFBOEIsa0JBQTlCLEVBQWtELENBQUM5QixHQUFELEVBQU1nQyxPQUFOLEtBQWtCSCxNQUFNSSxRQUFOLENBQWVqQyxHQUFmLEVBQW9CZ0MsT0FBcEIsRUFBNkJqQyxVQUE3QixDQUFwRTtBQUNELFNBRkQsTUFFTztBQUNMQSxxQkFBVytCLEtBQVgsQ0FBaUJELE1BQU1DLEtBQXZCLEVBQThCLGtCQUE5QixFQUFrREosK0JBQUtMLFVBQUwsQ0FBZ0JhLFVBQWhCLEVBQWxELEVBQWdGLENBQUNsQyxHQUFELEVBQU1nQyxPQUFOLEtBQWtCSCxNQUFNSSxRQUFOLENBQWVqQyxHQUFmLEVBQW9CZ0MsT0FBcEIsRUFBNkJqQyxVQUE3QixDQUFsRztBQUNEO0FBQ0YsT0FORCxNQU1PLElBQUk4QixNQUFNTSxFQUFWLEVBQWM7QUFDbkJwQyxtQkFBV29DLEVBQVgsQ0FBY04sTUFBTU0sRUFBcEIsRUFBd0IsQ0FBQ25DLEdBQUQsRUFBTWdDLE9BQU4sS0FBa0JILE1BQU1JLFFBQU4sQ0FBZWpDLEdBQWYsRUFBb0JnQyxPQUFwQixFQUE2QmpDLFVBQTdCLENBQTFDO0FBQ0Q7QUFDRixLQVZEO0FBV0QsR0FaRDs7QUFjQTtBQUNBQSxhQUFXK0IsS0FBWCxDQUFpQixJQUFqQixFQUF1QixrQkFBdkIsRUFBMkNNLGtCQUEzQzs7QUFFQUMsT0FBSyxZQUFMO0FBQ0QsQyxDQXhERCxvQkFDQSwyQywrQ0FDQSw4RCwyRUFDQSxpRCxxREFDQSx1QywyQ0FDQSwrQyxvd0NBSUEsTUFBTUEsT0FBTyxzQkFBTyxNQUFQLEVBQWUsTUFBZixDQUFiLENBQ0EsTUFBTXBCLFFBQVEsc0JBQU8sTUFBUCxFQUFlLE9BQWYsQ0FBZCIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vY29uZmlnJ1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL3NlcnZpY2VzL2xvZ2dlcidcbmltcG9ydCBsdWlzIGZyb20gJ2JvdGtpdC1taWRkbGV3YXJlLWx1aXMnXG5pbXBvcnQgd2Vic2VydmVyIGZyb20gJy4vc2VydmljZXMvd2Vic2VydmVyJ1xuaW1wb3J0IGh0dHAgZnJvbSAnLi9zZXJ2aWNlcy9odHRwJ1xuaW1wb3J0IHFuYU1ha2VyIGZyb20gJy4vc2VydmljZXMvcW5hTWFrZXInXG5pbXBvcnQgKiBhcyBza2lsbHMgZnJvbSAnLi9za2lsbHMvKidcbmltcG9ydCAqIGFzIG1pZGRsZXdhcmUgZnJvbSAnLi9taWRkbGV3YXJlLyonXG5cbmNvbnN0IGluZm8gPSBsb2dnZXIoJ21haW4nLCAnaW5mbycpXG5jb25zdCBlcnJvciA9IGxvZ2dlcignbWFpbicsICdlcnJvcicpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbnRyb2xsZXIsIGJvdCkge1xuICBib3QgPSBib3QgfHwgY29udHJvbGxlci5zcGF3bih7XG4gICAgYXBwSWQ6IHByb2Nlc3MuZW52Lk1TX0FQUF9JRCxcbiAgICBhcHBQYXNzd29yZDogcHJvY2Vzcy5lbnYuTVNfQVBQX1BBU1NXT1JELFxuICAgIHJlcXVpcmVfZGVsaXZlcnk6IGZhbHNlXG4gIH0pXG5cbiAgY29uc3QgbHVpc09wdGlvbnMgPSB7XG4gICAgc2VydmljZVVyaTogcHJvY2Vzcy5lbnYuTFVJU19VUkksXG4gICAgbWluVGhyZXNob2xkOiAwLjFcbiAgfVxuXG4gIC8vIGNyZWF0ZSB0aGUgd2Vic2VydmVyXG4gIHdlYnNlcnZlcihjb250cm9sbGVyLCBib3QpXG4gICAgLnRoZW4oYXBwID0+IGh0dHAoYXBwLCBjb250cm9sbGVyKSlcbiAgICAuY2F0Y2goZXJyID0+IGVycm9yKGVycikpXG5cbiAgLy8gU3RhcnQgdGhlIGJvdFxuICBjb250cm9sbGVyLnN0YXJ0VGlja2luZygpXG5cbiAgLy8gYWN0aXZhdGUgbWlkZGxld2FyZVxuICBPYmplY3QudmFsdWVzKG1pZGRsZXdhcmUpLmZvckVhY2goZm4gPT4gZm4oY29udHJvbGxlcikpXG4gIC8vIGFkZCBMVUlTIG1pZGRsZXdhcmVcbiAgY29udHJvbGxlci5taWRkbGV3YXJlLnJlY2VpdmUudXNlKGx1aXMubWlkZGxld2FyZS5yZWNlaXZlKGx1aXNPcHRpb25zKSlcblxuICAvLyBhY3RpdmF0ZSB0aGUgYm90cyBza2lsbHNcbiAgT2JqZWN0LnZhbHVlcyhza2lsbHMpLmZvckVhY2goZGVmaW5pdGlvbnMgPT4ge1xuICAgIGRlZmluaXRpb25zLmZvckVhY2goc2tpbGwgPT4ge1xuICAgICAgaWYgKHNraWxsLmhlYXJzKSB7XG4gICAgICAgIGlmIChza2lsbC5ieXBhc3NMdWlzKSB7XG4gICAgICAgICAgY29udHJvbGxlci5oZWFycyhza2lsbC5oZWFycywgJ21lc3NhZ2VfcmVjZWl2ZWQnLCAoYm90LCBtZXNzYWdlKSA9PiBza2lsbC5yZXNwb25zZShib3QsIG1lc3NhZ2UsIGNvbnRyb2xsZXIpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnRyb2xsZXIuaGVhcnMoc2tpbGwuaGVhcnMsICdtZXNzYWdlX3JlY2VpdmVkJywgbHVpcy5taWRkbGV3YXJlLmhlcmVJbnRlbnQoKSwgKGJvdCwgbWVzc2FnZSkgPT4gc2tpbGwucmVzcG9uc2UoYm90LCBtZXNzYWdlLCBjb250cm9sbGVyKSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChza2lsbC5vbikge1xuICAgICAgICBjb250cm9sbGVyLm9uKHNraWxsLm9uLCAoYm90LCBtZXNzYWdlKSA9PiBza2lsbC5yZXNwb25zZShib3QsIG1lc3NhZ2UsIGNvbnRyb2xsZXIpKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgLy8gZGVmYXVsdCByZXNwb25zZVxuICBjb250cm9sbGVyLmhlYXJzKCcuKicsICdtZXNzYWdlX3JlY2VpdmVkJywgcW5hTWFrZXIpXG5cbiAgaW5mbygnYm90IG9ubGluZScpXG59XG4iXX0=