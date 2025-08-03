import React from 'react'
interface Props {
    params: Promise<{
        category: string
        subcategory: string
    }>
}
const page = async ({params}: Props) => {
    const {category , subcategory} = await params
  return (
    <div>
      category: {category} <br />
      subcategory: {subcategory}
    </div>
  )
}

export default page
