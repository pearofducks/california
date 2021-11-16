import { startOfWeek, getWeeksInMonth, startOfMonth, addDays, isWithinInterval } from 'date-fns'

export const computeMonth = (month, { disabledFunction, startRange, endRange, decoratorFunction } = {}) => {
  if (!month instanceof Date) throw `First argument must be a Date`
  const weeksInMonth = getWeeksInMonth(month, { weekStartsOn: 1 })
  let dateIndex = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })

  return Array.from({ length: weeksInMonth }, () => {
    return Array.from({ length: 7 }, () => {
      const date = dateIndex
      dateIndex = addDays(dateIndex, 1)
      const result = { date }
      if (disabledFunction) result.disabled = disabledFunction(date)
      if (decoratorFunction) result.decorations = decoratorFunction(date)
      if (startRange && endRange) result.active = isWithinInterval(date, startRange, endRange)

      return result
    })
  })
}
