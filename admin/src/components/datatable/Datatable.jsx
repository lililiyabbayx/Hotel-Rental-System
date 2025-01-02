import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="primary" startIcon={<Visibility />}>
              View
            </Button>
          </Link>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, p: 2 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {path.charAt(0).toUpperCase() + path.slice(1)}
        </Typography>
        <Link to={`/${path}/new`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Link>
      </Box>

      {/* DataGrid */}
      <DataGrid
        rows={list || []}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        loading={loading}
      />
    </Box>
  );
};

export default Datatable;
