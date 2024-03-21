import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomTable from "../../../../custom/table/CustomTable";
import transactionJson from "../../../../../json/transactionTable.json";
import "./TransactionDetails.scss";
const fetchTableData = async () => {
  const response = await axios.get("http://localhost:4000/transactionTable");
  return response
};

function useUserTableData() {
  const userTableData = useQuery({
    queryKey: ["transactionTable"],
    queryFn: fetchTableData,
    // enabled: false,
  });

  return userTableData;
}

export function TransactionDetails() {
  const {
    isPending,
    isFetching,
    isError,
    data: userTableData,
    error,
    refetch,
  } = useUserTableData();

  useEffect(() => {
    refetch();
  }, []);
  

  console.log("data000", transactionJson.transactiontable);
  console.log("da45ta000", userTableData);
  const transactionJsonData = transactionJson.transactiontable
  return (
    <div>
      {false ? (
        <h2>Loading...</h2>
      ) : ( <div><div className="njt-custom-table"><CustomTable
                rows={transactionJsonData?.browsColumnRow}
                columnHeaders={transactionJsonData?.browsColumnHeaders}
                pagination={null}
                modals={null}
                displaySelectRowsCheckBox={false}
                isRowExpandable={false}
                expandedRowDetailPanelJson={null}
                handleTableTool = {true}
      /> </div><div><CustomTable
          rows={transactionJsonData?.rows}
          columnHeaders={transactionJsonData?.columnHeaders}
          pagination={transactionJsonData?.pagination}
          modals={transactionJsonData?.modals}
          displaySelectRowsCheckBox={false}
          isRowExpandable={transactionJsonData?.isExpandable}
          expandedRowDetailPanelJson={transactionJsonData?.expandedRowDetailPanel}
          handleTableTool = {true}
        /></div></div>

      )}
    </div>
  );
}
