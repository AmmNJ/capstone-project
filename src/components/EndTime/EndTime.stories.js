import EndTime from './EndTime'

export default {
  title: 'EndTime',
  components: EndTime,
}

export const Time = () => <EndTime endHours={8} endMinutes={10} />
