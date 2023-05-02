import { getUpkeep } from "empire-of-evil/src/buildings";
import { getPayroll } from "empire-of-evil/src/organization";

/**
 *
 * @param {Object} props
 * @returns
 */
const MonthlyReportScreen = ({ currentGameEvent, resolveEvent }) => {
  return (
    <section>
      <header>
        <p>End of Month Report</p>
        <p>{currentGameEvent.params.totalExpenses}</p>
      </header>
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
    </section>
  );
};

export default MonthlyReportScreen;
