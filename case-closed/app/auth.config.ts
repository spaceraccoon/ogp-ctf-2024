import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      console.log(nextUrl.pathname)
      let isOnFlag = nextUrl.pathname.startsWith('/flag') || nextUrl.pathname.startsWith('/oldflag');

      if (isOnFlag) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/flag', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
