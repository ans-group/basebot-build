'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.messaging = exports.getSingle = exports.db = exports.auth = undefined;var _firebaseAdmin = require('firebase-admin');var admin = _interopRequireWildcard(_firebaseAdmin);
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}
const serviceAccount = (() => {
  if (_fs2.default.existsSync(`${__dirname}/../firebase.json`)) {
    return require('../firebase.json');
  } else {
    return JSON.parse(process.env.FIREBASE);
  }
})();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL });


const auth = admin.auth();
const db = admin.firestore();
const messaging = admin.messaging();

/**
                                      * Utility function to simplify grabbing a single document from firestore by ID
                                      * @param {String} collection the collection name in which the document is stored
                                      * @param {String} docId the ID of the document to fetch
                                      * @returns {Object} firebase doc (or empty object)
                                      */
const getSingle = (collection, docId) => new Promise((resolve, reject) => {
  db.collection(collection).doc(docId).get().then(doc => {
    if (doc.exists) {
      resolve(doc.data());
    } else {
      resolve({});
    }
  }).catch(() => resolve({}));
});exports.

auth = auth;exports.db = db;exports.getSingle = getSingle;exports.messaging = messaging;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLmpzIl0sIm5hbWVzIjpbImFkbWluIiwic2VydmljZUFjY291bnQiLCJmcyIsImV4aXN0c1N5bmMiLCJfX2Rpcm5hbWUiLCJyZXF1aXJlIiwiSlNPTiIsInBhcnNlIiwicHJvY2VzcyIsImVudiIsIkZJUkVCQVNFIiwiaW5pdGlhbGl6ZUFwcCIsImNyZWRlbnRpYWwiLCJjZXJ0IiwiZGF0YWJhc2VVUkwiLCJEQl9VUkwiLCJhdXRoIiwiZGIiLCJmaXJlc3RvcmUiLCJtZXNzYWdpbmciLCJnZXRTaW5nbGUiLCJjb2xsZWN0aW9uIiwiZG9jSWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRvYyIsImdldCIsInRoZW4iLCJleGlzdHMiLCJkYXRhIiwiY2F0Y2giXSwibWFwcGluZ3MiOiJ5SkFBQSwrQyxJQUFZQSxLO0FBQ1osd0I7QUFDQSxNQUFNQyxpQkFBaUIsQ0FBQyxNQUFNO0FBQzVCLE1BQUlDLGFBQUdDLFVBQUgsQ0FBZSxHQUFFQyxTQUFVLG1CQUEzQixDQUFKLEVBQW9EO0FBQ2xELFdBQU9DLFFBQVEsa0JBQVIsQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU9DLEtBQUtDLEtBQUwsQ0FBV0MsUUFBUUMsR0FBUixDQUFZQyxRQUF2QixDQUFQO0FBQ0Q7QUFDRixDQU5zQixHQUF2Qjs7QUFRQVYsTUFBTVcsYUFBTixDQUFvQjtBQUNsQkMsY0FBWVosTUFBTVksVUFBTixDQUFpQkMsSUFBakIsQ0FBc0JaLGNBQXRCLENBRE07QUFFbEJhLGVBQWFOLFFBQVFDLEdBQVIsQ0FBWU0sTUFGUCxFQUFwQjs7O0FBS0EsTUFBTUMsT0FBT2hCLE1BQU1nQixJQUFOLEVBQWI7QUFDQSxNQUFNQyxLQUFLakIsTUFBTWtCLFNBQU4sRUFBWDtBQUNBLE1BQU1DLFlBQVluQixNQUFNbUIsU0FBTixFQUFsQjs7QUFFQTs7Ozs7O0FBTUEsTUFBTUMsWUFBWSxDQUFDQyxVQUFELEVBQWFDLEtBQWIsS0FBdUIsSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN4RVIsS0FBR0ksVUFBSCxDQUFjQSxVQUFkLEVBQTBCSyxHQUExQixDQUE4QkosS0FBOUIsRUFBcUNLLEdBQXJDLEdBQTJDQyxJQUEzQyxDQUFnREYsT0FBTztBQUNyRCxRQUFJQSxJQUFJRyxNQUFSLEVBQWdCO0FBQ2RMLGNBQVFFLElBQUlJLElBQUosRUFBUjtBQUNELEtBRkQsTUFFTztBQUNMTixjQUFRLEVBQVI7QUFDRDtBQUNGLEdBTkQsRUFNR08sS0FOSCxDQU1TLE1BQU1QLFFBQVEsRUFBUixDQU5mO0FBT0QsQ0FSd0MsQ0FBekMsQzs7QUFVU1IsSSxHQUFBQSxJLFNBQU1DLEUsR0FBQUEsRSxTQUFJRyxTLEdBQUFBLFMsU0FBV0QsUyxHQUFBQSxTIiwiZmlsZSI6ImZpcmViYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYWRtaW4gZnJvbSAnZmlyZWJhc2UtYWRtaW4nXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5jb25zdCBzZXJ2aWNlQWNjb3VudCA9ICgoKSA9PiB7XG4gIGlmIChmcy5leGlzdHNTeW5jKGAke19fZGlybmFtZX0vLi4vZmlyZWJhc2UuanNvbmApKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4uL2ZpcmViYXNlLmpzb24nKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHByb2Nlc3MuZW52LkZJUkVCQVNFKVxuICB9XG59KSgpXG5cbmFkbWluLmluaXRpYWxpemVBcHAoe1xuICBjcmVkZW50aWFsOiBhZG1pbi5jcmVkZW50aWFsLmNlcnQoc2VydmljZUFjY291bnQpLFxuICBkYXRhYmFzZVVSTDogcHJvY2Vzcy5lbnYuREJfVVJMXG59KVxuXG5jb25zdCBhdXRoID0gYWRtaW4uYXV0aCgpXG5jb25zdCBkYiA9IGFkbWluLmZpcmVzdG9yZSgpXG5jb25zdCBtZXNzYWdpbmcgPSBhZG1pbi5tZXNzYWdpbmcoKVxuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gc2ltcGxpZnkgZ3JhYmJpbmcgYSBzaW5nbGUgZG9jdW1lbnQgZnJvbSBmaXJlc3RvcmUgYnkgSURcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb2xsZWN0aW9uIHRoZSBjb2xsZWN0aW9uIG5hbWUgaW4gd2hpY2ggdGhlIGRvY3VtZW50IGlzIHN0b3JlZFxuICogQHBhcmFtIHtTdHJpbmd9IGRvY0lkIHRoZSBJRCBvZiB0aGUgZG9jdW1lbnQgdG8gZmV0Y2hcbiAqIEByZXR1cm5zIHtPYmplY3R9IGZpcmViYXNlIGRvYyAob3IgZW1wdHkgb2JqZWN0KVxuICovXG5jb25zdCBnZXRTaW5nbGUgPSAoY29sbGVjdGlvbiwgZG9jSWQpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uKS5kb2MoZG9jSWQpLmdldCgpLnRoZW4oZG9jID0+IHtcbiAgICBpZiAoZG9jLmV4aXN0cykge1xuICAgICAgcmVzb2x2ZShkb2MuZGF0YSgpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlKHt9KVxuICAgIH1cbiAgfSkuY2F0Y2goKCkgPT4gcmVzb2x2ZSh7fSkpXG59KVxuXG5leHBvcnQgeyBhdXRoLCBkYiwgZ2V0U2luZ2xlLCBtZXNzYWdpbmcgfVxuIl19