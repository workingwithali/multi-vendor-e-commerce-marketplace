import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })
  const users = await payload.find({
    collection: 'users',
  })

  return Response.json(users)
}
