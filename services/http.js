'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _logger = require('./logger');var _logger2 = _interopRequireDefault(_logger);
var _cryptr = require('cryptr');var _cryptr2 = _interopRequireDefault(_cryptr);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _v = require('uuid/v1');var _v2 = _interopRequireDefault(_v);
var _outgoing = require('./outgoing');
var _auth = require('./microsoft/auth');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const info = (0, _logger2.default)('services:http', 'info');
const debug = (0, _logger2.default)('services:http', 'debug');
const error = (0, _logger2.default)('services:http', 'error');

const cryptr = new _cryptr2.default(process.env.CRYPTR_SECRET || 'unsecure_secret');exports.default =

(app, controller) => {
  info('serving static assets from /public');
  app.use(_express2.default.static(_path2.default.join(__dirname, '/public')));
  const handlers = {
    auth: async function (req, res) {
      const { code, state } = req.query;
      try {
        const token = await (0, _auth.getTokenFromCode)(code, res);
        if (token) {
          debug(`storing token`);
          await controller.storage.users.save({ id: state, msToken: cryptr.encrypt(JSON.stringify(token)) });
          (0, _outgoing.notify)({
            uid: state,
            text: "Great!, you're now logged in 😊",
            trigger: 'loginSuccessful',
            controller });

        }
      } catch (err) {
        error(err);
        (0, _outgoing.notify)({
          uid: state,
          text: 'Looks like something went wrong 🙁',
          trigger: 'loginUnsuccessful',
          controller });

      }
      res.redirect('/login_success.html');
    },
    register(req, res) {
      try {
        const id = (0, _v2.default)();
        controller.storage.users.save({ id });
        // return without waiting - should be fine
        res.set('Content-Type', 'application/json');
        res.json({ success: true, id });
      } catch (err) {
        res.set('Content-Type', 'application/json');
        res.status(500).json({ success: false, message: err });
        error(err);
      }
    } };


  info(`setting up /authorize handler`);
  app.get('/authorize', handlers.auth);

  info(`setting up /register handler`);
  app.get('/register', handlers.register);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZpY2VzL2h0dHAuanMiXSwibmFtZXMiOlsiaW5mbyIsImRlYnVnIiwiZXJyb3IiLCJjcnlwdHIiLCJDcnlwdHIiLCJwcm9jZXNzIiwiZW52IiwiQ1JZUFRSX1NFQ1JFVCIsImFwcCIsImNvbnRyb2xsZXIiLCJ1c2UiLCJleHByZXNzIiwic3RhdGljIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJoYW5kbGVycyIsImF1dGgiLCJyZXEiLCJyZXMiLCJjb2RlIiwic3RhdGUiLCJxdWVyeSIsInRva2VuIiwic3RvcmFnZSIsInVzZXJzIiwic2F2ZSIsImlkIiwibXNUb2tlbiIsImVuY3J5cHQiLCJKU09OIiwic3RyaW5naWZ5IiwidWlkIiwidGV4dCIsInRyaWdnZXIiLCJlcnIiLCJyZWRpcmVjdCIsInJlZ2lzdGVyIiwic2V0IiwianNvbiIsInN1Y2Nlc3MiLCJzdGF0dXMiLCJtZXNzYWdlIiwiZ2V0Il0sIm1hcHBpbmdzIjoiMkVBQUEsa0M7QUFDQSxnQztBQUNBLDRCO0FBQ0Esa0M7QUFDQSw0QjtBQUNBO0FBQ0Esd0M7O0FBRUEsTUFBTUEsT0FBTyxzQkFBTyxlQUFQLEVBQXdCLE1BQXhCLENBQWI7QUFDQSxNQUFNQyxRQUFRLHNCQUFPLGVBQVAsRUFBd0IsT0FBeEIsQ0FBZDtBQUNBLE1BQU1DLFFBQVEsc0JBQU8sZUFBUCxFQUF3QixPQUF4QixDQUFkOztBQUVBLE1BQU1DLFNBQVMsSUFBSUMsZ0JBQUosQ0FBV0MsUUFBUUMsR0FBUixDQUFZQyxhQUFaLElBQTZCLGlCQUF4QyxDQUFmLEM7O0FBRWUsQ0FBQ0MsR0FBRCxFQUFNQyxVQUFOLEtBQXFCO0FBQ2xDVCxPQUFLLG9DQUFMO0FBQ0FRLE1BQUlFLEdBQUosQ0FBUUMsa0JBQVFDLE1BQVIsQ0FBZUMsZUFBS0MsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFNBQXJCLENBQWYsQ0FBUjtBQUNBLFFBQU1DLFdBQVc7QUFDZkMsVUFBTSxnQkFBZ0JDLEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQjtBQUM5QixZQUFNLEVBQUVDLElBQUYsRUFBUUMsS0FBUixLQUFrQkgsSUFBSUksS0FBNUI7QUFDQSxVQUFJO0FBQ0YsY0FBTUMsUUFBUSxNQUFNLDRCQUFpQkgsSUFBakIsRUFBdUJELEdBQXZCLENBQXBCO0FBQ0EsWUFBSUksS0FBSixFQUFXO0FBQ1R0QixnQkFBTyxlQUFQO0FBQ0EsZ0JBQU1RLFdBQVdlLE9BQVgsQ0FBbUJDLEtBQW5CLENBQXlCQyxJQUF6QixDQUE4QixFQUFFQyxJQUFJTixLQUFOLEVBQWFPLFNBQVN6QixPQUFPMEIsT0FBUCxDQUFlQyxLQUFLQyxTQUFMLENBQWVSLEtBQWYsQ0FBZixDQUF0QixFQUE5QixDQUFOO0FBQ0EsZ0NBQU87QUFDTFMsaUJBQUtYLEtBREE7QUFFTFksa0JBQU0saUNBRkQ7QUFHTEMscUJBQVMsaUJBSEo7QUFJTHpCLHNCQUpLLEVBQVA7O0FBTUQ7QUFDRixPQVpELENBWUUsT0FBTzBCLEdBQVAsRUFBWTtBQUNaakMsY0FBTWlDLEdBQU47QUFDQSw4QkFBTztBQUNMSCxlQUFLWCxLQURBO0FBRUxZLGdCQUFNLG9DQUZEO0FBR0xDLG1CQUFTLG1CQUhKO0FBSUx6QixvQkFKSyxFQUFQOztBQU1EO0FBQ0RVLFVBQUlpQixRQUFKLENBQWEscUJBQWI7QUFDRCxLQXpCYztBQTBCZkMsYUFBVW5CLEdBQVYsRUFBZUMsR0FBZixFQUFvQjtBQUNsQixVQUFJO0FBQ0YsY0FBTVEsS0FBSyxrQkFBWDtBQUNBbEIsbUJBQVdlLE9BQVgsQ0FBbUJDLEtBQW5CLENBQXlCQyxJQUF6QixDQUE4QixFQUFFQyxFQUFGLEVBQTlCO0FBQ0E7QUFDQVIsWUFBSW1CLEdBQUosQ0FBUSxjQUFSLEVBQXdCLGtCQUF4QjtBQUNBbkIsWUFBSW9CLElBQUosQ0FBUyxFQUFFQyxTQUFTLElBQVgsRUFBaUJiLEVBQWpCLEVBQVQ7QUFDRCxPQU5ELENBTUUsT0FBT1EsR0FBUCxFQUFZO0FBQ1poQixZQUFJbUIsR0FBSixDQUFRLGNBQVIsRUFBd0Isa0JBQXhCO0FBQ0FuQixZQUFJc0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JGLElBQWhCLENBQXFCLEVBQUVDLFNBQVMsS0FBWCxFQUFrQkUsU0FBU1AsR0FBM0IsRUFBckI7QUFDQWpDLGNBQU1pQyxHQUFOO0FBQ0Q7QUFDRixLQXRDYyxFQUFqQjs7O0FBeUNBbkMsT0FBTSwrQkFBTjtBQUNBUSxNQUFJbUMsR0FBSixDQUFRLFlBQVIsRUFBc0IzQixTQUFTQyxJQUEvQjs7QUFFQWpCLE9BQU0sOEJBQU47QUFDQVEsTUFBSW1DLEdBQUosQ0FBUSxXQUFSLEVBQXFCM0IsU0FBU3FCLFFBQTlCO0FBQ0QsQyIsImZpbGUiOiJodHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcidcbmltcG9ydCBDcnlwdHIgZnJvbSAnY3J5cHRyJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkL3YxJ1xuaW1wb3J0IHsgbm90aWZ5IH0gZnJvbSAnLi9vdXRnb2luZydcbmltcG9ydCB7IGdldFRva2VuRnJvbUNvZGUgfSBmcm9tICcuL21pY3Jvc29mdC9hdXRoJ1xuXG5jb25zdCBpbmZvID0gbG9nZ2VyKCdzZXJ2aWNlczpodHRwJywgJ2luZm8nKVxuY29uc3QgZGVidWcgPSBsb2dnZXIoJ3NlcnZpY2VzOmh0dHAnLCAnZGVidWcnKVxuY29uc3QgZXJyb3IgPSBsb2dnZXIoJ3NlcnZpY2VzOmh0dHAnLCAnZXJyb3InKVxuXG5jb25zdCBjcnlwdHIgPSBuZXcgQ3J5cHRyKHByb2Nlc3MuZW52LkNSWVBUUl9TRUNSRVQgfHwgJ3Vuc2VjdXJlX3NlY3JldCcpXG5cbmV4cG9ydCBkZWZhdWx0IChhcHAsIGNvbnRyb2xsZXIpID0+IHtcbiAgaW5mbygnc2VydmluZyBzdGF0aWMgYXNzZXRzIGZyb20gL3B1YmxpYycpXG4gIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy9wdWJsaWMnKSkpXG4gIGNvbnN0IGhhbmRsZXJzID0ge1xuICAgIGF1dGg6IGFzeW5jIGZ1bmN0aW9uIChyZXEsIHJlcykge1xuICAgICAgY29uc3QgeyBjb2RlLCBzdGF0ZSB9ID0gcmVxLnF1ZXJ5XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGdldFRva2VuRnJvbUNvZGUoY29kZSwgcmVzKVxuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICBkZWJ1Zyhgc3RvcmluZyB0b2tlbmApXG4gICAgICAgICAgYXdhaXQgY29udHJvbGxlci5zdG9yYWdlLnVzZXJzLnNhdmUoeyBpZDogc3RhdGUsIG1zVG9rZW46IGNyeXB0ci5lbmNyeXB0KEpTT04uc3RyaW5naWZ5KHRva2VuKSkgfSlcbiAgICAgICAgICBub3RpZnkoe1xuICAgICAgICAgICAgdWlkOiBzdGF0ZSxcbiAgICAgICAgICAgIHRleHQ6IFwiR3JlYXQhLCB5b3UncmUgbm93IGxvZ2dlZCBpbiDwn5iKXCIsXG4gICAgICAgICAgICB0cmlnZ2VyOiAnbG9naW5TdWNjZXNzZnVsJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZXJyb3IoZXJyKVxuICAgICAgICBub3RpZnkoe1xuICAgICAgICAgIHVpZDogc3RhdGUsXG4gICAgICAgICAgdGV4dDogJ0xvb2tzIGxpa2Ugc29tZXRoaW5nIHdlbnQgd3Jvbmcg8J+ZgScsXG4gICAgICAgICAgdHJpZ2dlcjogJ2xvZ2luVW5zdWNjZXNzZnVsJyxcbiAgICAgICAgICBjb250cm9sbGVyXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXMucmVkaXJlY3QoJy9sb2dpbl9zdWNjZXNzLmh0bWwnKVxuICAgIH0sXG4gICAgcmVnaXN0ZXIgKHJlcSwgcmVzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpZCA9IHV1aWQoKVxuICAgICAgICBjb250cm9sbGVyLnN0b3JhZ2UudXNlcnMuc2F2ZSh7IGlkIH0pXG4gICAgICAgIC8vIHJldHVybiB3aXRob3V0IHdhaXRpbmcgLSBzaG91bGQgYmUgZmluZVxuICAgICAgICByZXMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAgIHJlcy5qc29uKHsgc3VjY2VzczogdHJ1ZSwgaWQgfSlcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVyciB9KVxuICAgICAgICBlcnJvcihlcnIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5mbyhgc2V0dGluZyB1cCAvYXV0aG9yaXplIGhhbmRsZXJgKVxuICBhcHAuZ2V0KCcvYXV0aG9yaXplJywgaGFuZGxlcnMuYXV0aClcblxuICBpbmZvKGBzZXR0aW5nIHVwIC9yZWdpc3RlciBoYW5kbGVyYClcbiAgYXBwLmdldCgnL3JlZ2lzdGVyJywgaGFuZGxlcnMucmVnaXN0ZXIpXG59XG4iXX0=