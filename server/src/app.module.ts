import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './modules/assignment/assignment.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'frag',
  schema: 'frag',
  entities: [Assignment],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(dbOptions), AssignmentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
