import DataGrid from "react-data-grid";
import { dataGridButton } from "../datagridRenderers/dataGridButton";
import { useAppSelector } from "../../app/hooks";
import { GameManager } from "empire-of-evil";

const scienceProgressDataGridColumns = [
  { key: "name", name: "Name" },
  { key: "progress", name: "Progress" },
  { key: "requiredScience", name: "Goal" },
  { key: "select", name: "Select", renderCell: dataGridButton },
];

export interface ScienceProgressDataGridProps {
  title: string;
}
const ScienceProgressDataGrid = ({ title }: ScienceProgressDataGridProps) => {
  const projects = useAppSelector((state) => state.science.activeProjects);
  return (
    <DataGrid
      columns={scienceProgressDataGridColumns}
      rows={projects.map((projectProgress) => {
        const project =
          GameManager.getInstance().scienceManager.PROJECT_DEFINITIONS[
            projectProgress.indexName
          ];
        return {
          name: projectProgress.indexName,
          progress: projectProgress.accumulatedScience,
          requiredScience: project.science,
          select: () => {},
        };
      })}
    />
  );
};

export default ScienceProgressDataGrid;
