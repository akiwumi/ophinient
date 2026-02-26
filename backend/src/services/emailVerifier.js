const dns = require("dns");
const { promisify } = require("util");

const resolveMx = promisify(dns.resolveMx);

async function verifyEmailDomain(email) {
  const domain = email.split("@")[1];
  if (!domain) return false;

  try {
    const records = await resolveMx(domain);
    return Array.isArray(records) && records.length > 0;
  } catch {
    return false;
  }
}

module.exports = { verifyEmailDomain };
