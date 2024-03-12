import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateUserTableData = async (editedRowData) => {
    const id = editedRowData?.id;
    try {
      return await axios.put(`http://localhost:4000/table/rows/${id}`, editedRowData, {
        headers: {'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  

export function useUpdateUserTableData() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUserTable"],
    mutationFn: updateUserTableData,
    onMutate: async (editedData) => {
      await queryClient.cancelQueries({
        queryKey: ["userTable"],
      });
      const previousUserTableData = queryClient.getQueryData(["userTable"]); // Snapshot the previous data
      queryClient.setQueryData(["userTable"], (oldData) => {
        const updatedRowIndex = oldData?.data?.rows.findIndex((row) => row.id === editedData.id);
        if (updatedRowIndex !== -1) {
          oldData.data[updatedRowIndex] = editedData;
        } else {
          oldData.data.push(editedData);
        }
        return oldData;
      });
    //   return { previousUserTableData };
    },
    onError: (_err, _newUserTableData, context) => {
      queryClient.setQueryData(["userTable"], context.previousUserTableData);
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["userTable"] });
    },
  });
}
