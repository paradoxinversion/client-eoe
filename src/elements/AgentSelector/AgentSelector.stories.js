import { generatePerson } from "empire-of-evil/src/generators/game";
import AgentSelector from "./AgentSelector";

export default {
  title: 'Panels/Agent Selector',
  component: AgentSelector,
};
const agent = generatePerson({
    nationId: "1",
    homeZoneId: "z_1"
})

const agents = [];
for (let index = 0; index < 50; index++) {
    agents.push(generatePerson({
        nationId: "1",
        homeZoneId: "z_1"
    }))
    
}

export const Primary = {
    render: () => <AgentSelector agentsArray={agents} participantsArray={[]}/>,
};