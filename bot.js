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
  controller.hears('.*', 'message_received', (bot, message) => {
    bot.reply(message, `Didn't catch that, sorry`);
  });

  info('bot online');
};require('./config');var _logger = require('./services/logger');var _logger2 = _interopRequireDefault(_logger);var _botkitMiddlewareLuis = require('botkit-middleware-luis');var _botkitMiddlewareLuis2 = _interopRequireDefault(_botkitMiddlewareLuis);var _webserver = require('./services/webserver');var _webserver2 = _interopRequireDefault(_webserver);var _http = require('./services/http');var _http2 = _interopRequireDefault(_http);var _auth = require('./skills/auth.js');var _auth2 = _interopRequireDefault(_auth);var _calendar = require('./skills/calendar.js');var _calendar2 = _interopRequireDefault(_calendar);var _debug = require('./skills/debug.js');var _debug2 = _interopRequireDefault(_debug);var _onboarding = require('./skills/onboarding.js');var _onboarding2 = _interopRequireDefault(_onboarding);var _social = require('./skills/social.js');var _social2 = _interopRequireDefault(_social);var _trigger = require('./skills/trigger.js');var _trigger2 = _interopRequireDefault(_trigger);var _debug3 = require('./middleware/debug.js');var _debug4 = _interopRequireDefault(_debug3);var _qnaMaker = require('./middleware/qnaMaker.js');var _qnaMaker2 = _interopRequireDefault(_qnaMaker);var _registerPushTokens = require('./middleware/registerPushTokens.js');var _registerPushTokens2 = _interopRequireDefault(_registerPushTokens);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}const skills = { authJs: _auth2.default, calendarJs: _calendar2.default, debugJs: _debug2.default, onboardingJs: _onboarding2.default, socialJs: _social2.default, triggerJs: _trigger2.default };Object.freeze(skills);const middleware = { debugJs: _debug4.default, qnaMakerJs: _qnaMaker2.default, registerPushTokensJs: _registerPushTokens2.default };Object.freeze(middleware);const info = (0, _logger2.default)('main', 'info');const error = (0, _logger2.default)('main', 'error');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2JvdC5qcyJdLCJuYW1lcyI6WyJjb250cm9sbGVyIiwiYm90Iiwic3Bhd24iLCJhcHBJZCIsInByb2Nlc3MiLCJlbnYiLCJNU19BUFBfSUQiLCJhcHBQYXNzd29yZCIsIk1TX0FQUF9QQVNTV09SRCIsInJlcXVpcmVfZGVsaXZlcnkiLCJsdWlzT3B0aW9ucyIsInNlcnZpY2VVcmkiLCJMVUlTX1VSSSIsIm1pblRocmVzaG9sZCIsInRoZW4iLCJhcHAiLCJjYXRjaCIsImVyciIsImVycm9yIiwic3RhcnRUaWNraW5nIiwiT2JqZWN0IiwidmFsdWVzIiwibWlkZGxld2FyZSIsImZvckVhY2giLCJmbiIsInJlY2VpdmUiLCJ1c2UiLCJsdWlzIiwic2tpbGxzIiwiZGVmaW5pdGlvbnMiLCJza2lsbCIsImhlYXJzIiwiYnlwYXNzTHVpcyIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsImhlcmVJbnRlbnQiLCJvbiIsInJlcGx5IiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFXZSxVQUFTQSxVQUFULEVBQXFCQyxHQUFyQixFQUEwQjtBQUN2Q0EsUUFBTUEsT0FBT0QsV0FBV0UsS0FBWCxDQUFpQjtBQUM1QkMsV0FBT0MsUUFBUUMsR0FBUixDQUFZQyxTQURTO0FBRTVCQyxpQkFBYUgsUUFBUUMsR0FBUixDQUFZRyxlQUZHO0FBRzVCQyxzQkFBa0IsS0FIVSxFQUFqQixDQUFiOzs7QUFNQSxRQUFNQyxjQUFjO0FBQ2xCQyxnQkFBWVAsUUFBUUMsR0FBUixDQUFZTyxRQUROO0FBRWxCQyxrQkFBYzs7O0FBR2hCO0FBTG9CLEdBQXBCLENBTUEseUJBQVViLFVBQVYsRUFBc0JDLEdBQXRCO0FBQ0dhLE1BREgsQ0FDUUMsT0FBTyxvQkFBS0EsR0FBTCxFQUFVZixVQUFWLENBRGY7QUFFR2dCLE9BRkgsQ0FFU0MsT0FBT0MsTUFBTUQsR0FBTixDQUZoQjs7QUFJQTtBQUNBakIsYUFBV21CLFlBQVg7O0FBRUE7QUFDQUMsU0FBT0MsTUFBUCxDQUFjQyxVQUFkLEVBQTBCQyxPQUExQixDQUFrQ0MsTUFBTUEsR0FBR3hCLFVBQUgsQ0FBeEM7QUFDQTtBQUNBQSxhQUFXc0IsVUFBWCxDQUFzQkcsT0FBdEIsQ0FBOEJDLEdBQTlCLENBQWtDQywrQkFBS0wsVUFBTCxDQUFnQkcsT0FBaEIsQ0FBd0JmLFdBQXhCLENBQWxDOztBQUVBO0FBQ0FVLFNBQU9DLE1BQVAsQ0FBY08sTUFBZCxFQUFzQkwsT0FBdEIsQ0FBOEJNLGVBQWU7QUFDM0NBLGdCQUFZTixPQUFaLENBQW9CTyxTQUFTO0FBQzNCLFVBQUlBLE1BQU1DLEtBQVYsRUFBaUI7QUFDZixZQUFJRCxNQUFNRSxVQUFWLEVBQXNCO0FBQ3BCaEMscUJBQVcrQixLQUFYLENBQWlCRCxNQUFNQyxLQUF2QixFQUE4QixrQkFBOUIsRUFBa0QsQ0FBQzlCLEdBQUQsRUFBTWdDLE9BQU4sS0FBa0JILE1BQU1JLFFBQU4sQ0FBZWpDLEdBQWYsRUFBb0JnQyxPQUFwQixFQUE2QmpDLFVBQTdCLENBQXBFO0FBQ0QsU0FGRCxNQUVPO0FBQ0xBLHFCQUFXK0IsS0FBWCxDQUFpQkQsTUFBTUMsS0FBdkIsRUFBOEIsa0JBQTlCLEVBQWtESiwrQkFBS0wsVUFBTCxDQUFnQmEsVUFBaEIsRUFBbEQsRUFBZ0YsQ0FBQ2xDLEdBQUQsRUFBTWdDLE9BQU4sS0FBa0JILE1BQU1JLFFBQU4sQ0FBZWpDLEdBQWYsRUFBb0JnQyxPQUFwQixFQUE2QmpDLFVBQTdCLENBQWxHO0FBQ0Q7QUFDRixPQU5ELE1BTU8sSUFBSThCLE1BQU1NLEVBQVYsRUFBYztBQUNuQnBDLG1CQUFXb0MsRUFBWCxDQUFjTixNQUFNTSxFQUFwQixFQUF3QixDQUFDbkMsR0FBRCxFQUFNZ0MsT0FBTixLQUFrQkgsTUFBTUksUUFBTixDQUFlakMsR0FBZixFQUFvQmdDLE9BQXBCLEVBQTZCakMsVUFBN0IsQ0FBMUM7QUFDRDtBQUNGLEtBVkQ7QUFXRCxHQVpEOztBQWNBO0FBQ0FBLGFBQVcrQixLQUFYLENBQWlCLElBQWpCLEVBQXVCLGtCQUF2QixFQUEyQyxDQUFDOUIsR0FBRCxFQUFNZ0MsT0FBTixLQUFrQjtBQUMzRGhDLFFBQUlvQyxLQUFKLENBQVVKLE9BQVYsRUFBb0IsMEJBQXBCO0FBQ0QsR0FGRDs7QUFJQUssT0FBSyxZQUFMO0FBQ0QsQyxDQXpERCxvQkFDQSwyQywrQ0FDQSw4RCwyRUFDQSxpRCxxREFDQSx1QyxtNENBSUEsTUFBTUEsT0FBTyxzQkFBTyxNQUFQLEVBQWUsTUFBZixDQUFiLENBQ0EsTUFBTXBCLFFBQVEsc0JBQU8sTUFBUCxFQUFlLE9BQWYsQ0FBZCIsImZpbGUiOiJib3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vY29uZmlnJ1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL3NlcnZpY2VzL2xvZ2dlcidcbmltcG9ydCBsdWlzIGZyb20gJ2JvdGtpdC1taWRkbGV3YXJlLWx1aXMnXG5pbXBvcnQgd2Vic2VydmVyIGZyb20gJy4vc2VydmljZXMvd2Vic2VydmVyJ1xuaW1wb3J0IGh0dHAgZnJvbSAnLi9zZXJ2aWNlcy9odHRwJ1xuaW1wb3J0ICogYXMgc2tpbGxzIGZyb20gJy4vc2tpbGxzLyonXG5pbXBvcnQgKiBhcyBtaWRkbGV3YXJlIGZyb20gJy4vbWlkZGxld2FyZS8qJ1xuXG5jb25zdCBpbmZvID0gbG9nZ2VyKCdtYWluJywgJ2luZm8nKVxuY29uc3QgZXJyb3IgPSBsb2dnZXIoJ21haW4nLCAnZXJyb3InKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb250cm9sbGVyLCBib3QpIHtcbiAgYm90ID0gYm90IHx8IGNvbnRyb2xsZXIuc3Bhd24oe1xuICAgIGFwcElkOiBwcm9jZXNzLmVudi5NU19BUFBfSUQsXG4gICAgYXBwUGFzc3dvcmQ6IHByb2Nlc3MuZW52Lk1TX0FQUF9QQVNTV09SRCxcbiAgICByZXF1aXJlX2RlbGl2ZXJ5OiBmYWxzZVxuICB9KVxuXG4gIGNvbnN0IGx1aXNPcHRpb25zID0ge1xuICAgIHNlcnZpY2VVcmk6IHByb2Nlc3MuZW52LkxVSVNfVVJJLFxuICAgIG1pblRocmVzaG9sZDogMC4xXG4gIH1cblxuICAvLyBjcmVhdGUgdGhlIHdlYnNlcnZlclxuICB3ZWJzZXJ2ZXIoY29udHJvbGxlciwgYm90KVxuICAgIC50aGVuKGFwcCA9PiBodHRwKGFwcCwgY29udHJvbGxlcikpXG4gICAgLmNhdGNoKGVyciA9PiBlcnJvcihlcnIpKVxuXG4gIC8vIFN0YXJ0IHRoZSBib3RcbiAgY29udHJvbGxlci5zdGFydFRpY2tpbmcoKVxuXG4gIC8vIGFjdGl2YXRlIG1pZGRsZXdhcmVcbiAgT2JqZWN0LnZhbHVlcyhtaWRkbGV3YXJlKS5mb3JFYWNoKGZuID0+IGZuKGNvbnRyb2xsZXIpKVxuICAvLyBhZGQgTFVJUyBtaWRkbGV3YXJlXG4gIGNvbnRyb2xsZXIubWlkZGxld2FyZS5yZWNlaXZlLnVzZShsdWlzLm1pZGRsZXdhcmUucmVjZWl2ZShsdWlzT3B0aW9ucykpXG5cbiAgLy8gYWN0aXZhdGUgdGhlIGJvdHMgc2tpbGxzXG4gIE9iamVjdC52YWx1ZXMoc2tpbGxzKS5mb3JFYWNoKGRlZmluaXRpb25zID0+IHtcbiAgICBkZWZpbml0aW9ucy5mb3JFYWNoKHNraWxsID0+IHtcbiAgICAgIGlmIChza2lsbC5oZWFycykge1xuICAgICAgICBpZiAoc2tpbGwuYnlwYXNzTHVpcykge1xuICAgICAgICAgIGNvbnRyb2xsZXIuaGVhcnMoc2tpbGwuaGVhcnMsICdtZXNzYWdlX3JlY2VpdmVkJywgKGJvdCwgbWVzc2FnZSkgPT4gc2tpbGwucmVzcG9uc2UoYm90LCBtZXNzYWdlLCBjb250cm9sbGVyKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250cm9sbGVyLmhlYXJzKHNraWxsLmhlYXJzLCAnbWVzc2FnZV9yZWNlaXZlZCcsIGx1aXMubWlkZGxld2FyZS5oZXJlSW50ZW50KCksIChib3QsIG1lc3NhZ2UpID0+IHNraWxsLnJlc3BvbnNlKGJvdCwgbWVzc2FnZSwgY29udHJvbGxlcikpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc2tpbGwub24pIHtcbiAgICAgICAgY29udHJvbGxlci5vbihza2lsbC5vbiwgKGJvdCwgbWVzc2FnZSkgPT4gc2tpbGwucmVzcG9uc2UoYm90LCBtZXNzYWdlLCBjb250cm9sbGVyKSlcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIC8vIGRlZmF1bHQgcmVzcG9uc2VcbiAgY29udHJvbGxlci5oZWFycygnLionLCAnbWVzc2FnZV9yZWNlaXZlZCcsIChib3QsIG1lc3NhZ2UpID0+IHtcbiAgICBib3QucmVwbHkobWVzc2FnZSwgYERpZG4ndCBjYXRjaCB0aGF0LCBzb3JyeWApXG4gIH0pXG5cbiAgaW5mbygnYm90IG9ubGluZScpXG59XG4iXX0=