import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './modules/assignment/entities/assignment.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AssignmentGroup } from './modules/assignment/entities/assignmentGroup.entity';

const dbOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'frag',
  schema: 'frag',
  entities: [Assignment, AssignmentGroup],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(dbOptions), AssignmentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
