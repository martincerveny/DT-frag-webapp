import { Attendance } from './attendance';

export interface StudentAttendance extends Attendance {
  seminar_name: string;
}
