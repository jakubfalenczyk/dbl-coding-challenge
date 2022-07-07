import { NextPage } from 'next'
import { useState } from 'react'

import Layout from '../components/layout'
import useApiData from '../hooks/use-api-data'
import Airport from '../types/airport'

const Page: NextPage = () => {
  const airports = useApiData<Airport[]>('/api/airports', [])

  const [searchPhrase, setSearchPhrase] = useState("")
  const filteredAirports = airports.filter(x => {
    const source = `${x.city} ${x.country} ${x.iata} ${x.name}`
    const normalizedSource = source.toLowerCase()

    return normalizedSource.includes(searchPhrase.toLowerCase())
  })
  const airPortsCount = filteredAirports.length

  const onSearch = (text: string) => {
      setSearchPhrase(text)
  }

  return <Layout>
    <h1 className='text-2xl font-bold'>Code Challenge: Airports</h1>

    <input onChange={e => onSearch(e.target.value)}  className="h-14 mt-10 placeholder:text-gray-400 placeholder:text-base block bg-slate-50 w-full border border-slate-300 rounded-md py-2 pl-5 pr-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Start typing..." type="text" name="search"/>

    <div className="mt-10 container flex">
        <h2 className="text-lg font-bold">Airports</h2>
        <h3 className="ml-3 pt-1 px-2 font-semibold text-sm bg-blue-400 text-white rounded-full shadow-sm">{airPortsCount}</h3>
    </div>
    
    <div className="container columns-2 pt-5">
      {filteredAirports.map(airport => (
        <a href={`/airports/${airport.iata.toLowerCase()}`} key={airport.iata} className='mt-5 flex shadow p-5 border h-20 rounded-lg flex-col'>
            <div>
                {airport.name}, {airport.city}
            </div>
            <div className='text-mono'>
                {airport.country}
            </div>
        </a>
      ))}
    </div>
  </Layout>
}

export default Page
