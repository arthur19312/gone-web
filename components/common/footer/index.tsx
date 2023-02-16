import dayjs from 'dayjs'
import React from 'react'
import duration from 'dayjs/plugin/duration'
import { AiOutlineGithub } from 'react-icons/ai'
import { getDurationTime } from '@utils'
import { Assistant } from '@components/custom/Assistant'

dayjs.extend(duration)

interface FooterProps {
  logo?: string
  visitTimes?: number
}

export const Footer: React.FC<FooterProps> = ({
  logo = '',
  visitTimes = 0
}) => {
  const establishTime = dayjs('2019-03-27 00:00:00')
  const now = dayjs()

  return (
    <footer
      className="dark:bg-dark-light dark:border-t-dark-line border-t border-solid flex flex-col md:flex-row md:justify-between md:flex">
      <span>{logo}</span>
      <div className="text-xs text-gray-400 select-none">
        <div>Copyright &copy; 2018-{now.year()} <span className="text-gray-600 dark:text-gray-300">小明难亡</span> All
          Rights Reserved
        </div>
        <div className="mt-1 flex flex-col space-y-1 md:flex-row md:space-x-1 md:items-baseline">
          <span className="flex space-x-1">
            <span>本站总访问量 {visitTimes} 次</span>
            <span>|</span>
            <span> 运行时间: {getDurationTime(establishTime)} </span>
          </span>
          <span className="hidden md:block">|</span>
          <a className="hover:text-gray-600 transition-colors dark:hover:text-gray-300" rel="noreferrer"
             href="https://beian.miit.gov.cn"
             target="_blank">黑ICP备18007630号-2</a>
        </div>
      </div>
      <div className="flex flex-row my-3 md:my-0">
        <AiOutlineGithub className="github hover:text-black dark:hover:text-white transition-all"
                         onClick={() => window.open('https://github.com/liyipeng123', '_blank')}/>
      </div>
      <Assistant/>
    </footer>
  )
}
