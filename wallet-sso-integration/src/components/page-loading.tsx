import React from "react";

export const PageLoading = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        top: "0",
        left: "0",
        zIndex: "10",
      }}
    >
      <h4>Please wait, loading...</h4>
    </div>
  );
};
