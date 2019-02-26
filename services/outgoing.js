'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.notify = exports.schedule = undefined;var _nodeSchedule = require('node-schedule');var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);
var _firebase = require('./firebase');
var _logger = require('./logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const debug = (0, _logger2.default)('outgoing', 'debug');
const error = (0, _logger2.default)('outgoing', 'error');

/**
                                                           * notify
                                                           * @param {Object} OutgoingMessage {uid: String, text: String, controller: botkitController, trigger: botkitTrigger}
                                                           */
const notify = async function (params) {
  try {
    debug(`sending notification:`, params);
    const { uid, text, trigger, controller } = params;
    if (!controller) return warn('Please provide a controller');
    const user = await controller.storage.users.get(uid);
    if (user && user.pushToken) {
      const notification = {
        notification: {
          body: text },

        data: {
          text,
          trigger,
          click_action: 'FLUTTER_NOTIFICATION_CLICK' },

        token: user.pushToken };

      const status = _firebase.messaging.send(notification);
      return debug(`Notification sent: `, status);
    } else {
      return error(`Can't send notification to user ${uid}: no user or push token found`);
    }
  } catch (err) {
    error(err);
  }
};

const schedule = (at, message) => {
  _nodeSchedule2.default.scheduleJob(at, () => notify(message));
};exports.

schedule = schedule;exports.notify = notify;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZpY2VzL291dGdvaW5nLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiZXJyb3IiLCJub3RpZnkiLCJwYXJhbXMiLCJ1aWQiLCJ0ZXh0IiwidHJpZ2dlciIsImNvbnRyb2xsZXIiLCJ3YXJuIiwidXNlciIsInN0b3JhZ2UiLCJ1c2VycyIsImdldCIsInB1c2hUb2tlbiIsIm5vdGlmaWNhdGlvbiIsImJvZHkiLCJkYXRhIiwiY2xpY2tfYWN0aW9uIiwidG9rZW4iLCJzdGF0dXMiLCJtZXNzYWdpbmciLCJzZW5kIiwiZXJyIiwic2NoZWR1bGUiLCJhdCIsIm1lc3NhZ2UiLCJucyIsInNjaGVkdWxlSm9iIl0sIm1hcHBpbmdzIjoieUhBQUEsNkM7QUFDQTtBQUNBLGtDOztBQUVBLE1BQU1BLFFBQVEsc0JBQU8sVUFBUCxFQUFtQixPQUFuQixDQUFkO0FBQ0EsTUFBTUMsUUFBUSxzQkFBTyxVQUFQLEVBQW1CLE9BQW5CLENBQWQ7O0FBRUE7Ozs7QUFJQSxNQUFNQyxTQUFTLGdCQUFnQkMsTUFBaEIsRUFBd0I7QUFDckMsTUFBSTtBQUNGSCxVQUFPLHVCQUFQLEVBQStCRyxNQUEvQjtBQUNBLFVBQU0sRUFBRUMsR0FBRixFQUFPQyxJQUFQLEVBQWFDLE9BQWIsRUFBc0JDLFVBQXRCLEtBQXFDSixNQUEzQztBQUNBLFFBQUksQ0FBQ0ksVUFBTCxFQUFpQixPQUFPQyxLQUFLLDZCQUFMLENBQVA7QUFDakIsVUFBTUMsT0FBTyxNQUFNRixXQUFXRyxPQUFYLENBQW1CQyxLQUFuQixDQUF5QkMsR0FBekIsQ0FBNkJSLEdBQTdCLENBQW5CO0FBQ0EsUUFBSUssUUFBUUEsS0FBS0ksU0FBakIsRUFBNEI7QUFDMUIsWUFBTUMsZUFBZTtBQUNuQkEsc0JBQWM7QUFDWkMsZ0JBQU1WLElBRE0sRUFESzs7QUFJbkJXLGNBQU07QUFDSlgsY0FESTtBQUVKQyxpQkFGSTtBQUdKVyx3QkFBYyw0QkFIVixFQUphOztBQVNuQkMsZUFBT1QsS0FBS0ksU0FUTyxFQUFyQjs7QUFXQSxZQUFNTSxTQUFTQyxvQkFBVUMsSUFBVixDQUFlUCxZQUFmLENBQWY7QUFDQSxhQUFPZCxNQUFPLHFCQUFQLEVBQTZCbUIsTUFBN0IsQ0FBUDtBQUNELEtBZEQsTUFjTztBQUNMLGFBQU9sQixNQUFPLG1DQUFrQ0csR0FBSSwrQkFBN0MsQ0FBUDtBQUNEO0FBQ0YsR0F0QkQsQ0FzQkUsT0FBT2tCLEdBQVAsRUFBWTtBQUNackIsVUFBTXFCLEdBQU47QUFDRDtBQUNGLENBMUJEOztBQTRCQSxNQUFNQyxXQUFXLENBQUNDLEVBQUQsRUFBS0MsT0FBTCxLQUFpQjtBQUNoQ0MseUJBQUdDLFdBQUgsQ0FBZUgsRUFBZixFQUFtQixNQUFNdEIsT0FBT3VCLE9BQVAsQ0FBekI7QUFDRCxDQUZELEM7O0FBSVNGLFEsR0FBQUEsUSxTQUFVckIsTSxHQUFBQSxNIiwiZmlsZSI6Im91dGdvaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5zIGZyb20gJ25vZGUtc2NoZWR1bGUnXG5pbXBvcnQgeyBtZXNzYWdpbmcgfSBmcm9tICcuL2ZpcmViYXNlJ1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcidcblxuY29uc3QgZGVidWcgPSBsb2dnZXIoJ291dGdvaW5nJywgJ2RlYnVnJylcbmNvbnN0IGVycm9yID0gbG9nZ2VyKCdvdXRnb2luZycsICdlcnJvcicpXG5cbi8qKlxuICogbm90aWZ5XG4gKiBAcGFyYW0ge09iamVjdH0gT3V0Z29pbmdNZXNzYWdlIHt1aWQ6IFN0cmluZywgdGV4dDogU3RyaW5nLCBjb250cm9sbGVyOiBib3RraXRDb250cm9sbGVyLCB0cmlnZ2VyOiBib3RraXRUcmlnZ2VyfVxuICovXG5jb25zdCBub3RpZnkgPSBhc3luYyBmdW5jdGlvbiAocGFyYW1zKSB7XG4gIHRyeSB7XG4gICAgZGVidWcoYHNlbmRpbmcgbm90aWZpY2F0aW9uOmAsIHBhcmFtcylcbiAgICBjb25zdCB7IHVpZCwgdGV4dCwgdHJpZ2dlciwgY29udHJvbGxlciB9ID0gcGFyYW1zXG4gICAgaWYgKCFjb250cm9sbGVyKSByZXR1cm4gd2FybignUGxlYXNlIHByb3ZpZGUgYSBjb250cm9sbGVyJylcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgY29udHJvbGxlci5zdG9yYWdlLnVzZXJzLmdldCh1aWQpXG4gICAgaWYgKHVzZXIgJiYgdXNlci5wdXNoVG9rZW4pIHtcbiAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IHtcbiAgICAgICAgbm90aWZpY2F0aW9uOiB7XG4gICAgICAgICAgYm9keTogdGV4dFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGV4dCxcbiAgICAgICAgICB0cmlnZ2VyLFxuICAgICAgICAgIGNsaWNrX2FjdGlvbjogJ0ZMVVRURVJfTk9USUZJQ0FUSU9OX0NMSUNLJ1xuICAgICAgICB9LFxuICAgICAgICB0b2tlbjogdXNlci5wdXNoVG9rZW5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0YXR1cyA9IG1lc3NhZ2luZy5zZW5kKG5vdGlmaWNhdGlvbilcbiAgICAgIHJldHVybiBkZWJ1ZyhgTm90aWZpY2F0aW9uIHNlbnQ6IGAsIHN0YXR1cylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVycm9yKGBDYW4ndCBzZW5kIG5vdGlmaWNhdGlvbiB0byB1c2VyICR7dWlkfTogbm8gdXNlciBvciBwdXNoIHRva2VuIGZvdW5kYClcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVycm9yKGVycilcbiAgfVxufVxuXG5jb25zdCBzY2hlZHVsZSA9IChhdCwgbWVzc2FnZSkgPT4ge1xuICBucy5zY2hlZHVsZUpvYihhdCwgKCkgPT4gbm90aWZ5KG1lc3NhZ2UpKVxufVxuXG5leHBvcnQgeyBzY2hlZHVsZSwgbm90aWZ5IH1cbiJdfQ==