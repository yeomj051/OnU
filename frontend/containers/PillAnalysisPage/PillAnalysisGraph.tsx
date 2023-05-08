import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

type Props = {};

function PillAnalysisGraph({}: Props) {
  const data = [
    {
      country: 'AD',
      'hot dog': 29,
      'hot dogColor': 'hsl(218, 70%, 50%)',
      burger: 100,
      burgerColor: 'hsl(172, 70%, 50%)',
      sandwich: 29,
      sandwichColor: 'hsl(320, 70%, 50%)',
      kebab: 17,
      kebabColor: 'hsl(239, 70%, 50%)',
      fries: 29,
      friesColor: 'hsl(50, 70%, 50%)',
      donut: 120,
      donutColor: 'hsl(172, 70%, 50%)',
    },
    {
      country: 'AE',
      'hot dog': 185,
      'hot dogColor': 'hsl(54, 70%, 50%)',
      burger: 89,
      burgerColor: 'hsl(214, 70%, 50%)',
      sandwich: 177,
      sandwichColor: 'hsl(336, 70%, 50%)',
      kebab: 96,
      kebabColor: 'hsl(190, 70%, 50%)',
      fries: 194,
      friesColor: 'hsl(230, 70%, 50%)',
      donut: 75,
      donutColor: 'hsl(200, 70%, 50%)',
    },
    {
      country: 'AF',
      'hot dog': 52,
      'hot dogColor': 'hsl(76, 70%, 50%)',
      burger: 97,
      burgerColor: 'hsl(274, 70%, 50%)',
      sandwich: 118,
      sandwichColor: 'hsl(318, 70%, 50%)',
      kebab: 41,
      kebabColor: 'hsl(337, 70%, 50%)',
      fries: 65,
      friesColor: 'hsl(325, 70%, 50%)',
      donut: 20,
      donutColor: 'hsl(302, 70%, 50%)',
    },
    {
      country: 'AG',
      'hot dog': 137,
      'hot dogColor': 'hsl(191, 70%, 50%)',
      burger: 67,
      burgerColor: 'hsl(128, 70%, 50%)',
      sandwich: 134,
      sandwichColor: 'hsl(344, 70%, 50%)',
      kebab: 86,
      kebabColor: 'hsl(182, 70%, 50%)',
      fries: 33,
      friesColor: 'hsl(229, 70%, 50%)',
      donut: 178,
      donutColor: 'hsl(109, 70%, 50%)',
    },
    {
      country: 'AI',
      'hot dog': 87,
      'hot dogColor': 'hsl(157, 70%, 50%)',
      burger: 167,
      burgerColor: 'hsl(21, 70%, 50%)',
      sandwich: 71,
      sandwichColor: 'hsl(24, 70%, 50%)',
      kebab: 127,
      kebabColor: 'hsl(330, 70%, 50%)',
      fries: 10,
      friesColor: 'hsl(256, 70%, 50%)',
      donut: 44,
      donutColor: 'hsl(140, 70%, 50%)',
    },
    {
      country: 'AL',
      'hot dog': 46,
      'hot dogColor': 'hsl(302, 70%, 50%)',
      burger: 141,
      burgerColor: 'hsl(252, 70%, 50%)',
      sandwich: 119,
      sandwichColor: 'hsl(122, 70%, 50%)',
      kebab: 183,
      kebabColor: 'hsl(29, 70%, 50%)',
      fries: 20,
      friesColor: 'hsl(251, 70%, 50%)',
      donut: 127,
      donutColor: 'hsl(272, 70%, 50%)',
    },
    {
      country: 'AM',
      'hot dog': 175,
      'hot dogColor': 'hsl(54, 70%, 50%)',
      burger: 98,
      burgerColor: 'hsl(1, 70%, 50%)',
      sandwich: 133,
      sandwichColor: 'hsl(8, 70%, 50%)',
      kebab: 37,
      kebabColor: 'hsl(27, 70%, 50%)',
      fries: 83,
      friesColor: 'hsl(78, 70%, 50%)',
      donut: 177,
      donutColor: 'hsl(122, 70%, 50%)',
    },
  ];
  return (
    <div>
      <ResponsiveBar
        data={data}
        keys={[
          'hot dog',
          'burger',
          'sandwich',
          'kebab',
          'fries',
          'donut',
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          tickSize: 0,
          tickPadding: 8,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id +
          ': ' +
          e.formattedValue +
          ' in country: ' +
          e.indexValue
        }
      />
    </div>
  );
}

export default PillAnalysisGraph;
