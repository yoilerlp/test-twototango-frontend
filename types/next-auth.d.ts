// types/next-auth.d.ts
import { User } from '@/interfaces/user';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & {
      token: string;
    };
  }
}

