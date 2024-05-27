import React from "react";

export default function SortOptions({
  searchQuery,
  handleInputChange,
  handleClear,
  sortByButton,
  sortType,
  handleSort,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{
            flex: "1", // Allow the input to grow and take available space
            padding: "8px", // Padding around the input text
            fontSize: "16px", // Font size of the input text
            maxWidth: "400px", // Set a maximum width for the input
          }}
        />
        <button
          onClick={handleClear}
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ padding: "8px", fontSize: "16px" }}
        >
          Clear
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label
          htmlFor="sortSelect"
          style={{ marginRight: "5px", fontSize: "16px" }}
        >
          Sort By:
        </label>
        <select
          disabled={sortByButton}
          id="sortSelect"
          value={sortType}
          onChange={(e) => handleSort(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", maxWidth: "100%" }}
        >
          <option value="">Select</option>
          <option value="name">Name (A-Z)</option>
          <option value="dateAdded">Date Added (Recent First)</option>
        </select>
      </div>
    </div>
  );
}
