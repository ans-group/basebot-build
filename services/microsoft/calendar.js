'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.getEvents = undefined;var _microsoftGraphClient = require('@microsoft/microsoft-graph-client');var MicrosoftGraph = _interopRequireWildcard(_microsoftGraphClient);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _striptags = require('striptags');var _striptags2 = _interopRequireDefault(_striptags);
var _htmlEntities = require('html-entities');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}

const log = require('debug')('basebot:services:calendar:log');
const error = require('debug')('basebot:services:calendar:error');

const entities = new _htmlEntities.AllHtmlEntities();

const responseStatuses = {
  none: '#a9a9a9', // gray
  organizer: '#32cd32', // green
  tentativelyAccepted: '#f5b455', // yellow
  accepted: '#32cd32', // green
  declined: '#e41d1d', // red
  notResponded: '#a9a9a9' // gray
};

const getEvents = async ({ token }, query = {}) => {
  query = Object.assign({
    top: 1,
    daysAhead: 100 },
  query);
  if (token) {
    // Initialize Graph client
    const client = MicrosoftGraph.Client.init({
      authProvider: done => {
        done(null, token);
      } });


    // Set start of the calendar view to today, right now
    const start = new Date();
    // Set end of the calendar view to x days from start
    const end = new Date(new Date(start).setDate(start.getDate() + query.daysAhead));

    log('fetching event(s)');
    try {
      // Get the first x events for the coming x days
      const result = await client.
      api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`).
      top(query.top).
      select('subject,start,end,attendees,body,isCancelled,onlineMeetingUrl,location,organizer,responseStatus,webLink').
      orderby('start/dateTime').
      get();
      const attachments = result.value.map(event => {
        console.log(event);
        const attachment = {
          title: event.subject,
          thumb: `https://dummyimage.com/75x75/0074c6/ffffff.png&text=${(0, _moment2.default)(event.start).format('MMM Do')}`,
          color: responseStatuses[event.responseStatus.response],
          buttons: [{
            text: 'View Event',
            url: event.webLink }],

          // text: entities.decode(striptags(event.body.content)),
          values: [
          {
            key: 'Starts',
            value: (0, _moment2.default)(event.start.dateTime).format('HH:mm, DD/MM/YY') },

          {
            key: 'Ends',
            value: (0, _moment2.default)(event.end.dateTime).format('HH:mm, DD/MM/YY') }] };



        if (event.location && event.location.displayName) {
          attachment.values.push({
            key: 'Location',
            value: event.location.displayName });

        }
        if (event.organizer && event.organizer.emailAddress) {
          attachment.values.push({
            key: 'Organiser',
            value: event.organizer.emailAddress.name });

        }
        if (event.onlineMeetingUrl) {
          attachment.buttons.push(
          {
            text: 'Start Online Meeting',
            url: event.onlineMeetingUrl });


        }
        return attachment;
      });
      return {
        attachments,
        success: true };

    } catch (err) {
      error(err);
      return {
        err,
        success: false };

    }
  }
};exports.


getEvents = getEvents;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZpY2VzL21pY3Jvc29mdC9jYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJNaWNyb3NvZnRHcmFwaCIsImxvZyIsInJlcXVpcmUiLCJlcnJvciIsImVudGl0aWVzIiwiRW50aXRpZXMiLCJyZXNwb25zZVN0YXR1c2VzIiwibm9uZSIsIm9yZ2FuaXplciIsInRlbnRhdGl2ZWx5QWNjZXB0ZWQiLCJhY2NlcHRlZCIsImRlY2xpbmVkIiwibm90UmVzcG9uZGVkIiwiZ2V0RXZlbnRzIiwidG9rZW4iLCJxdWVyeSIsIk9iamVjdCIsImFzc2lnbiIsInRvcCIsImRheXNBaGVhZCIsImNsaWVudCIsIkNsaWVudCIsImluaXQiLCJhdXRoUHJvdmlkZXIiLCJkb25lIiwic3RhcnQiLCJEYXRlIiwiZW5kIiwic2V0RGF0ZSIsImdldERhdGUiLCJyZXN1bHQiLCJhcGkiLCJ0b0lTT1N0cmluZyIsInNlbGVjdCIsIm9yZGVyYnkiLCJnZXQiLCJhdHRhY2htZW50cyIsInZhbHVlIiwibWFwIiwiZXZlbnQiLCJjb25zb2xlIiwiYXR0YWNobWVudCIsInRpdGxlIiwic3ViamVjdCIsInRodW1iIiwiZm9ybWF0IiwiY29sb3IiLCJyZXNwb25zZVN0YXR1cyIsInJlc3BvbnNlIiwiYnV0dG9ucyIsInRleHQiLCJ1cmwiLCJ3ZWJMaW5rIiwidmFsdWVzIiwia2V5IiwiZGF0ZVRpbWUiLCJsb2NhdGlvbiIsImRpc3BsYXlOYW1lIiwicHVzaCIsImVtYWlsQWRkcmVzcyIsIm5hbWUiLCJvbmxpbmVNZWV0aW5nVXJsIiwic3VjY2VzcyIsImVyciJdLCJtYXBwaW5ncyI6InlHQUFBLHlFLElBQVlBLGM7QUFDWixnQztBQUNBLHNDO0FBQ0EsNkM7O0FBRUEsTUFBTUMsTUFBTUMsUUFBUSxPQUFSLEVBQWlCLCtCQUFqQixDQUFaO0FBQ0EsTUFBTUMsUUFBUUQsUUFBUSxPQUFSLEVBQWlCLGlDQUFqQixDQUFkOztBQUVBLE1BQU1FLFdBQVcsSUFBSUMsNkJBQUosRUFBakI7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QixxQkFBV1EsT0FBWCxDQUFtQlMsSUFBbkI7QUFDRTtBQUNFUixrQkFBTSxzQkFEUjtBQUVFQyxpQkFBS1osTUFBTXNCLGdCQUZiLEVBREY7OztBQU1EO0FBQ0QsZUFBT3BCLFVBQVA7QUFDRCxPQTNDbUIsQ0FBcEI7QUE0Q0EsYUFBTztBQUNMTCxtQkFESztBQUVMMEIsaUJBQVMsSUFGSixFQUFQOztBQUlELEtBeERELENBd0RFLE9BQU9DLEdBQVAsRUFBWTtBQUNaNUQsWUFBTTRELEdBQU47QUFDQSxhQUFPO0FBQ0xBLFdBREs7QUFFTEQsaUJBQVMsS0FGSixFQUFQOztBQUlEO0FBQ0Y7QUFDRixDQW5GRCxDOzs7QUFzRkVqRCxTLEdBQUFBLFMiLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNaWNyb3NvZnRHcmFwaCBmcm9tICdAbWljcm9zb2Z0L21pY3Jvc29mdC1ncmFwaC1jbGllbnQnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcbmltcG9ydCBzdHJpcHRhZ3MgZnJvbSAnc3RyaXB0YWdzJ1xuaW1wb3J0IHsgQWxsSHRtbEVudGl0aWVzIGFzIEVudGl0aWVzIH0gZnJvbSAnaHRtbC1lbnRpdGllcydcblxuY29uc3QgbG9nID0gcmVxdWlyZSgnZGVidWcnKSgnYmFzZWJvdDpzZXJ2aWNlczpjYWxlbmRhcjpsb2cnKVxuY29uc3QgZXJyb3IgPSByZXF1aXJlKCdkZWJ1ZycpKCdiYXNlYm90OnNlcnZpY2VzOmNhbGVuZGFyOmVycm9yJylcblxuY29uc3QgZW50aXRpZXMgPSBuZXcgRW50aXRpZXMoKVxuXG5jb25zdCByZXNwb25zZVN0YXR1c2VzID0ge1xuICBub25lOiAnI2E5YTlhOScsIC8vIGdyYXlcbiAgb3JnYW5pemVyOiAnIzMyY2QzMicsIC8vIGdyZWVuXG4gIHRlbnRhdGl2ZWx5QWNjZXB0ZWQ6ICcjZjViNDU1JywgLy8geWVsbG93XG4gIGFjY2VwdGVkOiAnIzMyY2QzMicsIC8vIGdyZWVuXG4gIGRlY2xpbmVkOiAnI2U0MWQxZCcsIC8vIHJlZFxuICBub3RSZXNwb25kZWQ6ICcjYTlhOWE5JyAvLyBncmF5XG59XG5cbmNvbnN0IGdldEV2ZW50cyA9IGFzeW5jICh7IHRva2VuIH0sIHF1ZXJ5ID0ge30pID0+IHtcbiAgcXVlcnkgPSBPYmplY3QuYXNzaWduKHtcbiAgICB0b3A6IDEsXG4gICAgZGF5c0FoZWFkOiAxMDBcbiAgfSwgcXVlcnkpXG4gIGlmICh0b2tlbikge1xuICAgIC8vIEluaXRpYWxpemUgR3JhcGggY2xpZW50XG4gICAgY29uc3QgY2xpZW50ID0gTWljcm9zb2Z0R3JhcGguQ2xpZW50LmluaXQoe1xuICAgICAgYXV0aFByb3ZpZGVyOiAoZG9uZSkgPT4ge1xuICAgICAgICBkb25lKG51bGwsIHRva2VuKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBTZXQgc3RhcnQgb2YgdGhlIGNhbGVuZGFyIHZpZXcgdG8gdG9kYXksIHJpZ2h0IG5vd1xuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoKVxuICAgIC8vIFNldCBlbmQgb2YgdGhlIGNhbGVuZGFyIHZpZXcgdG8geCBkYXlzIGZyb20gc3RhcnRcbiAgICBjb25zdCBlbmQgPSBuZXcgRGF0ZShuZXcgRGF0ZShzdGFydCkuc2V0RGF0ZShzdGFydC5nZXREYXRlKCkgKyBxdWVyeS5kYXlzQWhlYWQpKVxuXG4gICAgbG9nKCdmZXRjaGluZyBldmVudChzKScpXG4gICAgdHJ5IHtcbiAgICAgIC8vIEdldCB0aGUgZmlyc3QgeCBldmVudHMgZm9yIHRoZSBjb21pbmcgeCBkYXlzXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjbGllbnRcbiAgICAgICAgLmFwaShgL21lL2NhbGVuZGFyVmlldz9zdGFydERhdGVUaW1lPSR7c3RhcnQudG9JU09TdHJpbmcoKX0mZW5kRGF0ZVRpbWU9JHtlbmQudG9JU09TdHJpbmcoKX1gKVxuICAgICAgICAudG9wKHF1ZXJ5LnRvcClcbiAgICAgICAgLnNlbGVjdCgnc3ViamVjdCxzdGFydCxlbmQsYXR0ZW5kZWVzLGJvZHksaXNDYW5jZWxsZWQsb25saW5lTWVldGluZ1VybCxsb2NhdGlvbixvcmdhbml6ZXIscmVzcG9uc2VTdGF0dXMsd2ViTGluaycpXG4gICAgICAgIC5vcmRlcmJ5KCdzdGFydC9kYXRlVGltZScpXG4gICAgICAgIC5nZXQoKVxuICAgICAgY29uc3QgYXR0YWNobWVudHMgPSByZXN1bHQudmFsdWUubWFwKGV2ZW50ID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpXG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSB7XG4gICAgICAgICAgdGl0bGU6IGV2ZW50LnN1YmplY3QsXG4gICAgICAgICAgdGh1bWI6IGBodHRwczovL2R1bW15aW1hZ2UuY29tLzc1eDc1LzAwNzRjNi9mZmZmZmYucG5nJnRleHQ9JHttb21lbnQoZXZlbnQuc3RhcnQpLmZvcm1hdCgnTU1NIERvJyl9YCxcbiAgICAgICAgICBjb2xvcjogcmVzcG9uc2VTdGF0dXNlc1tldmVudC5yZXNwb25zZVN0YXR1cy5yZXNwb25zZV0sXG4gICAgICAgICAgYnV0dG9uczogW3tcbiAgICAgICAgICAgIHRleHQ6ICdWaWV3IEV2ZW50JyxcbiAgICAgICAgICAgIHVybDogZXZlbnQud2ViTGlua1xuICAgICAgICAgIH1dLFxuICAgICAgICAgIC8vIHRleHQ6IGVudGl0aWVzLmRlY29kZShzdHJpcHRhZ3MoZXZlbnQuYm9keS5jb250ZW50KSksXG4gICAgICAgICAgdmFsdWVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogJ1N0YXJ0cycsXG4gICAgICAgICAgICAgIHZhbHVlOiBtb21lbnQoZXZlbnQuc3RhcnQuZGF0ZVRpbWUpLmZvcm1hdCgnSEg6bW0sIEREL01NL1lZJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogJ0VuZHMnLFxuICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KGV2ZW50LmVuZC5kYXRlVGltZSkuZm9ybWF0KCdISDptbSwgREQvTU0vWVknKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQubG9jYXRpb24gJiYgZXZlbnQubG9jYXRpb24uZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICBhdHRhY2htZW50LnZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgIGtleTogJ0xvY2F0aW9uJyxcbiAgICAgICAgICAgIHZhbHVlOiBldmVudC5sb2NhdGlvbi5kaXNwbGF5TmFtZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50Lm9yZ2FuaXplciAmJiBldmVudC5vcmdhbml6ZXIuZW1haWxBZGRyZXNzKSB7XG4gICAgICAgICAgYXR0YWNobWVudC52YWx1ZXMucHVzaCh7XG4gICAgICAgICAgICBrZXk6ICdPcmdhbmlzZXInLFxuICAgICAgICAgICAgdmFsdWU6IGV2ZW50Lm9yZ2FuaXplci5lbWFpbEFkZHJlc3MubmFtZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50Lm9ubGluZU1lZXRpbmdVcmwpIHtcbiAgICAgICAgICBhdHRhY2htZW50LmJ1dHRvbnMucHVzaChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ1N0YXJ0IE9ubGluZSBNZWV0aW5nJyxcbiAgICAgICAgICAgICAgdXJsOiBldmVudC5vbmxpbmVNZWV0aW5nVXJsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2htZW50XG4gICAgICB9KVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXR0YWNobWVudHMsXG4gICAgICAgIHN1Y2Nlc3M6IHRydWVcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGVycm9yKGVycilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVycixcbiAgICAgICAgc3VjY2VzczogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgZ2V0RXZlbnRzXG59XG4iXX0=