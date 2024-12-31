import { auth, signOut } from 'app/auth';
import * as crypto from 'crypto';
import { SubmitButton } from 'app/submit-button';

export default async function ProtectedPage() {
  let session = await auth();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Flag</h3>
          <p className="text-sm text-gray-500">
            1n53cur3_cRypT0_{
              crypto
                .createHash('md5')
                .update(process.env.FLAG_KEY || '')
                .update(session!.user!.email!.split('@')[0])
                .digest("hex")             
            }
          </p>
          <SignOut />
        </div>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <SubmitButton>Sign Out</SubmitButton>
    </form>
  );
}

