import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser, upsertUser } from 'app/db';
import { authConfig } from 'app/auth.config';

export function generateOTP(): string {
  return Math.random().toString(24).slice(2,12);
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        otp: { label: "OTP", type: "text", placeholder: "Enter your OTP" },
      },

      async authorize({ email, otp }: any) {
        if (!email || typeof email !== 'string' || email.split('@')[1] !== 'ogpctf.com' ) {
          return null;
        }


        if (otp && typeof otp === 'string' && otp !== '') {
          // Verify OTP
          const user = await getUser(email);

          if (user.length !== 0 && user[0].otp === otp) {
            // Delete user
            const otp = generateOTP();
            await upsertUser(email, otp);
            return { id: email, email };
          }
          return null;
        } else {
          // Generate and store new OTP with user
          const otp = generateOTP();
          await upsertUser(email, otp);
          console.log(`Added ${email}: ${otp}`)
          return null;
        }
      },

    }),
  ],
});
