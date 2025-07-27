import type { Product, Strategy } from "@/payload-types";
import {
  type PricePoint,
  type ProductPerformance,
  type YearlyReturn,
} from "@/types";

export interface ProductSummaryProps {
  isin: Product["isin"];
  strategy: Pick<Strategy, "title" | "color" | "launchDate">;
  prices: PricePoint[];
  returns: YearlyReturn[];
  performance: ProductPerformance;
}

export function ReturnsSummary({ data }: { data: Array<YearlyReturn> }) {
  return (
    <>
      <label
        htmlFor="returns-modal"
        className="btn btn-outline rounded-md tracking-widest"
      >
        RETURNS
      </label>

      <input type="checkbox" id="returns-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-5xl rounded-lg p-0">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className="sticky left-0 backdrop-blur-sm" />
                  <th className="text-center">JAN</th>
                  <th className="text-center">FEB</th>
                  <th className="text-center">MAR</th>
                  <th className="text-center">APR</th>
                  <th className="text-center">MAY</th>
                  <th className="text-center">JUN</th>
                  <th className="text-center">JUL</th>
                  <th className="text-center">AUG</th>
                  <th className="text-center">SEP</th>
                  <th className="text-center">OCT</th>
                  <th className="text-center">NOV</th>
                  <th className="text-center">DEC</th>
                  <th className="text-center" />
                </tr>
              </thead>
              <tbody>
                {data.map(({ year, months, overall }) => (
                  <tr
                    key={year}
                    className="hover:bg-base-200 transition-colors"
                  >
                    <td className="sticky left-0 font-medium backdrop-blur-sm">
                      {year}
                    </td>
                    {months.map((value, index) => (
                      <td className="text-right" key={index}>
                        {value !== null ? `${value.toFixed(1)}%` : ""}
                      </td>
                    ))}
                    <td className="text-right font-bold">
                      {overall !== null ? `${overall.toFixed(1)}%` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="returns-modal">
          Close
        </label>
      </div>
    </>
  );
}
