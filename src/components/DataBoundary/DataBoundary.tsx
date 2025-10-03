import React from "react";
import Loader from "../Loader/Loader.tsx";

type DataBoundaryProps = {
  isLoading?: boolean;
  isError?: boolean;
  noData?: boolean;
  children?: React.ReactNode;
};

const DataBoundary = ({ isLoading, isError, noData, children }: DataBoundaryProps) => {
  if (isLoading) return <Loader />;
  if (isError) return "Error";
  if (noData) return "Data Failed to Load";

  return children;
};

export default DataBoundary;
