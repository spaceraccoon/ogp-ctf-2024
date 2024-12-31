import { Form } from 'app/form';
import { signIn, generateOTP } from '@/app/auth';
import { SubmitButton } from 'app/submit-button';
import { AuthError } from 'next-auth';

export default async function Login({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const email = (await searchParams).email
  if (typeof email === 'string' && ['ogpctf.com', 'ogpctf.xyz'].includes(email.split('@')[1])) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Enter OTP</h3>
            <p className="text-sm text-gray-500">
              { email.split('@')[1] === 'ogpctf.com' ? 'An extremely complex, unbruteforceable OTP has been sent to your email!' : `Generated OTP ${generateOTP()}` }
            </p>
          </div>
          { email.split('@')[1] === 'ogpctf.com' && <Form
            action={async (formData: FormData) => {
              'use server';
              try {
                await signIn('credentials', {
                  redirectTo: '/flag',
                  email: (await searchParams).email,
                  otp: formData.get('otp') as string,
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  return { error: "Something went wrong" }
                }
                throw error;      
              }
            }}
            isOtpSent={true}
          >
            <SubmitButton>Sign in</SubmitButton>
          </Form> }
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Invalid Email</h3>
            <p className="text-sm text-gray-500">
              Please use a valid email.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
