import Chart from './Chart'

export default {
  title: 'Components/Chart',
  components: Chart,
}

export const Default = () => (
  <Chart
    chartData={[
      { date: '2021/04/04', duration: 1000, weekday: 'Su', height: 100 },
      { date: '2021/04/05', duration: 770, weekday: 'Mo', height: 77 },
      { date: '2021/04/06', duration: 160, weekday: 'Tu', height: 16 },
      { date: '2021/04/07', duration: 200, weekday: 'We', height: 20 },
      { date: '2021/04/08', duration: 400, weekday: 'Th', height: 40 },
      { date: '2021/04/09', duration: 900, weekday: 'Fr', height: 90 },
      { date: '2021/04/10', duration: 840, weekday: 'Sa', height: 84 },
      { date: '2021/04/11', duration: 0, weekday: 'Su', height: 0 },
      { date: '2021/04/12', duration: 670, weekday: 'Mo', height: 67 },
      { date: '2021/04/13', duration: 250, weekday: 'Tu', height: 25 },
    ]}
    todayValue={'05h 34min'}
    timeFrame={'04/04 - 13/04'}
  />
)
