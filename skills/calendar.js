'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _calendar = require('../services/microsoft/calendar');
var _auth = require('../services/microsoft/auth');exports.default =

[
{
  hears: 'Calendar.Next', // LUIS Intent
  response: async function (bot, message, controller) {
    bot.reply(message, {
      text: 'Hang on a sec...',
      typing: true });

    const credentials = await (0, _auth.getUserToken)(message.user, controller);
    if (!credentials.userExists) {
      return bot.reply(message, 'Something went wrong, sorry 🙁');
    }
    if (!credentials.tokenExists) {
      return controller.trigger('login', [bot, message, controller]);
    }
    const events = await (0, _calendar.getEvents)(credentials.token);
    if (events.success) {
      if (events.attachments.length) {
        bot.reply(message, {
          text: "Here's your next event:",
          attachments: events.attachments });

      } else {
        bot.reply(message, 'You have no upcoming events');
      }
    }
  } }];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NraWxscy9jYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJoZWFycyIsInJlc3BvbnNlIiwiYm90IiwibWVzc2FnZSIsImNvbnRyb2xsZXIiLCJyZXBseSIsInRleHQiLCJ0eXBpbmciLCJjcmVkZW50aWFscyIsInVzZXIiLCJ1c2VyRXhpc3RzIiwidG9rZW5FeGlzdHMiLCJ0cmlnZ2VyIiwiZXZlbnRzIiwidG9rZW4iLCJzdWNjZXNzIiwiYXR0YWNobWVudHMiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiIyRUFBQTtBQUNBLGtEOztBQUVlO0FBQ2I7QUFDRUEsU0FBTyxlQURULEVBQzBCO0FBQ3hCQyxZQUFVLGdCQUFnQkMsR0FBaEIsRUFBcUJDLE9BQXJCLEVBQThCQyxVQUE5QixFQUEwQztBQUNsREYsUUFBSUcsS0FBSixDQUFVRixPQUFWLEVBQW1CO0FBQ2pCRyxZQUFNLGtCQURXO0FBRWpCQyxjQUFRLElBRlMsRUFBbkI7O0FBSUEsVUFBTUMsY0FBYyxNQUFNLHdCQUFhTCxRQUFRTSxJQUFyQixFQUEyQkwsVUFBM0IsQ0FBMUI7QUFDQSxRQUFJLENBQUNJLFlBQVlFLFVBQWpCLEVBQTZCO0FBQzNCLGFBQU9SLElBQUlHLEtBQUosQ0FBVUYsT0FBVixFQUFtQixnQ0FBbkIsQ0FBUDtBQUNEO0FBQ0QsUUFBSSxDQUFDSyxZQUFZRyxXQUFqQixFQUE4QjtBQUM1QixhQUFPUCxXQUFXUSxPQUFYLENBQW1CLE9BQW5CLEVBQTRCLENBQUNWLEdBQUQsRUFBTUMsT0FBTixFQUFlQyxVQUFmLENBQTVCLENBQVA7QUFDRDtBQUNELFVBQU1TLFNBQVMsTUFBTSx5QkFBVUwsWUFBWU0sS0FBdEIsQ0FBckI7QUFDQSxRQUFJRCxPQUFPRSxPQUFYLEVBQW9CO0FBQ2xCLFVBQUlGLE9BQU9HLFdBQVAsQ0FBbUJDLE1BQXZCLEVBQStCO0FBQzdCZixZQUFJRyxLQUFKLENBQVVGLE9BQVYsRUFBbUI7QUFDakJHLGdCQUFNLHlCQURXO0FBRWpCVSx1QkFBYUgsT0FBT0csV0FGSCxFQUFuQjs7QUFJRCxPQUxELE1BS087QUFDTGQsWUFBSUcsS0FBSixDQUFVRixPQUFWLEVBQW1CLDZCQUFuQjtBQUNEO0FBQ0Y7QUFDRixHQXpCSCxFQURhLEMiLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRFdmVudHMgfSBmcm9tICcuLi9zZXJ2aWNlcy9taWNyb3NvZnQvY2FsZW5kYXInXG5pbXBvcnQgeyBnZXRVc2VyVG9rZW4gfSBmcm9tICcuLi9zZXJ2aWNlcy9taWNyb3NvZnQvYXV0aCdcblxuZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgaGVhcnM6ICdDYWxlbmRhci5OZXh0JywgLy8gTFVJUyBJbnRlbnRcbiAgICByZXNwb25zZTogYXN5bmMgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgY29udHJvbGxlcikge1xuICAgICAgYm90LnJlcGx5KG1lc3NhZ2UsIHtcbiAgICAgICAgdGV4dDogJ0hhbmcgb24gYSBzZWMuLi4nLFxuICAgICAgICB0eXBpbmc6IHRydWVcbiAgICAgIH0pXG4gICAgICBjb25zdCBjcmVkZW50aWFscyA9IGF3YWl0IGdldFVzZXJUb2tlbihtZXNzYWdlLnVzZXIsIGNvbnRyb2xsZXIpXG4gICAgICBpZiAoIWNyZWRlbnRpYWxzLnVzZXJFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIGJvdC5yZXBseShtZXNzYWdlLCAnU29tZXRoaW5nIHdlbnQgd3JvbmcsIHNvcnJ5IPCfmYEnKVxuICAgICAgfVxuICAgICAgaWYgKCFjcmVkZW50aWFscy50b2tlbkV4aXN0cykge1xuICAgICAgICByZXR1cm4gY29udHJvbGxlci50cmlnZ2VyKCdsb2dpbicsIFtib3QsIG1lc3NhZ2UsIGNvbnRyb2xsZXJdKVxuICAgICAgfVxuICAgICAgY29uc3QgZXZlbnRzID0gYXdhaXQgZ2V0RXZlbnRzKGNyZWRlbnRpYWxzLnRva2VuKVxuICAgICAgaWYgKGV2ZW50cy5zdWNjZXNzKSB7XG4gICAgICAgIGlmIChldmVudHMuYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgYm90LnJlcGx5KG1lc3NhZ2UsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiSGVyZSdzIHlvdXIgbmV4dCBldmVudDpcIixcbiAgICAgICAgICAgIGF0dGFjaG1lbnRzOiBldmVudHMuYXR0YWNobWVudHNcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvdC5yZXBseShtZXNzYWdlLCAnWW91IGhhdmUgbm8gdXBjb21pbmcgZXZlbnRzJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXVxuIl19