'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _auth = require('../services/microsoft/auth');exports.default =

[
{
  hears: 'login',
  bypassLuis: true,
  response(bot, message, controller) {
    controller.trigger('login', [bot, message, controller]);
  } },

{
  on: 'login',
  response(bot, message, controller) {
    const url = (0, _auth.getAuthUrl)(message.user);
    bot.reply(message, {
      text: 'Please log in',
      attachments: [
      {
        buttons: [{
          text: 'Login', url }] }] });




  } },

{
  on: 'loginSuccessful',
  response(bot, message, controller) {
    bot.reply(message, "Great!, you're now logged in 😊");
  } },

{
  on: 'loginUnsuccessful',
  response(bot, message, controller) {
    bot.reply(message, 'Oh no!\n\nLooks like something went wrong 🙁\n\nTry again in a few minutes');
  } }];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NraWxscy9hdXRoLmpzIl0sIm5hbWVzIjpbImhlYXJzIiwiYnlwYXNzTHVpcyIsInJlc3BvbnNlIiwiYm90IiwibWVzc2FnZSIsImNvbnRyb2xsZXIiLCJ0cmlnZ2VyIiwib24iLCJ1cmwiLCJ1c2VyIiwicmVwbHkiLCJ0ZXh0IiwiYXR0YWNobWVudHMiLCJidXR0b25zIl0sIm1hcHBpbmdzIjoiMkVBQUEsa0Q7O0FBRWU7QUFDYjtBQUNFQSxTQUFPLE9BRFQ7QUFFRUMsY0FBWSxJQUZkO0FBR0VDLFdBQVVDLEdBQVYsRUFBZUMsT0FBZixFQUF3QkMsVUFBeEIsRUFBb0M7QUFDbENBLGVBQVdDLE9BQVgsQ0FBbUIsT0FBbkIsRUFBNEIsQ0FBQ0gsR0FBRCxFQUFNQyxPQUFOLEVBQWVDLFVBQWYsQ0FBNUI7QUFDRCxHQUxILEVBRGE7O0FBUWI7QUFDRUUsTUFBSSxPQUROO0FBRUVMLFdBQVVDLEdBQVYsRUFBZUMsT0FBZixFQUF3QkMsVUFBeEIsRUFBb0M7QUFDbEMsVUFBTUcsTUFBTSxzQkFBV0osUUFBUUssSUFBbkIsQ0FBWjtBQUNBTixRQUFJTyxLQUFKLENBQVVOLE9BQVYsRUFBbUI7QUFDakJPLFlBQU0sZUFEVztBQUVqQkMsbUJBQWE7QUFDWDtBQUNFQyxpQkFBUyxDQUFDO0FBQ1JGLGdCQUFNLE9BREUsRUFDT0gsR0FEUCxFQUFELENBRFgsRUFEVyxDQUZJLEVBQW5COzs7OztBQVVELEdBZEgsRUFSYTs7QUF3QmI7QUFDRUQsTUFBSSxpQkFETjtBQUVFTCxXQUFVQyxHQUFWLEVBQWVDLE9BQWYsRUFBd0JDLFVBQXhCLEVBQW9DO0FBQ2xDRixRQUFJTyxLQUFKLENBQVVOLE9BQVYsRUFBbUIsaUNBQW5CO0FBQ0QsR0FKSCxFQXhCYTs7QUE4QmI7QUFDRUcsTUFBSSxtQkFETjtBQUVFTCxXQUFVQyxHQUFWLEVBQWVDLE9BQWYsRUFBd0JDLFVBQXhCLEVBQW9DO0FBQ2xDRixRQUFJTyxLQUFKLENBQVVOLE9BQVYsRUFBbUIsNEVBQW5CO0FBQ0QsR0FKSCxFQTlCYSxDIiwiZmlsZSI6ImF1dGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRBdXRoVXJsIH0gZnJvbSAnLi4vc2VydmljZXMvbWljcm9zb2Z0L2F1dGgnXG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIGhlYXJzOiAnbG9naW4nLFxuICAgIGJ5cGFzc0x1aXM6IHRydWUsXG4gICAgcmVzcG9uc2UgKGJvdCwgbWVzc2FnZSwgY29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlci50cmlnZ2VyKCdsb2dpbicsIFtib3QsIG1lc3NhZ2UsIGNvbnRyb2xsZXJdKVxuICAgIH1cbiAgfSxcbiAge1xuICAgIG9uOiAnbG9naW4nLFxuICAgIHJlc3BvbnNlIChib3QsIG1lc3NhZ2UsIGNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnN0IHVybCA9IGdldEF1dGhVcmwobWVzc2FnZS51c2VyKVxuICAgICAgYm90LnJlcGx5KG1lc3NhZ2UsIHtcbiAgICAgICAgdGV4dDogJ1BsZWFzZSBsb2cgaW4nLFxuICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJ1dHRvbnM6IFt7XG4gICAgICAgICAgICAgIHRleHQ6ICdMb2dpbicsIHVybCB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAge1xuICAgIG9uOiAnbG9naW5TdWNjZXNzZnVsJyxcbiAgICByZXNwb25zZSAoYm90LCBtZXNzYWdlLCBjb250cm9sbGVyKSB7XG4gICAgICBib3QucmVwbHkobWVzc2FnZSwgXCJHcmVhdCEsIHlvdSdyZSBub3cgbG9nZ2VkIGluIPCfmIpcIilcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBvbjogJ2xvZ2luVW5zdWNjZXNzZnVsJyxcbiAgICByZXNwb25zZSAoYm90LCBtZXNzYWdlLCBjb250cm9sbGVyKSB7XG4gICAgICBib3QucmVwbHkobWVzc2FnZSwgJ09oIG5vIVxcblxcbkxvb2tzIGxpa2Ugc29tZXRoaW5nIHdlbnQgd3Jvbmcg8J+ZgVxcblxcblRyeSBhZ2FpbiBpbiBhIGZldyBtaW51dGVzJylcbiAgICB9XG4gIH1cbl1cbiJdfQ==