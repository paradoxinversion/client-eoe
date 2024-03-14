import { Box, Typography } from "@mui/material";
import { getUpkeep } from "empire-of-evil/src/buildings";
import { getPayroll } from "empire-of-evil/src/organization";

/**
 *
 * @param {Object} props
 * @returns
 */
const MonthlyReportScreen = ({ currentGameEvent, resolveEvent }) => {
  return (
    <Box>
      <Box>
        <Typography>End of Month Report</Typography>
        <Typography>
          Payroll: {currentGameEvent.params.expenses.payroll}
        </Typography>
        <Typography>
          Upkeep: {currentGameEvent.params.expenses.upkeep}
        </Typography>
        <Typography>
          Total Expenses:{" "}
          {currentGameEvent.params.expenses.payroll +
            currentGameEvent.params.expenses.upkeep}
        </Typography>
        <Typography>
          Income: {parseInt(currentGameEvent.params.income.buildingWealth)}
        </Typography>

        <Typography>
          Net:{" "}
          {currentGameEvent.params.income.buildingWealth -
            (currentGameEvent.params.expenses.payroll +
              currentGameEvent.params.expenses.upkeep)}
        </Typography>
      </Box>
      <table>
        <tbody>
          <tr>
            <td>Payroll</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button
        className="p-2 hover:bg-red-700 disabled:bg-stone-400"
        onClick={() => {
          resolveEvent({
            resolutionValue: 0,
          });
        }}
      >
        {" "}
        Okay
      </button>
    </Box>
  );
};

export default MonthlyReportScreen;
