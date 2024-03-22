import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomTable from "../../../../custom/table/CustomTable";
import exceptionJson from "../../../../../json/exceptionTable.json";
import "./ExceptionDetails.scss";
const fetchTableData = async () => {
  const response = await axios.get("http://localhost:4000/exceptionTable");
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

export function ExceptionDetails() {
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
  const handleTransation = () =>{
    navigate(`./transaction-details`)
  }
  const transactionJsonData = exceptionJson.exceptiontable
  return (
    <div>
      {false ? (
        <h2>Loading...</h2>
      ) : ( <div className="njt-transaction-table"><div className="njt-custom-table"><CustomTable
                rows={transactionJsonData?.browsColumnRow}
                columnHeaders={transactionJsonData?.browsColumnHeaders}
                pagination={null}
                modals={null}
                displaySelectRowsCheckBox={false}
                isRowExpandable={false}
                expandedRowDetailPanelJson={null}
                handleTableTool = {true}
                handleTransation = {handleTransation}
      /> </div><div className="njt-transaction2-table"><CustomTable
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
