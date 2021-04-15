import KpiBoard from './KpiBoard'

export default {
  title: 'Components/KpiBoard',
  components: KpiBoard,
}

export const Default = () => (
  <KpiBoard
    kpiData={{
      lastTenDaysAvg: 1.5,
      lastTenDaysTotal: 15,
      totalAvg: 2,
      total: 300,
    }}
  />
)
