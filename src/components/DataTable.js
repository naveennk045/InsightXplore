import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const DataTable = ({ data, title = "InsightXplorer" }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25, // Increased default page size
    page: 0,
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500, color: "#64748b" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1.5,
      minWidth: 250,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            color: "#1e293b",
            lineHeight: 1.6,
            "&:hover": { color: "#2563eb" }
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "sector",
      headerName: "Sector",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
            color: "#1e40af",
            fontWeight: 600,
            borderRadius: "8px",
            height: "28px",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.2)",
            },
          }}
        />
      ),
    },
    {
      field: "topic",
      headerName: "Topic",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
            color: "#065f46",
            fontWeight: 600,
            borderRadius: "8px",
            height: "28px",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 2px 8px rgba(16, 185, 129, 0.2)",
            },
          }}
        />
      ),
    },
    {
      field: "intensity",
      headerName: "Intensity",
      type: "number",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography sx={{ color: "#dc2626", fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "likelihood",
      headerName: "Likelihood",
      type: "number",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography sx={{ color: "#2563eb", fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "relevance",
      headerName: "Relevance",
      type: "number",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography sx={{ color: "#16a34a", fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "country",
      headerName: "Country",
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "#475569" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "region",
      headerName: "Region",
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "#475569" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "source",
      headerName: "Source",
      width: 180,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#64748b",
            "&:hover": { color: "#2563eb" }
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "published",
      headerName: "Published",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography variant="body2" sx={{ color: "#475569" }}>
          {params.value}
        </Typography>
      ),
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        background: "transparent",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          p: 3,
          background: "linear-gradient(90deg, #1e293b, #334155)",
          borderRadius: "16px 16px 0 0",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.2px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <DataGrid
        rows={data}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[25, 50, 100]} // Larger page size options
        disableColumnMenu={false}
        disableRowSelectionOnClick
        autoHeight
        getRowHeight={() => 'auto'}
        getEstimatedRowHeight={() => 80}
        sx={{
          border: "none",
          "& .MuiDataGrid-main": {
            overflow: "visible !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            background: "#f1f5f9",
            borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
            color: "#1e293b",
            fontSize: "13px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "#ffffff",
            "&:nth-of-type(even)": {
              backgroundColor: "#fafafa",
            },
            "&:hover": {
              backgroundColor: "#f8fafc",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              transform: "translateY(-1px)",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            background: "#f1f5f9",
            borderTop: "1px solid rgba(224, 224, 224, 0.5)",
            padding: "8px 16px",
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.05)",
          },
          "& .MuiTablePagination-root": {
            color: "#475569",
            fontWeight: 500,
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            fontSize: "14px",
            fontWeight: 500,
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;