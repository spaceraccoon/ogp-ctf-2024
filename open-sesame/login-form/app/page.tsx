import { LoginButton, LogoutButton } from './auth'
import {getSession} from "@/app/api/auth/[...nextauth]/auth";
import Dashboard from "@/app/(app)/dashboard/page";

export default async function Home() {
  const session = await getSession()

  return (
      <main>
          <div className="flex items-center justify-center h-screen gap-8">
              <div className="p-6 bg-gray-200">
                  <LoginButton/>
              </div>

              {session?.user?.name && <div className="p-6 bg-gray-200"><LogoutButton/></div>}

              {session?.user?.name && <div className="p-6 bg-gray-200"><Dashboard/></div>}
          </div>
      </main>
  )
}
