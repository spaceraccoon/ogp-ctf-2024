import {getSession} from "@/app/api/auth/[...nextauth]/auth";
import {createHash} from "node:crypto";

export default async function Dashboard() {
  const session = await getSession()
  const flag = `u53_0rm_pr0p3r1y_${createHash('md5').update(process.env.FLAG_KEY || '').digest('hex')}`

  return <>
    Super Secret Page
    <div id="content">
      <div id="${name}">
        Hello {session?.user?.name}! Your flag is {flag}!
      </div>
    </div>
  </>
}
