import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { type HotList } from '@/types'
import Main from '@/components/layout/main'
import { type GetServerSideProps } from 'next'
import { getHotList, getPostList } from '@/models/content'
import Pagination from '@/components/common/pagination'

export interface PageProps {
  list: any[]
  total: number
  hotList: HotList
}

const pageSize = 7

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageNum: number = (context.params?.num as unknown as number) ?? 1

  const {
    list,
    total
  } = await getPostList(pageNum, pageSize)
  const hotList = await getHotList()

  return {
    props: {
      list,
      total,
      hotList
    }
  }
}

const Page: React.FC<PageProps> = ({
  list,
  total,
  hotList
}) => {
  const router = useRouter()
  const { num = '1' } = router.query
  const currentPage = parseInt(num as string)
  const pageNum = Math.ceil((total ?? 0) / pageSize)

  return <Main hotList={hotList}>
    <Head>
      <title>lyp123 - 做自己</title>
    </Head>
    <div className="md:py-6 py-4 md:space-y-3 flex flex-col items-start justify-start flex-1 max-w-4xl">
      {(list)?.map(item => <div className="text-left w-full" key={item.slug as string}>
        <div className="text-base font-bold dark:text-white">
          <Link href={`/post/${item?.category as string}/${item?.slug as string}`}>{item.title}</Link>
        </div>
        <div className="text-xs text-gray-500 space-x-2 mt-2 dark:text-gray-400">
          <span>{dayjs(new Date(item.created * 1000)).format('YYYY-MM-DD')}</span>
          <span className="text-gray-400">•</span>
          <span>{item.name}</span>
          <span className="text-gray-400">•</span>
          <span>{item.viewsNum}人阅读</span>
        </div>
        <div className="text-sm mt-4 text-gray-600 dark:text-gray-300 max-w-3xl">
          <Link
            href={`/post/${item?.category as string}/${item?.slug as string}`}>
            {item.description !== '' ? item.description.length < 150 ? item.description : item.description as string + '...' : '暂无描述'}
          </Link>
        </div>
        <div className="w-fit mx-auto text-sm text-gray-500 my-5 dark:text-gray-500">
          <Link href={`/post/${item?.category as string}/${item?.slug as string}`}>- 阅读全文 -</Link>
        </div>
      </div>)}
      <Pagination pageNum={pageNum} currentPage={currentPage}/>
    </div>
  </Main>
}

export default Page
