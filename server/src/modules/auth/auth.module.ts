import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {PassportModule} from "@nestjs/passport";
import {LdapStrategy} from "./ldap.strategy";
import {AuthService} from "./auth.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'ldap'}),
  ],
  controllers: [AuthController],
  providers: [LdapStrategy, AuthService],
  exports: [
    PassportModule.register({ defaultStrategy: 'ldap'}),
  ],
})
export class AuthModule {}
