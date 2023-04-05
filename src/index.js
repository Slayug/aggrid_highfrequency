import React, { useEffect, useRef, useMemo } from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

let id = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateData(amount) {
  const arrays = [];

  for (let i = 0; i < amount; i++) {
    arrays.push({
      id: id++,
      make: "genToyota",
      model: "grnCelica" + getRandomInt(2000),
      price: getRandomInt(2000)
    });
  }

  return arrays;
}

const data = generateData(10000);

const App = () => {
  const gridRef = useRef();

  useEffect(() => {
    let previousPrice = 2000;
    setInterval(() => {
      if (gridRef) {
        gridRef.current.api.applyTransactionAsync({
          add: [
            {
              id: id++,
              make: "plus" + getRandomInt(2000),
              model: "plus" + getRandomInt(2000),
              price: previousPrice
            }
          ]
        });
        previousPrice += 10;
      }
    }, 100);
  }, []);

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agTotalRowCountComponent", align: "center" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" }
      ]
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
      sort: true,
      resizable: true
    };
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 650 }}>
      <AgGridReact
        ref={gridRef}
        rowData={data}
        defaultColDef={defaultColDef}
        getRowId={(row) => row.data.id}
        statusBar={statusBar}
        columnDefs={[
          {
            field: "price",
            sort: "desc",
            // simple number comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) =>
              valueA - valueB
          },
          {
            field: "model"
          },
          {
            field: "make"
          }
        ]}
      >
        <AgGridColumn field="make"></AgGridColumn>
        <AgGridColumn field="model"></AgGridColumn>
        <AgGridColumn field="price"></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById("root"));
