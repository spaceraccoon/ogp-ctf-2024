'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hello() {
  const [message, setMessage] = useState<string>()
  const [maskedNric, setMaskedNric] = useState<string>()
  const [birthYear, setBirthYear] = useState<string>()
  const [guessNric, setGuessNric] = useState<string>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/nric')
      const {message, maskedNric, birthYear} = await res.json()
      setMessage(message)
      setMaskedNric(maskedNric)
      setBirthYear(birthYear)
    }
    fetchData()
  }, [])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setGuessNric(e.currentTarget.value)
  }

  const handleClick = async () => {
    const res = await fetch('/api/nric', {
      method: 'POST',
      body: JSON.stringify({ nric: guessNric })
    })
    const {message, maskedNric, birthYear} = await res.json()
    setMessage(message)
    setMaskedNric(maskedNric)
    setBirthYear(birthYear)
  }  

  return <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center px-4 md:px-6 space-y-4">
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Target NRIC changes every 10 seconds!
            </p>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {!message ? "Loading..." : message}        
            </h1>
            <h2>Masked NRIC: {maskedNric}</h2>
            <h2>Birth Year: {birthYear}</h2>
            <div className="w-full max-w-sm min-w-[200px]">
              <input onChange={handleChange} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." />
            </div>

            <button
            onClick={handleClick}
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
        >
          Test NRIC
        </button>
          </div>
        </section>
}
