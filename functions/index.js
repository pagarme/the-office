const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { allowedDomains } = require('./config')

admin.initializeApp()

const userOnlineRef = functions.database.ref('/users/{userId}/online')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

exports.removeFromRooms = userOnlineRef.onUpdate((change, context) => {
  const { params } = context
  const { userId } = params
  const newRef = change.after
  const oldRef = change.before

  const hasChange = newRef.val() === oldRef.val()
  const isOnline = newRef.val()

  if (hasChange || isOnline) {
    return null
  }

  return delay(2000)
    .then(() => {
      return admin.database()
        .ref(`users/${userId}/online`)
        .once('value')
    })
    .then(userStateSnap => userStateSnap && userStateSnap.val())
    .then((userState) => {
      if (!userState) {
        return admin.database()
          .ref(`users/${userId}/activeRoom`)
          .once('value')
          .then(activeSnap => activeSnap && activeSnap.val())
          .then((activeRoom) => {
            if (activeRoom) {
              return Promise.all([
                admin.database()
                  .ref(`rooms/${activeRoom}/users/${userId}`)
                  .set(null),
                admin.database()
                  .ref(`users/${userId}/activeRoom`)
                  .set(null),
              ])
            }
          })
      }
      return true
    })
})

exports.ensureAllowedDomains = functions.auth
  .user()
  .onCreate(({ uid, email }) => {
    const emailTokens = email.split('@')
    const domain = emailTokens.pop()
    if (allowedDomains.includes(domain)) {
      return true
    }

    return Promise.all([
      admin.database().ref(`blockedUsers/${uid}`).set(true),
      admin.database().ref(`users/${uid}/blocked`).set(true),
      admin.auth().revokeRefreshTokens(uid),
      admin.auth().updateUser(uid, { disabled: true }),
    ])
  })

function arrayrify (obj) {
  try {
    return Object.keys(obj).map((key) => {
      if (!obj[key].length) {
        return Object.assign(obj[key], { id: key })
      }

      return Object.assign({ value: obj[key] }, { id: key })
    })
  } catch (e) {
    return []
  }
}

function safeArrayrify (obj) {
  try {
    obj = obj && obj.val ? obj.val() : obj
    if (obj && Object.keys(obj).length) {
      return arrayrify(obj)
    }
    return []
  } catch (e) {
    return []
  }
}

exports.refreshOfflineUsers = functions.https.onRequest((req, res) => {
  return admin.database()
    .ref(`users`)
    .orderByChild('activeRoom')
    .startAt('!')
    .endAt('~')
    .once('value')
    .then(safeArrayrify)
    .then((users) => {
      return Promise.all(
        users.map(user => {
          if (user.online) {
            return true
          }
          return Promise.all([
            admin.database()
              .ref(`rooms/${user.activeRoom}/users/${user.id}`)
              .set(null),
            admin.database()
              .ref(`users/${user.id}/activeRoom`)
              .set(null),
          ])
        })
      )
    })
    .then(() => res.send('Done!'))
})
