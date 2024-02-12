const pool = require("../config/db");


// Kullanıcıları saklamak için işlev
async function getUser(user_email, password) {
  const query = 'SELECT id FROM users WHERE user_email = $1 AND password = $2';
  const values = [user_email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// İstemci bilgilerini almak için işlev
async function getClient(clientId, clientSecret) {
  const query = 'SELECT id FROM clients WHERE client_id = $1 AND client_secret = $2';
  const values = [clientId, clientSecret];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Erişim belirteçlerini saklamak için işlev
async function saveToken(token, clientId, userId) {
  const query = 'INSERT INTO access_tokens (access_token, expires_at, user_id, client_id) VALUES ($1, $2, $3, $4)';
  const values = [token.accessToken, token.expiresAt, userId, clientId];
  await pool.query(query, values);
}

// Yetkilendirme kodlarını saklamak için işlev (opsiyonel, gerekirse ekleyebilirsiniz)
async function saveAuthorizationCode(code, clientId, userId) {
  // Yetkilendirme kodlarını saklamak için gerekli işlemleri gerçekleştirin
}

module.exports = {
  getUser,
  getClient,
  saveToken,
  saveAuthorizationCode // İhtiyaca göre kullanılabilir
};