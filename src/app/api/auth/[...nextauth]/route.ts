import { LoginUser } from '@/services/user';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const AuthOptionsConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      authorize: async (credentials) => {
        const errorMsg = 'Error al iniciar sesión';
        if (!credentials?.username || !credentials?.password) {
          throw new Error(errorMsg);
        }

        try {
          const { data: response } = await LoginUser({
            email: credentials.username,
            password: credentials.password,
          });

          console.log({
            data: response,
          });
          if (!response?.access_token) {
            throw new Error(errorMsg);
          }

          return {
            ...response.user,
            token: response.access_token,
          };
        } catch {
          throw new Error(errorMsg);
        }
      },
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 dia
  },
  pages: {
    signIn: '/auth/login',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};

const handler = NextAuth(AuthOptionsConfig);

export { handler as GET, handler as POST };

