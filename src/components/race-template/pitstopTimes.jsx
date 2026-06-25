import React from 'react';
import arrayWithValues from '../../util/arrayWithValues';
import AvgTimingsBar from '../charts/AvgTimingsBar';
import LinkableH2 from '../headers/LinkableH2.astro'; // This is an Astro component, cannot be used in React directly!
// We need to replace LinkableH2 usage or make it a React component.
// Actually, in the Astro page we render specific sections.
// PitStopTimes in Gatsby rendered the H2.
// In my index.astro migration plan (Step 230), I render LinkableH2 in Astro, then PitStopTimes.
// But PitStopTimes has tabs.
// Let's modify PitStopTimes to NOT render LinkableH2, since I handle it in Astro parent.
// Wait, the original had LinkableH2 inside the condition.
// I'll leave the H2 out and handle it in parent or just use a simple h2 here.
// But I want consistent styling.
// I'll use a simple h2 with same classes if needed, or pass title as prop.
// For now, I will remove LinkableH2 from here and assume parent handles the section title if data exists.
// OR I check data existence in parent.
// Parent implementation:
// <PitStopTimes ... />
// The parent code in Step 230:
            /* <PitStopTimes
              conAvgPitstopsByRaceidList={constructorAvgPitstops}
              pitstopsByRaceidList={pitstops}
              seasondrivermainconsByYearList={seasonDriverMainCons}
              client:visible
            /> */
// I should make this component responsible for Tabs content mainly.
// Re-reading Step 230 plan:
/*
            <PitStopTimes
              conAvgPitstopsByRaceidList={constructorAvgPitstops}
              pitstopsByRaceidList={pitstops}
              seasondrivermainconsByYearList={seasonDriverMainCons}
              client:visible
            />
*/
// And I didn't put a LinkableH2 before it in the Astro file plan for PitStopTimes (unlike others).
// So I should probably include the header inside, OR update Astro file.
// Updating Astro file is easier.
// I will just return the TabsContainer if data fits.

import TabsContainer from '../TabsContainer';
import PitStopTable from './PitStopTable';

const PitStopTimes = ({
  conAvgPitstopsByRaceidList,
  pitstopsByRaceidList,
  seasondrivermainconsByYearList,
}) => {
  const conTimes = conAvgPitstopsByRaceidList.map(
    (item) => ({
      id: item.name,
      time: item.avgPitTimeS,
      constructor: item.name,
      tooltip: `${item.name}: ${item.avgPitTimeS} seconds`,
    })
  );
  const tabs = [
    {
      tabId: 1,
      tabName: 'Average Constructor Pitstops',
      component: (
        <AvgTimingsBar
          times={conTimes}
          desc="Average Constructor Pitstops"
          title="Average Constructor Pitstops"
        />
      ),
    },
    {
      tabId: 2,
      tabName: 'Pitstop List',
      component: (
        <PitStopTable
          pitstopsByRaceidList={pitstopsByRaceidList}
          seasondrivermainconsByYearList={seasondrivermainconsByYearList}
        />
      ),
    },
  ];

  if (!arrayWithValues(conAvgPitstopsByRaceidList)) return null;

  return (
    <div>
        {/* Header handled by parent or just simple H2 here if needed, but for now just content */}
         <div className="mb-2 mt-12 px-4">
             <h2 className="font-yrsa font-medium text-zinc-900 text-4xl">Pitstop Times</h2>
         </div>
      <TabsContainer tabs={tabs} defaultTabId={1} />
    </div>
  );
};

export default PitStopTimes;
