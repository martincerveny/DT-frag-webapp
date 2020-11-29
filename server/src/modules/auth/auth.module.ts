import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LdapStrategy } from './ldap.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    PassportModule.register({ defaultStrategy: 'ldap' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LdapStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'ldap' }), AuthService],
})
export class AuthModule {}
