import * as fs from 'fs';

export const getLdapConfig = () => {
  return {
    passReqToCallback: true,
    server: {
      url: 'ldaps://ldap.fi.muni.cz',
      searchBase: 'ou=People,dc=fi,dc=muni,dc=cz',
      searchFilter: '(uid={{username}})',
      searchAttributes: ['uid', 'displayName', 'mail', 'description'],
      tlsOptions: {
        ca: [fs.readFileSync('./FI_CA.pem')],
      },
    },
  };
};
