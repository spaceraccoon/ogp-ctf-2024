'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hello() {
  const [message, setMessage] = useState<string>('')
  const [name, setName] = useState<string>('world')
  
  const fetchData = async (newName: string) => {
    const res = await fetch(`/api/preview?name=${newName}`)
    const text = await res.text()
    setMessage(text)
  }

  useEffect(() => {
    fetchData(name)
  }, [])

  return <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center px-4 md:px-6 space-y-4">
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Enter your name:
            </p>
          <div className="w-full max-w-sm min-w-[200px]">
            <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" value={name} onChange={(event) => {setName(event.target.value); fetchData(event.target.value)}}>
            </input>
          </div>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Here is the preview:
            </p>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <div dangerouslySetInnerHTML={{ __html: message }} />  
            </h1>
            <Link
          href={`/api/preview?name=${name}`}
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
          prefetch={false}
        >
          View the API call
        </Link>
          </div>
        </section>
}
