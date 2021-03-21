import EndTime from './EndTime'

export default {
  title: 'Components/EndTime',
  components: EndTime,
}

export const Time = () => <EndTime endHours={8} endMinutes={10} />
