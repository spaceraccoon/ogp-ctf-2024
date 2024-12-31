import { Form } from 'app/form';
import { signIn } from 'app/auth';
import { SubmitButton } from 'app/submit-button';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Only *@ogpctf.com emails can get access to the flag! Login with &lt;CTF USERNAME&gt;@ogpctf.com.
          </p>
        </div>
        <Form
          action={async (formData: FormData) => {
            'use server';
            try {
              await signIn('credentials', {
                redirectTo: '/otp',
                email: formData.get('email') as string,
                otp: '',
              });
            } catch (error) {
              if(error instanceof AuthError) {
                switch (error.type) {
                  case "CredentialsSignin":
                    redirect(`/otp?email=${formData.get('email') as string}`)
                  default:
                    return { error: "Something went wrong" }
                }
              }
              throw error;
            }
          }}
          isOtpSent={false}
        >
          <SubmitButton>Sign in</SubmitButton>
        </Form>
      </div>
    </div>
  );
}