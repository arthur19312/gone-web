import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

const Pagination: React.FC<{ pageNum: number, currentPage: number }> = ({
  pageNum,
  currentPage
}) => {
  const pageArr = [...(new Array(pageNum)).fill(null)]
  return (
    <div
      className="text-center md:space-x-10 space-x-5 w-full py-2  border-black text-sm md:pt-10 md:pb-5 flex-row flex justify-center">
      {currentPage !== 1 &&
        <Link href={`/page/${currentPage - 1}`} className="border-inherit hover:border-b">上一页</Link>}
      <div className="md:space-x-3 space-x-1 border-inherit">
        {
          pageArr.map((_, index) =>
            (<Link key={index}
                   className={cn('px-1 hover:border-b hover:text-black dark:hover:text-white hover:transition-all border-inherit dark:border-gray-500', (index + 1) === currentPage ? 'border-b ' : 'text-gray-300')}
                   href={`/page/${index + 1}`}>{index + 1}</Link>))
        }
      </div>
      {currentPage !== pageNum &&
        <Link href={`/page/${currentPage + 1}`} className="border-inherit hover:border-b">下一页</Link>}
    </div>
  )
}

export default Pagination
