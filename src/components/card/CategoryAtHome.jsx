import React from 'react'
import { Link } from 'react-router-dom'

const CategoryAtHome = (item) => {
    // console.log(item)

    

  return (
    <div className='hover:scale-110'>
       <div className="bg-white p-4 rounded-lg flex flex-col items-center border border-yellow-500  max-w-md mx-auto">
            <div className="border border-gray-700  overflow-hidden mb-4">
              {/* <img src={rice} className="h-84 w-64 object-cover" /> */}
                {
                    item.item.image && item.item.image.length > 0
                    ? <img src={item.item.image[0].url} className="h-84 w-64 object-cover"/>
                    : <div className='w-64 h-84 bg-gray-200 rounded-md text-center flex items-center justify-center shadow'>
                    No Image
                </div>
                }

            </div>

          </div>
          <div className='text-center mt-2'>
            <Link to={'/menu'}>
            <button className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 transition-all ">
              {item.item.name}
            </button>
            
            </Link>

          </div>
    </div>
  )
}

export default CategoryAtHome