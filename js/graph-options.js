// OPTIONS:
//https://developers.google.com/chart/interactive/docs/gallery/linechart?hl=ru#configuration-options

let graph_options = {
  width: 1000,
  height: 500,
  backgroundColor: 'ivory',
  title: "Стратегический финансовый план",
  curveType: 'function',

  chartArea: {
    backgroundColor: "white",
    left: 100,
    right: 100,
  }, 

  hAxis: {
    title: 'Месяцы',
    gridlines: {
      interval: 1,
      minSpacing: 40,
    }
  },

  vAxis: {
    // title: 'Amount'
  },
  
  titleTextStyle: {
    fontSize: 20,
  },

  legend: {
    position: 'none',
  },
};