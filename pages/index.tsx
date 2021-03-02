import { NextPage } from 'next'

import Layout from '../src/components/layout'
import useApiData from '../src/utils/hooks/use-api-data'
import Airport from '../src/utils/types/airport'

const Page: NextPage = () => {
  const airports = useApiData<Airport[]>('/api/airports', [])

  return <Layout>
    <h1 className='text-2xl'>DBL Code Challenge: Airports</h1>

    <h2 className="mt-10 text-xl">All Airports</h2>

    <div>
      {airports.map(airport => (
        <a href={`/airports/${airport.iata.toLowerCase()}`} key={airport.iata} className='mt-5 flex items-center shadow p-5 border'>
          <div>
            {airport.name}
          </div>
          <div className='ml-auto text-mono'>
            {airport.isoCountry}
          </div>
        </a>
      ))}
    </div>
  </Layout>
}

export default Page
