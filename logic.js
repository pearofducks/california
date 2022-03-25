import { format, startOfWeek, getWeeksInMonth, startOfMonth, addDays, isWithinInterval, isEqual } from 'date-fns'
import { nb } from 'date-fns/locale'

const weekStartsOn = 1

export const computeMonth = (month, { disabledFunction, startRange, endRange, decoratorFunction } = {}) => {
  if (!month instanceof Date) throw `First argument must be a Date`
  const weeksInMonth = getWeeksInMonth(month, { weekStartsOn })
  let dateIndex = startOfWeek(startOfMonth(month), { weekStartsOn })

  return Array.from({ length: weeksInMonth }, () => {
    return Array.from({ length: 7 }, () => {
      const date = dateIndex
      dateIndex = addDays(dateIndex, 1)
      const result = { date }
      if (disabledFunction) result.disabled = disabledFunction(date)
      if (decoratorFunction) result.decorations = decoratorFunction(date)
      if (startRange && endRange) result.selected = isWithinInterval(date, startRange, endRange)
      if (isEqual(date, startRange) || isEqual(date, endRange)) result.active = true

      return result
    })
  })
}

export const generateWeekdays = () => {
  const d = new Date()
  return Array.from({ length: 7 }).map((_, i) => format(
    new Date(d.setDate(d.getDate() - d.getDay() + weekStartsOn + i)),
    'cccccc', { locale: nb }
  ))
}

export const getMonthHeading = date => format(date, 'LLLL yyyy', { locale: nb })

export const getDateLabel = date => format(date, 'd', { locale: nb })
export const getDateAria = date => format(date, 'eeee do LLLL yyyy', { locale: nb })
// aria-label gains "Valgt startdato:" if start date (maybe should just be owned by userland what this is decorated by?)
// aria-selected - if in selection
// aria-disabled - if not pickable
// aria-current="date" - if is today?

export const getChangedForward = (curr, prev) => {
  if (curr == 11 && prev == 0) return false
  if (curr == 0 && prev == 11) return true
  return curr > prev
}
