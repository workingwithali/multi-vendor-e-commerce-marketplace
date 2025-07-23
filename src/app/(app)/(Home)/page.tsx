import configPromise from '@payload-config'
import { getPayload } from 'payload'


const Home = async() => {
  const payload = await getPayload({
      config: configPromise,
    })
  const categories = await payload.find({
    collection: 'categories',
  })
  return (
    <div>
      {JSON.stringify(categories, null, 2)}
      
    </div>
  )
}

export default Home
