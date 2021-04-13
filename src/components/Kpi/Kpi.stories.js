import Kpi from './Kpi'

export default {
  title: 'Components/Kpi',
  components: Kpi,
}

export const Default = () => <Kpi value={8 + 'h'} info={'Average per Day'} />
