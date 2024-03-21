import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomTable from "../../../../custom/table/CustomTable";
import {useNavigate } from 'react-router-dom';
import SearchContainer from "../../../../custom/searchContainer/SearchContainer";

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
  const navigate = useNavigate();
  useEffect(() => {
    refetch();
  }, []);
  
const handleEdit = () =>{
  navigate(`./transaction-details`)
}
  //console.log("data", userTableData?.data);

  return (
    <div className="main-table-div">
      {isPending ? (
        <h2>Loading...</h2>
      ) : (
        <div className="main-table">
        <SearchContainer/>
        <CustomTable
          rows={userTableData?.data?.rows}
          toolBar={userTableData?.data?.toolBar}
          columnHeaders={userTableData?.data?.columnHeaders}
          pagination={userTableData?.data?.pagination}
          modals={userTableData?.data?.modals}
          displaySelectRowsCheckBox={false}
          isRowExpandable={userTableData?.data?.isExpandable}
          expandedRowDetailPanelJson={userTableData?.data?.expandedRowDetailPanel}
          handleEdit = {handleEdit}
        />
        
        </div>
      )}
    </div>
  );
}
