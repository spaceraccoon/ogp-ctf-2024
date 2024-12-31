import * as crypto from 'crypto';

export default async function ProtectedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const username = (await searchParams).username

  if (typeof username === 'string' && username.length > 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Flag</h3>
            <p className="text-sm text-gray-500">
              c@53_5n51t1v3_r0ut35_{
                crypto
                  .createHash('md5')
                  .update(process.env.FLAG_KEY || '')
                  .update(username)
                  .digest("hex")             
              }
            </p>
          </div>
        </div>
      </div>
    );  
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Flag</h3>
          <p className="text-sm text-gray-500">
            You are missing your CTF username, add it as a query parameter like /flag?username=&lt;CTF USERNAME&gt;
          </p>
        </div>
      </div>
    </div>
  );
}
