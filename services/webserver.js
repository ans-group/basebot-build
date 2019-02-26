'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _logger = require('./logger');var _logger2 = _interopRequireDefault(_logger);
var _localtunnel = require('localtunnel');var _localtunnel2 = _interopRequireDefault(_localtunnel);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const info = (0, _logger2.default)('webserver', 'info');exports.default =

(controller, bot) => new Promise((resolve, reject) => {
  controller.setupWebserver(process.env.PORT || 3000, (err, webserver) => {
    if (err) {
      reject(err);
    }
    if (process.env.NODE_ENV !== 'test') {
      controller.createWebhookEndpoints(webserver, bot, () => {
        info('server online');
        if (process.env.USE_LT_SUBDOMAIN) {
          const tunnel = (0, _localtunnel2.default)(process.env.PORT || 3000, { subdomain: process.env.USE_LT_SUBDOMAIN }, (err, tunnel) => {
            if (err) {
              throw err;
            }
            /* eslint-disable */
            info(`Your bot is available on the web at the following URL: ${tunnel.url}/botframework/receive`);
            /* eslint-enable */
          });

          tunnel.on('close', () => {
            /* eslint-disable */
            info('Your bot is no longer available on the web at the localtunnnel.me URL.');
            /* eslint-enable */
            process.exit();
          });
        }
      });
    }
    resolve(webserver);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZpY2VzL3dlYnNlcnZlci5qcyJdLCJuYW1lcyI6WyJpbmZvIiwiY29udHJvbGxlciIsImJvdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic2V0dXBXZWJzZXJ2ZXIiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImVyciIsIndlYnNlcnZlciIsIk5PREVfRU5WIiwiY3JlYXRlV2ViaG9va0VuZHBvaW50cyIsIlVTRV9MVF9TVUJET01BSU4iLCJ0dW5uZWwiLCJzdWJkb21haW4iLCJ1cmwiLCJvbiIsImV4aXQiXSwibWFwcGluZ3MiOiIyRUFBQSxrQztBQUNBLDBDOztBQUVBLE1BQU1BLE9BQU8sc0JBQU8sV0FBUCxFQUFvQixNQUFwQixDQUFiLEM7O0FBRWUsQ0FBQ0MsVUFBRCxFQUFhQyxHQUFiLEtBQXFCLElBQUlDLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDbkVKLGFBQVdLLGNBQVgsQ0FBMEJDLFFBQVFDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixJQUE5QyxFQUFvRCxDQUFDQyxHQUFELEVBQU1DLFNBQU4sS0FBb0I7QUFDdEUsUUFBSUQsR0FBSixFQUFTO0FBQ1BMLGFBQU9LLEdBQVA7QUFDRDtBQUNELFFBQUlILFFBQVFDLEdBQVIsQ0FBWUksUUFBWixLQUF5QixNQUE3QixFQUFxQztBQUNuQ1gsaUJBQVdZLHNCQUFYLENBQWtDRixTQUFsQyxFQUE2Q1QsR0FBN0MsRUFBa0QsTUFBTTtBQUN0REYsYUFBSyxlQUFMO0FBQ0EsWUFBSU8sUUFBUUMsR0FBUixDQUFZTSxnQkFBaEIsRUFBa0M7QUFDaEMsZ0JBQU1DLFNBQVMsMkJBQVlSLFFBQVFDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixJQUFoQyxFQUFzQyxFQUFFTyxXQUFXVCxRQUFRQyxHQUFSLENBQVlNLGdCQUF6QixFQUF0QyxFQUFtRixDQUFDSixHQUFELEVBQU1LLE1BQU4sS0FBaUI7QUFDakgsZ0JBQUlMLEdBQUosRUFBUztBQUNQLG9CQUFNQSxHQUFOO0FBQ0Q7QUFDRDtBQUNBVixpQkFBTSwwREFBeURlLE9BQU9FLEdBQUksdUJBQTFFO0FBQ0Y7QUFDQyxXQVBjLENBQWY7O0FBU0FGLGlCQUFPRyxFQUFQLENBQVUsT0FBVixFQUFtQixNQUFNO0FBQ3ZCO0FBQ0FsQixpQkFBSyx3RUFBTDtBQUNBO0FBQ0FPLG9CQUFRWSxJQUFSO0FBQ0QsV0FMRDtBQU1EO0FBQ0YsT0FuQkQ7QUFvQkQ7QUFDRGYsWUFBUU8sU0FBUjtBQUNELEdBM0JEO0FBNEJELENBN0JtQyxDIiwiZmlsZSI6IndlYnNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInXG5pbXBvcnQgbG9jYWx0dW5uZWwgZnJvbSAnbG9jYWx0dW5uZWwnXG5cbmNvbnN0IGluZm8gPSBsb2dnZXIoJ3dlYnNlcnZlcicsICdpbmZvJylcblxuZXhwb3J0IGRlZmF1bHQgKGNvbnRyb2xsZXIsIGJvdCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICBjb250cm9sbGVyLnNldHVwV2Vic2VydmVyKHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCwgKGVyciwgd2Vic2VydmVyKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgcmVqZWN0KGVycilcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcpIHtcbiAgICAgIGNvbnRyb2xsZXIuY3JlYXRlV2ViaG9va0VuZHBvaW50cyh3ZWJzZXJ2ZXIsIGJvdCwgKCkgPT4ge1xuICAgICAgICBpbmZvKCdzZXJ2ZXIgb25saW5lJylcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52LlVTRV9MVF9TVUJET01BSU4pIHtcbiAgICAgICAgICBjb25zdCB0dW5uZWwgPSBsb2NhbHR1bm5lbChwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDAsIHsgc3ViZG9tYWluOiBwcm9jZXNzLmVudi5VU0VfTFRfU1VCRE9NQUlOIH0sIChlcnIsIHR1bm5lbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgICAgICBpbmZvKGBZb3VyIGJvdCBpcyBhdmFpbGFibGUgb24gdGhlIHdlYiBhdCB0aGUgZm9sbG93aW5nIFVSTDogJHt0dW5uZWwudXJsfS9ib3RmcmFtZXdvcmsvcmVjZWl2ZWApXG4gICAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgICB0dW5uZWwub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgICAgIGluZm8oJ1lvdXIgYm90IGlzIG5vIGxvbmdlciBhdmFpbGFibGUgb24gdGhlIHdlYiBhdCB0aGUgbG9jYWx0dW5ubmVsLm1lIFVSTC4nKVxuICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSAqL1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXNvbHZlKHdlYnNlcnZlcilcbiAgfSlcbn0pXG4iXX0=