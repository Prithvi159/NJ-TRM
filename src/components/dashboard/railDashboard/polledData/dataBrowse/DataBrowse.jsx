import React from "react";
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
  

  console.log("data", userTableData?.data);

  return (
    <div>
      {isFetching ? (
        <h2>Loading...</h2>
      ) : (
        <CustomTable
          rows={userTableData?.data?.rows}
          columnHeaders={userTableData?.data?.columnHeaders}
          pagination={userTableData?.data?.pagination}
          displaySelectRowsCheckBox={false}
          isRowExpandable={true}
        />
      )}
    </div>
  );
}
