import { ChartOptions, ChartTypeRegistry } from "chart.js";
import { createContext, type Dispatch, useContext } from "react";

const initialOptions: ChartOptions<keyof ChartTypeRegistry> = {
  responsive: true,
  maintainAspectRatio: true,
  indexAxis: "x" as const,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  },
  plugins: {
    legend: {
      /* position: "top" as const, */
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Chart",
    },
  },
};

const OptionsContext =
  createContext<ChartOptions<keyof ChartTypeRegistry>>(initialOptions);
const OptionDispachContext = createContext<Dispatch<any> | undefined>(
  undefined
);

export function useOptions() {
  return useContext(OptionsContext);
}
export function useOptionsDispach() {
  return useContext(OptionDispachContext);
}

const DataDispachContext = createContext<Dispatch<any> | undefined>(undefined);

export function useDataDispach() {
  return useContext(DataDispachContext);
}
