# OGP CTF 2024

A web CTF built to train developers in secure coding while having fun! This was built completely on Vercel + NextJS, CTFd, and Cloudflare Access to protect boxes. Blogpost incoming!

## Challenges

| Category | Points | Title             | Box                 | Challenge                                                                                                  |
|----------|--------|-------------------|---------------------|------------------------------------------------------------------------------------------------------------|
| Easy     | 100    | hello world       | `hello-world`       | Welcome to your OPENING challenge! Try to get the flag...                                                  |
| Easy     | 100    | access denied     | `access-denied`     | Seems like a simple API but I can't get the admin's flag!                                                  |
| Easy     | 100    | prompt reply      | `smart-home`        | Wow, this smart home can fetch the weather! I wonder whether it needs a special key...                     |
| Easy     | 100    | cross word        | `cross-word`        | A preview generation feature! Try to trigger `getFlag()`!                                                  |
| Easy     | 100    | open sesame       | `open-sesame`       | I don't have the password to this, but maybe I can try something else?                                     |
| Easy     | 100    | case closed       | `case-closed`       | Oof, this is a protected route. How can I get around it? (source code provided)                            |
| Easy     | 100    | one time password | `one-time-password` | Wow, that's a really weak OTP!                                                                             |
| Medium   | 150    | chat bot          | `chat-bot`          | This AI chat bot is hiding a secret!                                                                       |
| Medium   | 150    | orm nom nom       | `orm-nom-nom`       | This only allows a certain user to get the real flag! How can I bypass this filter? (source code provided) |
| Medium   | 150    | mask mandate      | `mask-mandate`      | Is it that hard to crack an NRIC?                                                                          |
| Medium   | 150    | camera path       | `smart-home`        | Cool, there's a camera photo feature! But something looks wrong...                                         |
| Hard     | 200    | server fetch      | `smart-home`        | This smart home fetches live data!                                                                         |
| Hard     | 200    | two time password | `two-time-password` | This generates an uncrackable OTP now! Or is it? (source code provided)                                    |


## Explanation

| Category | Points | Title             | Box                 | Explanation                                                                                                                                        |
|----------|--------|-------------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Easy     | 100    | hello world       | `hello-world`       | A simple open redirect vulnerability.                                                                                                              |
| Easy     | 100    | access denied     | `access-denied`     | A simple nested Insecure Direct Object Reference vulnerability.                                                                                    |
| Easy     | 100    | prompt reply      | `smart-home`        | Prompt injection demonstrating that LLMs cannot keep a secret without hard filters.                                                                |
| Easy     | 100    | cross word        | `cross-word`        | A simple cross-site scripting vulnerability.                                                                                                       |
| Easy     | 100    | open sesame       | `open-sesame`       | A simple SQL injection vulnerability.                                                                                                              |
| Easy     | 100    | case closed       | `case-closed`       | This highlights a lesser-known weakness in NextJS inconsistent use of case-sensitive routes, especially when setting protected routes.             |
| Easy     | 100    | one time password | `one-time-password` | A simple brute-forceable weak OTP.                                                                                                                 |
| Medium   | 150    | chat bot          | `chat-bot`          | A hardened LLM chat bot against leaking secrets, but still fallible.                                                                               |
| Medium   | 150    | orm nom nom       | `orm-nom-nom`       | This highlights a lesser-known weakness in Prisma ORM that allows % or _ wildcards when using filters.                                             |
| Medium   | 150    | mask mandate      | `mask-mandate`      | When the birth year and a masked NRIC as per guidelines is known, there are only about 10 possible combinations which makes it very easy to crack. |
| Medium   | 150    | camera path       | `smart-home`        | A path traversal vulnerability in file read, obscured by a base64 background image format, and OpenAI o1's built-in security filters.              |
| Hard     | 200    | server fetch      | `smart-home`        | A server-side request forgery vulnerability caused by path concatenation, and OpenAI o1's built-in security filters.                               |
| Hard     | 200    | two time password | `two-time-password` | Use of Math.random() for generating OTPs is inherently crackable.                                                                                  |