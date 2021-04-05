import * as React from "react";

const useTimesTable = (x, y) => {
  const [config, setConfig] = React.useState({ x, y });

  function generateGrid() {
    const grid = [];
    for (let i = 1; i <= config.x; i++) {
      let column = [];
      for (let j = 1; j <= config.y; j++) {
        column.push(i * j);
      }
      grid.push(column);
    }
    return grid;
  }

  const updateconfig = (update) => {
    setConfig((c) => ({ ...c, ...update }));
  };

  return {
    x: config.x,
    y: config.y,
    setX: (val) => updateconfig({ x: val }),
    setY: (val) => updateconfig({ y: val }),
    grid: generateGrid(),
  };
};

export default function TimesTable() {
  const { x, y, setX, setY, grid } = useTimesTable(10, 12);

  const renderGrid = () => {
    const rows = grid.map((row, idx) => (
      <tr key={`tr.${idx}`}>
        {row.map((td, idx) => (
          <td key={`td.${idx}`}>{td}</td>
        ))}
      </tr>
    ));

    return rows;
  };
}
