import { Injectable } from '@nestjs/common';
import * as passport from 'passport';
import { LoginResponseDto } from './dtos/LoginResponseDto';
import * as jwt from 'jsonwebtoken';
import { UserDto } from './dtos/UserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherDto } from './dtos/TeacherDto';

const TOKEN_EXPIRATION_SECS = 2 * 86400; // 2 days

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  findTeacherById(id: number): Promise<TeacherDto> {
    return this.teacherRepository
      .createQueryBuilder('teacher_list')
      .select([
        'teacher_list.teacher as id',
        'person.name as name',
        'encode("login"::bytea, \'escape\') as login',
      ])
      .leftJoin('person', 'person', 'person.id = teacher_list.teacher')
      .where('teacher_list.teacher = :id', { id })
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

      const teacher = await this.findTeacherById(this.getUserId(user));

      if (!teacher) {
        return res.send({
          status: 404,
          data: { message: 'User not found' },
        });
      } else {
        return res.send({
          status: 200,
          data: teacher,
          token: this.generateAuthToken(teacher.id),
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
