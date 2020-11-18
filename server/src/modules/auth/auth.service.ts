import { Injectable } from '@nestjs/common';
import * as passport from 'passport';
import { LoginResponseDto } from './dtos/LoginResponseDto';
import { UserDto } from './dtos/UserDto';
import * as jwt from 'jsonwebtoken';
import { UserRawDto } from './dtos/UseRawDto';

const TOKEN_EXPIRATION_SECS = 2 * 86400; // 2 days

@Injectable()
export class AuthService {
  login(req: any, res: any): Promise<LoginResponseDto> {
    return passport.authenticate(
      'ldap',
      { session: false },
      (err, user, info) => {
        const error = err || info;

        if (error) {
          return res.send({
            status: 500,
            data: error,
          });
        }

        if (!user) {
          return res.send({
            status: 404,
            data: 'User Not Found',
          });
        } else {
          return res.send({
            status: 200,
            data: this.mapUserToDto(user),
            token: this.generateAuthToken(user),
          });
        }
      },
    )(req, res);
  }

  generateAuthToken(user: UserRawDto): string {
    return jwt.sign({ uid: user.uid }, process.env.JWT_KEY, {
      expiresIn: TOKEN_EXPIRATION_SECS,
    });
  }

  mapUserToDto(user: UserRawDto): UserDto {
    const { displayName, uid, description, mail } = user;

    const ucoIndex = description.indexOf('UCO=');
    const uco = description.substring(ucoIndex + 4, description.length);
    const dto: UserDto = {
      id: parseInt(uco),
      uid,
      name: displayName,
      mail,
    };

    return dto;
  }
}
