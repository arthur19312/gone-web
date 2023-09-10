import { cache } from 'react'
import { type HotList } from '@/types'
import { getHotList, getPost, getPostList, incrementViews } from '@/models/content'
import marked from '@/utils/marked'
import prisma from '@/utils/prisma'
import { cookies } from 'next/headers'

export const getPagePostList = cache(async ({
  pageNum = 1,
  search = ''
}: {
  pageNum?: number
  search?: string
}): Promise<{
  list: any[]
  total: number
  hotList: HotList
}> => {
  // const pageNum: number = ((context.params?.num ?? context.query.p) as unknown as number) ?? 1
  // const search = context.query.q as string ?? ''

  const {
    list,
    total
  } = await getPostList({
    pageNum,
    pageSize: 7,
    search
  })
  const hotList = await getHotList()

  return {
    list,
    total,
    hotList
  }
})

export const getPagePost = cache(async (slug: string): Promise<{
  title: string
  content: string
  created: number
  hotList: HotList
}> => {
  const post = await getPost(slug)
  if (post === null) {
    throw new Error('not found')
  }
  const content = marked.parse(post.text ?? '') as string
  const hotList = await getHotList()

  return {
    title: post.title as string,
    content,
    created: post.created as number,
    hotList
  }
})

export const getPageCategoryPostList = async ({
  pageNum = 1,
  category = ''
}): Promise<{
  list: any[]
  total: number
  hotList: HotList
  description: string
  baseLink: string
}> => {
  if (category === '') {
    throw new Error('not found')
  }
  const categoryData = await prisma.metas.findMany({
    where: {
      slug: category
    },
    select: {
      name: true,
      mid: true
    }
  })
  if (categoryData.length !== 1) {
    throw new Error('not found')
  }

  const {
    list,
    total
  } = await getPostList({
    pageNum,
    pageSize: 7,
    mid: categoryData[0].mid
  })
  if (list.length === 0) {
    throw new Error('not found')
  }
  const hotList = await getHotList()
  const description = `分类 ${categoryData[0].name as string} 下的文章列表`

  return {
    list,
    total,
    hotList,
    description,
    baseLink: `/category/${category}/?p=`
  }
}

export const getPagePostInfo = async ({ slug }: { slug: string }): Promise<{
  title: string
  content: string
  created: number
  name: string
  hotList: HotList
  viewsNum: number
  category?: string
}> => {
  const post = await getPost(slug)
  if (post === null) {
    throw new Error('not found')
  }
  const content = marked.parse(post.text ?? '') as string
  const hotList = await getHotList()
  const cookiesFn = cookies()
  const postView = cookiesFn.get('postView')?.value
  const views = new Set((postView != null) ? postView.split(',') : [])
  const cid = String(post.cid)
  if (!views.has(cid)) {
    await incrementViews(post.cid)
    views.add(String(post.cid))
    // cookiesFn.set('postView', Array.from(views).join(','))
    // cookies.res.setHeader('set-cookie', `postView=${Array.from(views).join(',')}`)
  }

  return {
    title: post.title as string,
    content,
    created: post.created as number,
    name: post.relationships[0].metas.name as string,
    category: post.relationships[0].metas.slug as string,
    viewsNum: post.viewsNum as number,
    hotList
  }
}
