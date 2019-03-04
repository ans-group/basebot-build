'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _requestPromiseNative = require('request-promise-native');var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);
var _debug = require('debug');var _debug2 = _interopRequireDefault(_debug);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const log = (0, _debug2.default)('basebot:middleware:qnamaker:log');
const error = (0, _debug2.default)('basebot:middleware:qnamaker:error');exports.default =

async function (bot, message) {
    if (!process.env.QNA_HOST || !process.env.QNA_KBID || !process.env.QNA_KEY) {
        log('not using QNA Maker as no key provided');
        return bot.reply(message, `Didn't catch that, sorry`);
    }
    const url = `${process.env.QNA_HOST}/knowledgebases/${process.env.QNA_KBID}/generateAnswer`;
    try {
        const res = await _requestPromiseNative2.default.post(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `EndpointKey ${process.env.QNA_KEY}` },

            json: { question: message.text } });

        if (res.answers && res.answers.length && res.answers[0].score > process.env.QNA_THRESHOLD) {
            return bot.reply(message, { text: res.answers[0].answer, pushToken: message.raw_message.pushToken });
        }
    } catch (err) {
        bot.reply(message, `Didn't catch that, sorry`);
        error('Could not check QNA Maker', err);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZpY2VzL3FuYU1ha2VyLmpzIl0sIm5hbWVzIjpbImxvZyIsImVycm9yIiwiYm90IiwibWVzc2FnZSIsInByb2Nlc3MiLCJlbnYiLCJRTkFfSE9TVCIsIlFOQV9LQklEIiwiUU5BX0tFWSIsInJlcGx5IiwidXJsIiwicmVzIiwicmVxdWVzdCIsInBvc3QiLCJtZXRob2QiLCJoZWFkZXJzIiwianNvbiIsInF1ZXN0aW9uIiwidGV4dCIsImFuc3dlcnMiLCJsZW5ndGgiLCJzY29yZSIsIlFOQV9USFJFU0hPTEQiLCJhbnN3ZXIiLCJwdXNoVG9rZW4iLCJyYXdfbWVzc2FnZSIsImVyciJdLCJtYXBwaW5ncyI6IjJFQUFBLDhEO0FBQ0EsOEI7O0FBRUEsTUFBTUEsTUFBTSxxQkFBTSxpQ0FBTixDQUFaO0FBQ0EsTUFBTUMsUUFBUSxxQkFBTSxtQ0FBTixDQUFkLEM7O0FBRWUsZ0JBQWVDLEdBQWYsRUFBb0JDLE9BQXBCLEVBQTZCO0FBQ3hDLFFBQUksQ0FBQ0MsUUFBUUMsR0FBUixDQUFZQyxRQUFiLElBQXlCLENBQUNGLFFBQVFDLEdBQVIsQ0FBWUUsUUFBdEMsSUFBa0QsQ0FBQ0gsUUFBUUMsR0FBUixDQUFZRyxPQUFuRSxFQUE0RTtBQUN4RVIsWUFBSSx3Q0FBSjtBQUNBLGVBQU9FLElBQUlPLEtBQUosQ0FBVU4sT0FBVixFQUFvQiwwQkFBcEIsQ0FBUDtBQUNIO0FBQ0QsVUFBTU8sTUFBTyxHQUFFTixRQUFRQyxHQUFSLENBQVlDLFFBQVMsbUJBQWtCRixRQUFRQyxHQUFSLENBQVlFLFFBQVMsaUJBQTNFO0FBQ0EsUUFBSTtBQUNBLGNBQU1JLE1BQU0sTUFBTUMsK0JBQVFDLElBQVIsQ0FBYUgsR0FBYixFQUFrQjtBQUNoQ0ksb0JBQVEsTUFEd0I7QUFFaENDLHFCQUFTO0FBQ0wsZ0NBQWdCLGtCQURYO0FBRUwsaUNBQWtCLGVBQWNYLFFBQVFDLEdBQVIsQ0FBWUcsT0FBUSxFQUYvQyxFQUZ1Qjs7QUFNaENRLGtCQUFNLEVBQUVDLFVBQVVkLFFBQVFlLElBQXBCLEVBTjBCLEVBQWxCLENBQWxCOztBQVFBLFlBQUlQLElBQUlRLE9BQUosSUFBZVIsSUFBSVEsT0FBSixDQUFZQyxNQUEzQixJQUFxQ1QsSUFBSVEsT0FBSixDQUFZLENBQVosRUFBZUUsS0FBZixHQUF1QmpCLFFBQVFDLEdBQVIsQ0FBWWlCLGFBQTVFLEVBQTJGO0FBQ3ZGLG1CQUFPcEIsSUFBSU8sS0FBSixDQUFVTixPQUFWLEVBQW1CLEVBQUVlLE1BQU1QLElBQUlRLE9BQUosQ0FBWSxDQUFaLEVBQWVJLE1BQXZCLEVBQStCQyxXQUFXckIsUUFBUXNCLFdBQVIsQ0FBb0JELFNBQTlELEVBQW5CLENBQVA7QUFDSDtBQUNKLEtBWkQsQ0FZRSxPQUFPRSxHQUFQLEVBQVk7QUFDVnhCLFlBQUlPLEtBQUosQ0FBVU4sT0FBVixFQUFvQiwwQkFBcEI7QUFDQUYsY0FBTSwyQkFBTixFQUFtQ3lCLEdBQW5DO0FBQ0g7QUFDSixDIiwiZmlsZSI6InFuYU1ha2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlLW5hdGl2ZSdcbmltcG9ydCBEZWJ1ZyBmcm9tICdkZWJ1ZydcblxuY29uc3QgbG9nID0gRGVidWcoJ2Jhc2Vib3Q6bWlkZGxld2FyZTpxbmFtYWtlcjpsb2cnKVxuY29uc3QgZXJyb3IgPSBEZWJ1ZygnYmFzZWJvdDptaWRkbGV3YXJlOnFuYW1ha2VyOmVycm9yJylcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oYm90LCBtZXNzYWdlKSB7XG4gICAgaWYgKCFwcm9jZXNzLmVudi5RTkFfSE9TVCB8fCAhcHJvY2Vzcy5lbnYuUU5BX0tCSUQgfHwgIXByb2Nlc3MuZW52LlFOQV9LRVkpIHtcbiAgICAgICAgbG9nKCdub3QgdXNpbmcgUU5BIE1ha2VyIGFzIG5vIGtleSBwcm92aWRlZCcpXG4gICAgICAgIHJldHVybiBib3QucmVwbHkobWVzc2FnZSwgYERpZG4ndCBjYXRjaCB0aGF0LCBzb3JyeWApXG4gICAgfVxuICAgIGNvbnN0IHVybCA9IGAke3Byb2Nlc3MuZW52LlFOQV9IT1NUfS9rbm93bGVkZ2ViYXNlcy8ke3Byb2Nlc3MuZW52LlFOQV9LQklEfS9nZW5lcmF0ZUFuc3dlcmBcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0LnBvc3QodXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEVuZHBvaW50S2V5ICR7cHJvY2Vzcy5lbnYuUU5BX0tFWX1gXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAganNvbjogeyBxdWVzdGlvbjogbWVzc2FnZS50ZXh0IH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJlcy5hbnN3ZXJzICYmIHJlcy5hbnN3ZXJzLmxlbmd0aCAmJiByZXMuYW5zd2Vyc1swXS5zY29yZSA+IHByb2Nlc3MuZW52LlFOQV9USFJFU0hPTEQpIHtcbiAgICAgICAgICAgIHJldHVybiBib3QucmVwbHkobWVzc2FnZSwgeyB0ZXh0OiByZXMuYW5zd2Vyc1swXS5hbnN3ZXIsIHB1c2hUb2tlbjogbWVzc2FnZS5yYXdfbWVzc2FnZS5wdXNoVG9rZW4gfSlcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBib3QucmVwbHkobWVzc2FnZSwgYERpZG4ndCBjYXRjaCB0aGF0LCBzb3JyeWApXG4gICAgICAgIGVycm9yKCdDb3VsZCBub3QgY2hlY2sgUU5BIE1ha2VyJywgZXJyKVxuICAgIH1cbn1cbiJdfQ==