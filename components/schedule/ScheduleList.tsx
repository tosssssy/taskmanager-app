/* eslint-disable react-hooks/exhaustive-deps */
import { Box, BoxProps, Flex, Text, Wrap } from '@chakra-ui/react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import React, { FC, useCallback } from 'react'
import { useGetApi } from '../../hooks/useApi'
import { useSchedule } from '../../hooks/useSchedule'
import { SubjectType, UpdateSubjectType } from '../../types/subject'
import { putApi } from '../../utils/api'
import { Pagination } from './Pagination'
import { Subject } from './Subject'

// DBから取得できる日付は'2022-01-09T00:00:00.000Z'というフォーマット
// タイムゾーン周りでずれが生じる可能性があるのでdayjs(2022-01-09)として扱っている
dayjs.extend(isBetween)
const Day = ['日', '月', '火', '水', '木', '金', '土']

type Props = {
  subjects: SubjectType[]
} & BoxProps

export const ScheduleList: FC<Props> = ({ subjects: initSubjects, ...rest }) => {
  const { dateList, setCurrentWeekNum } = useSchedule()
  const { data: subjects, mutate } = useGetApi<SubjectType[]>('/api/subjects', initSubjects)

  const updateSubject = useCallback(async (newSubject: UpdateSubjectType) => {
    try {
      await putApi('/api/subjects', newSubject)

      mutate((postData) =>
        postData?.map((data) => {
          if (data.id === newSubject.id) {
            data = { ...data, ...newSubject }
          }
          return data
        })
      )
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <Box {...rest}>
      <Box textAlign='center' fontSize='25px'>
        {dayjs(dateList[0]).format('YYYY')}
      </Box>

      <Flex direction={'column'} gap={5} p={25} mx={'auto'} mb={'150px'} maxW={'840px'}>
        {dateList.map((oneDay) => {
          const oneDayjs = dayjs(oneDay)
          const oneDaySubjects = subjects?.filter(
            (v) => oneDayjs.format('YYYY-MM-DD') === String(v.date).slice(0, 10)
          )
          return (
            <Box key={oneDay} p={5} bg={'white'} borderRadius={'10px'} shadow={'md'}>
              <Flex fontSize={18}>
                {oneDayjs.format('M-D')}
                {'('}
                {Day[oneDayjs.day()] === '土' && (
                  <Text color='blue.400'>{Day[oneDayjs.day()]}</Text>
                )}
                {Day[oneDayjs.day()] === '日' && <Text color='red.400'>{Day[oneDayjs.day()]}</Text>}
                {Day[oneDayjs.day()] !== '土' && Day[oneDayjs.day()] !== '日' && (
                  <Text>{Day[oneDayjs.day()]}</Text>
                )}
                {')'}
              </Flex>

              <Wrap>
                {oneDaySubjects?.map((oneDaySubject) => (
                  <Subject key={oneDaySubject.id} subject={oneDaySubject} onSave={updateSubject} />
                ))}
              </Wrap>
            </Box>
          )
        })}
      </Flex>

      <Pagination setCurrentWeekNum={setCurrentWeekNum} />
    </Box>
  )
}

// Component definition is missing display name のESLintエラー回避
ScheduleList.displayName = 'ScheduleList'
