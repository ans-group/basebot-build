'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _outgoing = require('../services/outgoing');
var _logger = require('../services/logger');var _logger2 = _interopRequireDefault(_logger);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const error = (0, _logger2.default)('skills:debug', 'error');exports.default =

[
{
  hears: 'debug:attachments',
  bypassLuis: true,
  response(bot, message) {
    bot.reply(message, {
      text: 'here are some attachments',
      attachments: [
      {
        title: 'Gluten free Potato Cheese Sauce',
        thumb: 'https://dummyimage.com/75x75/0074c6/ffffff.png&text=Feb%2006',
        text: 'This is a delicious sauce for any occasion.',
        color: '#ff8817',
        image: 'https://www.edamam.com/web-img/86f/86fe08fb473e457428e529d580036f57',
        buttons: [{
          text: 'View Recipe',
          url: 'http://healthiersteps.com/gluten-free-potato-cheese-sauce/' },
        {
          text: 'Another Button',
          url: 'http://healthiersteps.com/gluten-free-potato-cheese-sauce/' }],

        values: [{ type: 'icon', key: 'timer', value: '20 mins' }, { type: 'icon', key: 'people', value: 'Serves 4' }] }] });


  } },

{
  hears: 'debug:typing',
  bypassLuis: true,
  response: async function (bot, message) {
    bot.startConversation(message, (err, convo) => {
      if (err) return error(err);
      convo.say({
        text: 'Hmm lemme just think for a second',
        typing: true });

      convo.say({
        text: "Okay, I'm done!",
        delay: 5000 });

    });
  } },

{
  hears: 'debug:intro',
  bypassLuis: true,
  response: async function (bot, message, controller) {
    controller.trigger('introduce', [bot, message, controller]);
  } },

{
  hears: 'debug:notify',
  bypassLuis: true,
  response: async function (bot, message, controller) {
    bot.startConversation(message, (err, convo) => {
      if (err) return error(err);
      convo.say({
        text: 'Close your app now' });

      setTimeout(() => {
        (0, _outgoing.notify)({
          uid: message.user,
          text: "Hey, it's me!",
          trigger: 'debug:triggerFromNotification',
          controller });

      }, 5000);
    });
  } },

{
  on: 'debug:triggerFromNotification',
  response(bot, message) {
    bot.reply(message, "Hey, it's me!");
  } },

{
  hears: 'debug:suggestions',
  bypassLuis: true,
  response(bot, message) {
    bot.reply(message, {
      text: "Here's some suggestions",
      quick_replies: [
      {
        title: 'Hello',
        payload: 'Hello' },

      {
        title: 'Test',
        payload: 'Test' },

      {
        title: 'Card',
        payload: 'Card' },

      {
        title: 'It is time to go now',
        payload: 'Time to go' },

      {
        title: 'Goodbye',
        payload: 'Adios' }] });



  } }];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NraWxscy9kZWJ1Zy5qcyJdLCJuYW1lcyI6WyJlcnJvciIsImhlYXJzIiwiYnlwYXNzTHVpcyIsInJlc3BvbnNlIiwiYm90IiwibWVzc2FnZSIsInJlcGx5IiwidGV4dCIsImF0dGFjaG1lbnRzIiwidGl0bGUiLCJ0aHVtYiIsImNvbG9yIiwiaW1hZ2UiLCJidXR0b25zIiwidXJsIiwidmFsdWVzIiwidHlwZSIsImtleSIsInZhbHVlIiwic3RhcnRDb252ZXJzYXRpb24iLCJlcnIiLCJjb252byIsInNheSIsInR5cGluZyIsImRlbGF5IiwiY29udHJvbGxlciIsInRyaWdnZXIiLCJzZXRUaW1lb3V0IiwidWlkIiwidXNlciIsIm9uIiwicXVpY2tfcmVwbGllcyIsInBheWxvYWQiXSwibWFwcGluZ3MiOiIyRUFBQTtBQUNBLDRDOztBQUVBLE1BQU1BLFFBQVEsc0JBQU8sY0FBUCxFQUF1QixPQUF2QixDQUFkLEM7O0FBRWU7QUFDYjtBQUNFQyxTQUFPLG1CQURUO0FBRUVDLGNBQVksSUFGZDtBQUdFQyxXQUFVQyxHQUFWLEVBQWVDLE9BQWYsRUFBd0I7QUFDdEJELFFBQUlFLEtBQUosQ0FBVUQsT0FBVixFQUFtQjtBQUNqQkUsWUFBTSwyQkFEVztBQUVqQkMsbUJBQWE7QUFDWDtBQUNFQyxlQUFPLGlDQURUO0FBRUVDLGVBQU8sOERBRlQ7QUFHRUgsY0FBTSw2Q0FIUjtBQUlFSSxlQUFPLFNBSlQ7QUFLRUMsZUFBTyxxRUFMVDtBQU1FQyxpQkFBUyxDQUFDO0FBQ1JOLGdCQUFNLGFBREU7QUFFUk8sZUFBSyw0REFGRyxFQUFEO0FBR047QUFDRFAsZ0JBQU0sZ0JBREw7QUFFRE8sZUFBSyw0REFGSixFQUhNLENBTlg7O0FBYUVDLGdCQUFRLENBQUMsRUFBRUMsTUFBTSxNQUFSLEVBQWdCQyxLQUFLLE9BQXJCLEVBQThCQyxPQUFPLFNBQXJDLEVBQUQsRUFBbUQsRUFBRUYsTUFBTSxNQUFSLEVBQWdCQyxLQUFLLFFBQXJCLEVBQStCQyxPQUFPLFVBQXRDLEVBQW5ELENBYlYsRUFEVyxDQUZJLEVBQW5COzs7QUFtQkQsR0F2QkgsRUFEYTs7QUEwQmI7QUFDRWpCLFNBQU8sY0FEVDtBQUVFQyxjQUFZLElBRmQ7QUFHRUMsWUFBVSxnQkFBZ0JDLEdBQWhCLEVBQXFCQyxPQUFyQixFQUE4QjtBQUN0Q0QsUUFBSWUsaUJBQUosQ0FBc0JkLE9BQXRCLEVBQStCLENBQUNlLEdBQUQsRUFBTUMsS0FBTixLQUFnQjtBQUM3QyxVQUFJRCxHQUFKLEVBQVMsT0FBT3BCLE1BQU1vQixHQUFOLENBQVA7QUFDVEMsWUFBTUMsR0FBTixDQUFVO0FBQ1JmLGNBQU0sbUNBREU7QUFFUmdCLGdCQUFRLElBRkEsRUFBVjs7QUFJQUYsWUFBTUMsR0FBTixDQUFVO0FBQ1JmLGNBQU0saUJBREU7QUFFUmlCLGVBQU8sSUFGQyxFQUFWOztBQUlELEtBVkQ7QUFXRCxHQWZILEVBMUJhOztBQTJDYjtBQUNFdkIsU0FBTyxhQURUO0FBRUVDLGNBQVksSUFGZDtBQUdFQyxZQUFVLGdCQUFnQkMsR0FBaEIsRUFBcUJDLE9BQXJCLEVBQThCb0IsVUFBOUIsRUFBMEM7QUFDbERBLGVBQVdDLE9BQVgsQ0FBbUIsV0FBbkIsRUFBZ0MsQ0FBQ3RCLEdBQUQsRUFBTUMsT0FBTixFQUFlb0IsVUFBZixDQUFoQztBQUNELEdBTEgsRUEzQ2E7O0FBa0RiO0FBQ0V4QixTQUFPLGNBRFQ7QUFFRUMsY0FBWSxJQUZkO0FBR0VDLFlBQVUsZ0JBQWdCQyxHQUFoQixFQUFxQkMsT0FBckIsRUFBOEJvQixVQUE5QixFQUEwQztBQUNsRHJCLFFBQUllLGlCQUFKLENBQXNCZCxPQUF0QixFQUErQixDQUFDZSxHQUFELEVBQU1DLEtBQU4sS0FBZ0I7QUFDN0MsVUFBSUQsR0FBSixFQUFTLE9BQU9wQixNQUFNb0IsR0FBTixDQUFQO0FBQ1RDLFlBQU1DLEdBQU4sQ0FBVTtBQUNSZixjQUFNLG9CQURFLEVBQVY7O0FBR0FvQixpQkFBVyxNQUFNO0FBQ2YsOEJBQU87QUFDTEMsZUFBS3ZCLFFBQVF3QixJQURSO0FBRUx0QixnQkFBTSxlQUZEO0FBR0xtQixtQkFBUywrQkFISjtBQUlMRCxvQkFKSyxFQUFQOztBQU1ELE9BUEQsRUFPRyxJQVBIO0FBUUQsS0FiRDtBQWNELEdBbEJILEVBbERhOztBQXNFYjtBQUNFSyxNQUFJLCtCQUROO0FBRUUzQixXQUFVQyxHQUFWLEVBQWVDLE9BQWYsRUFBd0I7QUFDdEJELFFBQUlFLEtBQUosQ0FBVUQsT0FBVixFQUFtQixlQUFuQjtBQUNELEdBSkgsRUF0RWE7O0FBNEViO0FBQ0VKLFNBQU8sbUJBRFQ7QUFFRUMsY0FBWSxJQUZkO0FBR0VDLFdBQVVDLEdBQVYsRUFBZUMsT0FBZixFQUF3QjtBQUN0QkQsUUFBSUUsS0FBSixDQUFVRCxPQUFWLEVBQW1CO0FBQ2pCRSxZQUFNLHlCQURXO0FBRWpCd0IscUJBQWU7QUFDYjtBQUNFdEIsZUFBTyxPQURUO0FBRUV1QixpQkFBUyxPQUZYLEVBRGE7O0FBS2I7QUFDRXZCLGVBQU8sTUFEVDtBQUVFdUIsaUJBQVMsTUFGWCxFQUxhOztBQVNiO0FBQ0V2QixlQUFPLE1BRFQ7QUFFRXVCLGlCQUFTLE1BRlgsRUFUYTs7QUFhYjtBQUNFdkIsZUFBTyxzQkFEVDtBQUVFdUIsaUJBQVMsWUFGWCxFQWJhOztBQWlCYjtBQUNFdkIsZUFBTyxTQURUO0FBRUV1QixpQkFBUyxPQUZYLEVBakJhLENBRkUsRUFBbkI7Ozs7QUF5QkQsR0E3QkgsRUE1RWEsQyIsImZpbGUiOiJkZWJ1Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5vdGlmeSB9IGZyb20gJy4uL3NlcnZpY2VzL291dGdvaW5nJ1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9zZXJ2aWNlcy9sb2dnZXInXG5cbmNvbnN0IGVycm9yID0gbG9nZ2VyKCdza2lsbHM6ZGVidWcnLCAnZXJyb3InKVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBoZWFyczogJ2RlYnVnOmF0dGFjaG1lbnRzJyxcbiAgICBieXBhc3NMdWlzOiB0cnVlLFxuICAgIHJlc3BvbnNlIChib3QsIG1lc3NhZ2UpIHtcbiAgICAgIGJvdC5yZXBseShtZXNzYWdlLCB7XG4gICAgICAgIHRleHQ6ICdoZXJlIGFyZSBzb21lIGF0dGFjaG1lbnRzJyxcbiAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aXRsZTogJ0dsdXRlbiBmcmVlIFBvdGF0byBDaGVlc2UgU2F1Y2UnLFxuICAgICAgICAgICAgdGh1bWI6ICdodHRwczovL2R1bW15aW1hZ2UuY29tLzc1eDc1LzAwNzRjNi9mZmZmZmYucG5nJnRleHQ9RmViJTIwMDYnLFxuICAgICAgICAgICAgdGV4dDogJ1RoaXMgaXMgYSBkZWxpY2lvdXMgc2F1Y2UgZm9yIGFueSBvY2Nhc2lvbi4nLFxuICAgICAgICAgICAgY29sb3I6ICcjZmY4ODE3JyxcbiAgICAgICAgICAgIGltYWdlOiAnaHR0cHM6Ly93d3cuZWRhbWFtLmNvbS93ZWItaW1nLzg2Zi84NmZlMDhmYjQ3M2U0NTc0MjhlNTI5ZDU4MDAzNmY1NycsXG4gICAgICAgICAgICBidXR0b25zOiBbe1xuICAgICAgICAgICAgICB0ZXh0OiAnVmlldyBSZWNpcGUnLFxuICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vaGVhbHRoaWVyc3RlcHMuY29tL2dsdXRlbi1mcmVlLXBvdGF0by1jaGVlc2Utc2F1Y2UvJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICB0ZXh0OiAnQW5vdGhlciBCdXR0b24nLFxuICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vaGVhbHRoaWVyc3RlcHMuY29tL2dsdXRlbi1mcmVlLXBvdGF0by1jaGVlc2Utc2F1Y2UvJ1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICB2YWx1ZXM6IFt7IHR5cGU6ICdpY29uJywga2V5OiAndGltZXInLCB2YWx1ZTogJzIwIG1pbnMnIH0sIHsgdHlwZTogJ2ljb24nLCBrZXk6ICdwZW9wbGUnLCB2YWx1ZTogJ1NlcnZlcyA0JyB9XSB9XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICB7XG4gICAgaGVhcnM6ICdkZWJ1Zzp0eXBpbmcnLFxuICAgIGJ5cGFzc0x1aXM6IHRydWUsXG4gICAgcmVzcG9uc2U6IGFzeW5jIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UpIHtcbiAgICAgIGJvdC5zdGFydENvbnZlcnNhdGlvbihtZXNzYWdlLCAoZXJyLCBjb252bykgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gZXJyb3IoZXJyKVxuICAgICAgICBjb252by5zYXkoe1xuICAgICAgICAgIHRleHQ6ICdIbW0gbGVtbWUganVzdCB0aGluayBmb3IgYSBzZWNvbmQnLFxuICAgICAgICAgIHR5cGluZzogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBjb252by5zYXkoe1xuICAgICAgICAgIHRleHQ6IFwiT2theSwgSSdtIGRvbmUhXCIsXG4gICAgICAgICAgZGVsYXk6IDUwMDBcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICB7XG4gICAgaGVhcnM6ICdkZWJ1ZzppbnRybycsXG4gICAgYnlwYXNzTHVpczogdHJ1ZSxcbiAgICByZXNwb25zZTogYXN5bmMgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgY29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlci50cmlnZ2VyKCdpbnRyb2R1Y2UnLCBbYm90LCBtZXNzYWdlLCBjb250cm9sbGVyXSlcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBoZWFyczogJ2RlYnVnOm5vdGlmeScsXG4gICAgYnlwYXNzTHVpczogdHJ1ZSxcbiAgICByZXNwb25zZTogYXN5bmMgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgY29udHJvbGxlcikge1xuICAgICAgYm90LnN0YXJ0Q29udmVyc2F0aW9uKG1lc3NhZ2UsIChlcnIsIGNvbnZvKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBlcnJvcihlcnIpXG4gICAgICAgIGNvbnZvLnNheSh7XG4gICAgICAgICAgdGV4dDogJ0Nsb3NlIHlvdXIgYXBwIG5vdydcbiAgICAgICAgfSlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgbm90aWZ5KHtcbiAgICAgICAgICAgIHVpZDogbWVzc2FnZS51c2VyLFxuICAgICAgICAgICAgdGV4dDogXCJIZXksIGl0J3MgbWUhXCIsXG4gICAgICAgICAgICB0cmlnZ2VyOiAnZGVidWc6dHJpZ2dlckZyb21Ob3RpZmljYXRpb24nLFxuICAgICAgICAgICAgY29udHJvbGxlclxuICAgICAgICAgIH0pXG4gICAgICAgIH0sIDUwMDApXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAge1xuICAgIG9uOiAnZGVidWc6dHJpZ2dlckZyb21Ob3RpZmljYXRpb24nLFxuICAgIHJlc3BvbnNlIChib3QsIG1lc3NhZ2UpIHtcbiAgICAgIGJvdC5yZXBseShtZXNzYWdlLCBcIkhleSwgaXQncyBtZSFcIilcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBoZWFyczogJ2RlYnVnOnN1Z2dlc3Rpb25zJyxcbiAgICBieXBhc3NMdWlzOiB0cnVlLFxuICAgIHJlc3BvbnNlIChib3QsIG1lc3NhZ2UpIHtcbiAgICAgIGJvdC5yZXBseShtZXNzYWdlLCB7XG4gICAgICAgIHRleHQ6IFwiSGVyZSdzIHNvbWUgc3VnZ2VzdGlvbnNcIixcbiAgICAgICAgcXVpY2tfcmVwbGllczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnSGVsbG8nLFxuICAgICAgICAgICAgcGF5bG9hZDogJ0hlbGxvJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdUZXN0JyxcbiAgICAgICAgICAgIHBheWxvYWQ6ICdUZXN0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdDYXJkJyxcbiAgICAgICAgICAgIHBheWxvYWQ6ICdDYXJkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGl0bGU6ICdJdCBpcyB0aW1lIHRvIGdvIG5vdycsXG4gICAgICAgICAgICBwYXlsb2FkOiAnVGltZSB0byBnbydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpdGxlOiAnR29vZGJ5ZScsXG4gICAgICAgICAgICBwYXlsb2FkOiAnQWRpb3MnXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXVxuIl19