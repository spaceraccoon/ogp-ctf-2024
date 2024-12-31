export function Form({
  action,
  isOtpSent,
  children,
}: {
  action: any;
  isOtpSent: boolean;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      {isOtpSent ? 
        <div>
          <label
            htmlFor="otp"
            className="block text-xs text-gray-600 uppercase"
          >
            OTP
          </label>
          <input
            id="otp"
            name="otp"
            type="otp"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div> :
        <div>
          <label
            htmlFor="email"
            className="block text-xs text-gray-600 uppercase"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="user@ogpctf.com"
            autoComplete="email"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
      }
      {children}
    </form>
  );
}
