import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomTable from "../../../../custom/table/CustomTable";

const fetchTableData = async () => {
  const response = await axios.get("http://localhost:4000/table");
  return response
};

function useUserTableData() {
  const userTableData = useQuery({
    queryKey: ["userTable"],
    queryFn: fetchTableData,
    // enabled: false,
  });

  return userTableData;
}

export function DataBrowse() {
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
  

  console.log("data", userTableData?.data);

  return (
    <div>
      {isPending ? (
        <h2>Loading...</h2>
      ) : (
        <CustomTable
          rows={userTableData?.data?.rows}
          columnHeaders={userTableData?.data?.columnHeaders}
          pagination={userTableData?.data?.pagination}
          modals={userTableData?.data?.modals}
          displaySelectRowsCheckBox={false}
          isRowExpandable={userTableData?.data?.isExpandable}
          expandedRowDetailPanelJson={userTableData?.data?.expandedRowDetailPanel}
        />
      )}
    </div>
  );
}
