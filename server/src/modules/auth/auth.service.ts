import { Injectable } from '@nestjs/common';
import * as passport from 'passport';
import { LoginResponseDto } from './dtos/LoginResponseDto';
import * as jwt from 'jsonwebtoken';
import { UserDto } from './dtos/UseDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tutor } from './entities/tutor.entity';
import { TutorDto } from './dtos/TutorDto';

const TOKEN_EXPIRATION_SECS = 2 * 86400; // 2 days

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Tutor)
    private tutorRepisotiry: Repository<Tutor>,
  ) {}

  findTutorById(id: number): Promise<TutorDto> {
    return this.tutorRepisotiry
      .createQueryBuilder('tutor')
      .select([
        'tutor.teacher as id',
        'person.name as name',
        'encode("login"::bytea, \'escape\') as login',
      ])
      .leftJoin('person', 'person', 'person.id = tutor.teacher')
      .where('tutor.teacher = :id', { id })
      .getRawOne();
  }

  login(req: any, res: any): Promise<LoginResponseDto> {
    return passport.authenticate('ldap', async (err, user, info) => {
      const error = err || info;

      if (error) {
        return res.send({
          status: 500,
          data: error,
        });
      }

      const tutor = await this.findTutorById(this.getUserId(user));

      if (!tutor) {
        return res.send({
          status: 404,
          data: { message: 'User not found' },
        });
      } else {
        return res.send({
          status: 200,
          data: tutor,
          token: this.generateAuthToken(tutor.id),
        });
      }
    })(req, res);
  }

  generateAuthToken(id: number): string {
    return jwt.sign({ id }, process.env.JWT_KEY, {
      expiresIn: TOKEN_EXPIRATION_SECS,
    });
  }

  getUserId(user: UserDto): number {
    const { description } = user;
    const ucoIndex = description.indexOf('UCO=');
    const uco = description.substring(ucoIndex + 4, description.length);

    return parseInt(uco);
  }
}
