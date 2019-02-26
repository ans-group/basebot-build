'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);
var _logger = require('../services/logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const debug = (0, _logger2.default)('skills:onboarding', 'debug');
const error = (0, _logger2.default)('skills:onboarding', 'error');exports.default =

[
{
  on: 'conversationUpdate',
  response: async function (bot, message, controller) {
    const user = await controller.storage.users.get(message.user);
    debug(`User = `, user);
    if (user && user.name) {
      bot.reply(message, { text: `Hey ${user.name} 👋` });
      setTimeout(() => controller.trigger('askAboutWeight', [bot, message, controller]), 1000);
    } else {
      controller.trigger('introduce', [bot, message, controller]);
    }
  } },

{
  on: 'introduce',
  response(bot, message, controller) {
    bot.startConversation(message, (err, convo) => {
      if (err) return error(err);
      convo.say({ text: `Hey there! 👋 \n\nI'm ${process.env.BOT_NAME || 'Basebot'}.`, typing: true });
      convo.ask(`What's your name?'`, (response, convo) => {
        const name = _lodash2.default.startCase(response.text);
        convo.setVar('name', name);
        controller.storage.users.save({ id: message.user, name }).catch(err => error(err));
        convo.say({ text: `Nice to meet you {{vars.name}}!` });
        convo.next();
      });
      convo.next();
      convo.addMessage(`Didn't catch that. If you ever want to tell me again just say "my name is ..." or "call me ..." 👍`, 'on_timeout');
    });
  } },

{
  hears: ['my name is ([A-Za-z\\s]*)', 'call me ([A-Za-z\\s]*)'],
  bypassLuis: true,
  response(bot, message, controller) {
    const name = _lodash2.default.startCase(message.match[1]);
    debug(`User told me their name is ${name}`);
    controller.storage.users.save({ id: message.user, name }).catch(err => error(err));
    if (name) {
      bot.reply(message, `Great, I'll call you ${name} from now on 😊`);
    }
  } }];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NraWxscy9vbmJvYXJkaW5nLmpzIl0sIm5hbWVzIjpbImRlYnVnIiwiZXJyb3IiLCJvbiIsInJlc3BvbnNlIiwiYm90IiwibWVzc2FnZSIsImNvbnRyb2xsZXIiLCJ1c2VyIiwic3RvcmFnZSIsInVzZXJzIiwiZ2V0IiwibmFtZSIsInJlcGx5IiwidGV4dCIsInNldFRpbWVvdXQiLCJ0cmlnZ2VyIiwic3RhcnRDb252ZXJzYXRpb24iLCJlcnIiLCJjb252byIsInNheSIsInByb2Nlc3MiLCJlbnYiLCJCT1RfTkFNRSIsInR5cGluZyIsImFzayIsIl8iLCJzdGFydENhc2UiLCJzZXRWYXIiLCJzYXZlIiwiaWQiLCJjYXRjaCIsIm5leHQiLCJhZGRNZXNzYWdlIiwiaGVhcnMiLCJieXBhc3NMdWlzIiwibWF0Y2giXSwibWFwcGluZ3MiOiIyRUFBQSxnQztBQUNBLDRDOztBQUVBLE1BQU1BLFFBQVEsc0JBQU8sbUJBQVAsRUFBNEIsT0FBNUIsQ0FBZDtBQUNBLE1BQU1DLFFBQVEsc0JBQU8sbUJBQVAsRUFBNEIsT0FBNUIsQ0FBZCxDOztBQUVlO0FBQ2I7QUFDRUMsTUFBSSxvQkFETjtBQUVFQyxZQUFVLGdCQUFlQyxHQUFmLEVBQW9CQyxPQUFwQixFQUE2QkMsVUFBN0IsRUFBeUM7QUFDakQsVUFBTUMsT0FBTyxNQUFNRCxXQUFXRSxPQUFYLENBQW1CQyxLQUFuQixDQUF5QkMsR0FBekIsQ0FBNkJMLFFBQVFFLElBQXJDLENBQW5CO0FBQ0FQLFVBQU8sU0FBUCxFQUFpQk8sSUFBakI7QUFDQSxRQUFJQSxRQUFRQSxLQUFLSSxJQUFqQixFQUF1QjtBQUNyQlAsVUFBSVEsS0FBSixDQUFVUCxPQUFWLEVBQW1CLEVBQUVRLE1BQU8sT0FBTU4sS0FBS0ksSUFBSyxLQUF6QixFQUFuQjtBQUNBRyxpQkFBVyxNQUFNUixXQUFXUyxPQUFYLENBQW1CLGdCQUFuQixFQUFxQyxDQUFDWCxHQUFELEVBQU1DLE9BQU4sRUFBZUMsVUFBZixDQUFyQyxDQUFqQixFQUFtRixJQUFuRjtBQUNELEtBSEQsTUFHTztBQUNMQSxpQkFBV1MsT0FBWCxDQUFtQixXQUFuQixFQUFnQyxDQUFDWCxHQUFELEVBQU1DLE9BQU4sRUFBZUMsVUFBZixDQUFoQztBQUNEO0FBQ0YsR0FYSCxFQURhOztBQWNiO0FBQ0VKLE1BQUksV0FETjtBQUVFQyxXQUFTQyxHQUFULEVBQWNDLE9BQWQsRUFBdUJDLFVBQXZCLEVBQW1DO0FBQ2pDRixRQUFJWSxpQkFBSixDQUFzQlgsT0FBdEIsRUFBK0IsQ0FBQ1ksR0FBRCxFQUFNQyxLQUFOLEtBQWdCO0FBQzdDLFVBQUlELEdBQUosRUFBUyxPQUFPaEIsTUFBTWdCLEdBQU4sQ0FBUDtBQUNUQyxZQUFNQyxHQUFOLENBQVUsRUFBRU4sTUFBTyx5QkFBd0JPLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixJQUF3QixTQUFVLEdBQW5FLEVBQXVFQyxRQUFRLElBQS9FLEVBQVY7QUFDQUwsWUFBTU0sR0FBTixDQUFXLG9CQUFYLEVBQWdDLENBQUNyQixRQUFELEVBQVdlLEtBQVgsS0FBcUI7QUFDbkQsY0FBTVAsT0FBT2MsaUJBQUVDLFNBQUYsQ0FBWXZCLFNBQVNVLElBQXJCLENBQWI7QUFDQUssY0FBTVMsTUFBTixDQUFhLE1BQWIsRUFBcUJoQixJQUFyQjtBQUNBTCxtQkFBV0UsT0FBWCxDQUFtQkMsS0FBbkIsQ0FBeUJtQixJQUF6QixDQUE4QixFQUFFQyxJQUFJeEIsUUFBUUUsSUFBZCxFQUFvQkksSUFBcEIsRUFBOUIsRUFBMERtQixLQUExRCxDQUFnRWIsT0FBT2hCLE1BQU1nQixHQUFOLENBQXZFO0FBQ0FDLGNBQU1DLEdBQU4sQ0FBVSxFQUFFTixNQUFPLGlDQUFULEVBQVY7QUFDQUssY0FBTWEsSUFBTjtBQUNELE9BTkQ7QUFPQWIsWUFBTWEsSUFBTjtBQUNBYixZQUFNYyxVQUFOLENBQWtCLG9HQUFsQixFQUF1SCxZQUF2SDtBQUNELEtBWkQ7QUFhRCxHQWhCSCxFQWRhOztBQWdDYjtBQUNFQyxTQUFPLENBQUMsMkJBQUQsRUFBOEIsd0JBQTlCLENBRFQ7QUFFRUMsY0FBWSxJQUZkO0FBR0UvQixXQUFTQyxHQUFULEVBQWNDLE9BQWQsRUFBdUJDLFVBQXZCLEVBQW1DO0FBQ2pDLFVBQU1LLE9BQU9jLGlCQUFFQyxTQUFGLENBQVlyQixRQUFROEIsS0FBUixDQUFjLENBQWQsQ0FBWixDQUFiO0FBQ0FuQyxVQUFPLDhCQUE2QlcsSUFBSyxFQUF6QztBQUNBTCxlQUFXRSxPQUFYLENBQW1CQyxLQUFuQixDQUF5Qm1CLElBQXpCLENBQThCLEVBQUVDLElBQUl4QixRQUFRRSxJQUFkLEVBQW9CSSxJQUFwQixFQUE5QixFQUEwRG1CLEtBQTFELENBQWdFYixPQUFPaEIsTUFBTWdCLEdBQU4sQ0FBdkU7QUFDQSxRQUFJTixJQUFKLEVBQVU7QUFDUlAsVUFBSVEsS0FBSixDQUFVUCxPQUFWLEVBQW9CLHdCQUF1Qk0sSUFBSyxpQkFBaEQ7QUFDRDtBQUNGLEdBVkgsRUFoQ2EsQyIsImZpbGUiOiJvbmJvYXJkaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9zZXJ2aWNlcy9sb2dnZXInXG5cbmNvbnN0IGRlYnVnID0gbG9nZ2VyKCdza2lsbHM6b25ib2FyZGluZycsICdkZWJ1ZycpXG5jb25zdCBlcnJvciA9IGxvZ2dlcignc2tpbGxzOm9uYm9hcmRpbmcnLCAnZXJyb3InKVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBvbjogJ2NvbnZlcnNhdGlvblVwZGF0ZScsXG4gICAgcmVzcG9uc2U6IGFzeW5jIGZ1bmN0aW9uKGJvdCwgbWVzc2FnZSwgY29udHJvbGxlcikge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGNvbnRyb2xsZXIuc3RvcmFnZS51c2Vycy5nZXQobWVzc2FnZS51c2VyKVxuICAgICAgZGVidWcoYFVzZXIgPSBgLCB1c2VyKVxuICAgICAgaWYgKHVzZXIgJiYgdXNlci5uYW1lKSB7XG4gICAgICAgIGJvdC5yZXBseShtZXNzYWdlLCB7IHRleHQ6IGBIZXkgJHt1c2VyLm5hbWV9IPCfkYtgIH0pXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci50cmlnZ2VyKCdhc2tBYm91dFdlaWdodCcsIFtib3QsIG1lc3NhZ2UsIGNvbnRyb2xsZXJdKSwgMTAwMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRyb2xsZXIudHJpZ2dlcignaW50cm9kdWNlJywgW2JvdCwgbWVzc2FnZSwgY29udHJvbGxlcl0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuICB7XG4gICAgb246ICdpbnRyb2R1Y2UnLFxuICAgIHJlc3BvbnNlKGJvdCwgbWVzc2FnZSwgY29udHJvbGxlcikge1xuICAgICAgYm90LnN0YXJ0Q29udmVyc2F0aW9uKG1lc3NhZ2UsIChlcnIsIGNvbnZvKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBlcnJvcihlcnIpXG4gICAgICAgIGNvbnZvLnNheSh7IHRleHQ6IGBIZXkgdGhlcmUhIPCfkYsgXFxuXFxuSSdtICR7cHJvY2Vzcy5lbnYuQk9UX05BTUUgfHwgJ0Jhc2Vib3QnfS5gLCB0eXBpbmc6IHRydWUgfSlcbiAgICAgICAgY29udm8uYXNrKGBXaGF0J3MgeW91ciBuYW1lPydgLCAocmVzcG9uc2UsIGNvbnZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IF8uc3RhcnRDYXNlKHJlc3BvbnNlLnRleHQpXG4gICAgICAgICAgY29udm8uc2V0VmFyKCduYW1lJywgbmFtZSlcbiAgICAgICAgICBjb250cm9sbGVyLnN0b3JhZ2UudXNlcnMuc2F2ZSh7IGlkOiBtZXNzYWdlLnVzZXIsIG5hbWUgfSkuY2F0Y2goZXJyID0+IGVycm9yKGVycikpXG4gICAgICAgICAgY29udm8uc2F5KHsgdGV4dDogYE5pY2UgdG8gbWVldCB5b3Uge3t2YXJzLm5hbWV9fSFgIH0pXG4gICAgICAgICAgY29udm8ubmV4dCgpXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnZvLm5leHQoKVxuICAgICAgICBjb252by5hZGRNZXNzYWdlKGBEaWRuJ3QgY2F0Y2ggdGhhdC4gSWYgeW91IGV2ZXIgd2FudCB0byB0ZWxsIG1lIGFnYWluIGp1c3Qgc2F5IFwibXkgbmFtZSBpcyAuLi5cIiBvciBcImNhbGwgbWUgLi4uXCIg8J+RjWAsICdvbl90aW1lb3V0JylcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICB7XG4gICAgaGVhcnM6IFsnbXkgbmFtZSBpcyAoW0EtWmEtelxcXFxzXSopJywgJ2NhbGwgbWUgKFtBLVphLXpcXFxcc10qKSddLFxuICAgIGJ5cGFzc0x1aXM6IHRydWUsXG4gICAgcmVzcG9uc2UoYm90LCBtZXNzYWdlLCBjb250cm9sbGVyKSB7XG4gICAgICBjb25zdCBuYW1lID0gXy5zdGFydENhc2UobWVzc2FnZS5tYXRjaFsxXSlcbiAgICAgIGRlYnVnKGBVc2VyIHRvbGQgbWUgdGhlaXIgbmFtZSBpcyAke25hbWV9YClcbiAgICAgIGNvbnRyb2xsZXIuc3RvcmFnZS51c2Vycy5zYXZlKHsgaWQ6IG1lc3NhZ2UudXNlciwgbmFtZSB9KS5jYXRjaChlcnIgPT4gZXJyb3IoZXJyKSlcbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIGJvdC5yZXBseShtZXNzYWdlLCBgR3JlYXQsIEknbGwgY2FsbCB5b3UgJHtuYW1lfSBmcm9tIG5vdyBvbiDwn5iKYClcbiAgICAgIH1cbiAgICB9XG4gIH1cbl1cbiJdfQ==