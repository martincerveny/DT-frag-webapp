import * as Strategy from 'passport-ldapauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { getLdapConfig } from '../../code/constants/ldap';

@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, 'ldap') {
  constructor() {
    super(getLdapConfig(), async (req: Request, user: any, done) => {
      req.user = user;
      return done(null, user);
    });
  }
}
