import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/datatable/Datatable";

const List = ({ columns }) => {
  return (
    <Box display="flex" width="100%">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flex={6}>

        {/* Datatable */}
        <Datatable columns={columns} />
      </Box>
    </Box>
  );
};

export default List;
