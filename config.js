'use strict';var _logger = require('./services/logger');var _logger2 = _interopRequireDefault(_logger);
var _nodeEnvFile = require('node-env-file');var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
const info = (0, _logger2.default)('config', 'info');
const warn = (0, _logger2.default)('config', 'warn');

try {
  (0, _nodeEnvFile2.default)(`${__dirname}/.env`);
} catch (err) {
  info('no .env file found');
}

const requiredValues = [
'MS_APP_ID',
'MS_APP_PASSWORD',
'MS_APP_SCOPES',
'MS_REDIRECT_URI',
'LUIS_URI',
'DB_URL'];


requiredValues.forEach(key => {
  if (!process.env[key]) {
    throw new Error(`Config Error: ${key} is not set`);
  }
});

if (!process.env.CRYPTR_SECRET) {
  warn('Warning: CRYPTR_SECRET is not set, you should set this to a random string');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2NvbmZpZy5qcyJdLCJuYW1lcyI6WyJpbmZvIiwid2FybiIsIl9fZGlybmFtZSIsImVyciIsInJlcXVpcmVkVmFsdWVzIiwiZm9yRWFjaCIsImtleSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsIkNSWVBUUl9TRUNSRVQiXSwibWFwcGluZ3MiOiJhQUFBLDJDO0FBQ0EsNEM7QUFDQSxNQUFNQSxPQUFPLHNCQUFPLFFBQVAsRUFBaUIsTUFBakIsQ0FBYjtBQUNBLE1BQU1DLE9BQU8sc0JBQU8sUUFBUCxFQUFpQixNQUFqQixDQUFiOztBQUVBLElBQUk7QUFDRiw2QkFBSyxHQUFFQyxTQUFVLE9BQWpCO0FBQ0QsQ0FGRCxDQUVFLE9BQU9DLEdBQVAsRUFBWTtBQUNaSCxPQUFLLG9CQUFMO0FBQ0Q7O0FBRUQsTUFBTUksaUJBQWlCO0FBQ3JCLFdBRHFCO0FBRXJCLGlCQUZxQjtBQUdyQixlQUhxQjtBQUlyQixpQkFKcUI7QUFLckIsVUFMcUI7QUFNckIsUUFOcUIsQ0FBdkI7OztBQVNBQSxlQUFlQyxPQUFmLENBQXVCQyxPQUFPO0FBQzVCLE1BQUksQ0FBQ0MsUUFBUUMsR0FBUixDQUFZRixHQUFaLENBQUwsRUFBdUI7QUFDckIsVUFBTSxJQUFJRyxLQUFKLENBQVcsaUJBQWdCSCxHQUFJLGFBQS9CLENBQU47QUFDRDtBQUNGLENBSkQ7O0FBTUEsSUFBSSxDQUFDQyxRQUFRQyxHQUFSLENBQVlFLGFBQWpCLEVBQWdDO0FBQzlCVCxPQUFLLDJFQUFMO0FBQ0QiLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZ2dlciBmcm9tICcuL3NlcnZpY2VzL2xvZ2dlcidcbmltcG9ydCBlbnYgZnJvbSAnbm9kZS1lbnYtZmlsZSdcbmNvbnN0IGluZm8gPSBsb2dnZXIoJ2NvbmZpZycsICdpbmZvJylcbmNvbnN0IHdhcm4gPSBsb2dnZXIoJ2NvbmZpZycsICd3YXJuJylcblxudHJ5IHtcbiAgZW52KGAke19fZGlybmFtZX0vLmVudmApXG59IGNhdGNoIChlcnIpIHtcbiAgaW5mbygnbm8gLmVudiBmaWxlIGZvdW5kJylcbn1cblxuY29uc3QgcmVxdWlyZWRWYWx1ZXMgPSBbXG4gICdNU19BUFBfSUQnLFxuICAnTVNfQVBQX1BBU1NXT1JEJyxcbiAgJ01TX0FQUF9TQ09QRVMnLFxuICAnTVNfUkVESVJFQ1RfVVJJJyxcbiAgJ0xVSVNfVVJJJyxcbiAgJ0RCX1VSTCdcbl1cblxucmVxdWlyZWRWYWx1ZXMuZm9yRWFjaChrZXkgPT4ge1xuICBpZiAoIXByb2Nlc3MuZW52W2tleV0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvbmZpZyBFcnJvcjogJHtrZXl9IGlzIG5vdCBzZXRgKVxuICB9XG59KVxuXG5pZiAoIXByb2Nlc3MuZW52LkNSWVBUUl9TRUNSRVQpIHtcbiAgd2FybignV2FybmluZzogQ1JZUFRSX1NFQ1JFVCBpcyBub3Qgc2V0LCB5b3Ugc2hvdWxkIHNldCB0aGlzIHRvIGEgcmFuZG9tIHN0cmluZycpXG59XG4iXX0=