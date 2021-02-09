const appName = 'Escritório Pagar.me'
const appSlug = 'escritorio-pagarme'

const firebaseConfig = {
  apiKey: 'AIzaSyAzIRaAavq_t2GESw0QkWqIOj4EXKSJt_k',
  databaseURL: 'https://pagarme-escritorio.firebaseio.com/',
  projectId: 'project-637593188501',
  authDomain: 'pagarme-escritorio.firebaseapp.com',
  appId: '1:637593188501:web:c7b9d7d3c4f7d369',
}

const allowedDomains = [
  'pagar.me',
  'stone.co',
  'stone.com.br',
  'mundipagg.com',
]

module.exports = {
  appName,
  appSlug,
  allowedDomains,
  firebaseConfig,
}
