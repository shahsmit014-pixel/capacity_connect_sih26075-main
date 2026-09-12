import React, { useEffect, useMemo, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiDownload,
  FiMinus,
  FiRefreshCw,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";

import "./Table.css";

/* =========================================================
   DUMMY DATA
========================================================= */

export const dummyLearners = [
  {
    id: 1,
    name: "Aarav Shah",
    email: "aarav@example.com",
    role: "Learner",
    department: "Computer Science",
    skill: "React",
    level: "Advanced",
    progress: 86,
    status: "Active",
    score: 92,
    courses: 7,
  },
  {
    id: 2,
    name: "Diya Patel",
    email: "diya@example.com",
    role: "Learner",
    department: "Information Technology",
    skill: "Python",
    level: "Intermediate",
    progress: 68,
    status: "Active",
    score: 81,
    courses: 5,
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan@example.com",
    role: "Learner",
    department: "Computer Science",
    skill: "Java",
    level: "Beginner",
    progress: 42,
    status: "At Risk",
    score: 59,
    courses: 3,
  },
  {
    id: 4,
    name: "Ishita Desai",
    email: "ishita@example.com",
    role: "Learner",
    department: "Data Science",
    skill: "Machine Learning",
    level: "Advanced",
    progress: 94,
    status: "Active",
    score: 96,
    courses: 9,
  },
  {
    id: 5,
    name: "Kabir Joshi",
    email: "kabir@example.com",
    role: "Learner",
    department: "Electronics",
    skill: "Data Analysis",
    level: "Intermediate",
    progress: 73,
    status: "Active",
    score: 84,
    courses: 6,
  },
  {
    id: 6,
    name: "Meera Shah",
    email: "meera@example.com",
    role: "Learner",
    department: "Computer Science",
    skill: "Node.js",
    level: "Intermediate",
    progress: 61,
    status: "Inactive",
    score: 72,
    courses: 4,
  },
  {
    id: 7,
    name: "Vivaan Patel",
    email: "vivaan@example.com",
    role: "Learner",
    department: "Information Technology",
    skill: "PostgreSQL",
    level: "Advanced",
    progress: 89,
    status: "Active",
    score: 91,
    courses: 8,
  },
  {
    id: 8,
    name: "Anaya Mehta",
    email: "anaya@example.com",
    role: "Learner",
    department: "Computer Science",
    skill: "JavaScript",
    level: "Beginner",
    progress: 37,
    status: "At Risk",
    score: 54,
    courses: 2,
  },
  {
    id: 9,
    name: "Arjun Desai",
    email: "arjun@example.com",
    role: "Learner",
    department: "Data Science",
    skill: "SQL",
    level: "Advanced",
    progress: 91,
    status: "Active",
    score: 95,
    courses: 10,
  },
  {
    id: 10,
    name: "Sara Joshi",
    email: "sara@example.com",
    role: "Learner",
    department: "Computer Science",
    skill: "TypeScript",
    level: "Intermediate",
    progress: 76,
    status: "Active",
    score: 87,
    courses: 6,
  },
];

/* =========================================================
   DEFAULT CELL
========================================================= */

const DefaultCell = ({ value, row, column }) => {
  if (column.type === "avatar") {
    return (
      <div className="table-person">
        <div className="table-avatar">
          {String(value ?? "?")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="table-person-info">
          <strong>{value ?? "—"}</strong>

          {row.email && <span>{row.email}</span>}
        </div>
      </div>
    );
  }

  if (column.type === "status") {
    const statusClass = String(value ?? "")
      .toLowerCase()
      .replace(/\s+/g, "-");

    return (
      <span className={`table-status table-status-${statusClass}`}>
        <span className="table-status-dot" />
        {value ?? "—"}
      </span>
    );
  }

  if (column.type === "progress") {
    const progress = Math.min(100, Math.max(0, Number(value) || 0));

    return (
      <div className="table-progress-cell">
        <div className="table-progress-track">
          <div
            className="table-progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <span>{progress}%</span>
      </div>
    );
  }

  if (column.type === "score") {
    return (
      <div className="table-score">
        <strong>{value ?? 0}</strong>
        <span>/100</span>
      </div>
    );
  }

  if (column.type === "level") {
    const levelClass = String(value ?? "")
      .toLowerCase()
      .replace(/\s+/g, "-");

    return (
      <span className={`table-level table-level-${levelClass}`}>
        {value ?? "—"}
      </span>
    );
  }

  if (column.type === "number") {
    return <span className="table-number">{value ?? 0}</span>;
  }

  return <span className="table-text">{value ?? "—"}</span>;
};

/* =========================================================
   TABLE
========================================================= */

const Table = ({
  columns = [],
  data = [],

  variant = "default",
  appearance = "light",
  size = "comfortable",

  striped = false,
  bordered = false,
  hoverable = true,

  stickyHeader = false,
  stickyFirstColumn = false,

  selectable = false,

  selectedRows,
  onSelectionChange,

  searchable = false,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,

  sortable = false,
  sortKey,
  sortDirection,
  onSort,

  pagination = false,
  pageSize = 8,
  currentPage,
  onPageChange,

  pageSizeOptions = [5, 8, 10, 20, 50],
  showPageSize = true,

  loading = false,
  loadingRows = 5,

  emptyTitle = "No data found",
  emptyDescription = "There are no records to display.",

  error = false,
  errorTitle = "Something went wrong",
  errorDescription = "We couldn't load this data.",

  onRetry,

  toolbar = true,
  toolbarTitle,
  toolbarDescription,

  showSearch = true,
  showRefresh = false,
  onRefresh,

  showDownload = false,
  onDownload,

  showColumnToggle = false,

  rowActions,

  onRowClick,

  renderCell,

  footer,

  className = "",

  maxHeight,

  responsive = true,

  getRowId,

  ...props
}) => {
  /* =====================================================
     INTERNAL STATE
  ===================================================== */

  const [internalSearch, setInternalSearch] = useState("");

  const [internalPage, setInternalPage] = useState(1);

  const [internalPageSize, setInternalPageSize] = useState(pageSize);

  const [internalSelected, setInternalSelected] = useState([]);

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((column) => column.key),
  );

  const [columnMenuOpen, setColumnMenuOpen] = useState(false);

  /* =====================================================
     CONTROLLED / UNCONTROLLED VALUES
  ===================================================== */

  const isSearchControlled = searchValue !== undefined;

  const activeSearch = isSearchControlled ? searchValue : internalSearch;

  const isPageControlled = currentPage !== undefined;

  const activePage = isPageControlled ? currentPage : internalPage;

  const isSelectionControlled = selectedRows !== undefined;

  const activeSelected = isSelectionControlled
    ? selectedRows
    : internalSelected;

  /* =====================================================
     ROW ID
  ===================================================== */

  const resolveRowId = (row, index) => {
    if (getRowId) {
      return getRowId(row, index);
    }

    return row.id ?? row._id ?? index;
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const updateSearch = (value) => {
    if (onSearchChange) {
      onSearchChange(value);
    }

    if (!isSearchControlled) {
      setInternalSearch(value);
    }

    if (!isPageControlled) {
      setInternalPage(1);
    }

    if (onPageChange) {
      onPageChange(1);
    }
  };

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredData = useMemo(() => {
    const query = String(activeSearch ?? "")
      .trim()
      .toLowerCase();

    if (!query) {
      return data;
    }

    return data.filter((row) =>
      columns.some((column) => {
        const value = row[column.key];

        return String(value ?? "")
          .toLowerCase()
          .includes(query);
      }),
    );
  }, [data, columns, activeSearch]);

  /* =====================================================
     SORT
  ===================================================== */

  const sortedData = useMemo(() => {
    if (!sortable || !sortKey || !sortDirection) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const first = a[sortKey];
      const second = b[sortKey];

      if (typeof first === "number" && typeof second === "number") {
        return sortDirection === "asc" ? first - second : second - first;
      }

      return (
        String(first ?? "").localeCompare(String(second ?? ""), undefined, {
          numeric: true,
          sensitivity: "base",
        }) * (sortDirection === "asc" ? 1 : -1)
      );
    });
  }, [filteredData, sortable, sortKey, sortDirection]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = pagination
    ? Math.max(1, Math.ceil(sortedData.length / internalPageSize))
    : 1;

  const safePage = Math.min(Math.max(Number(activePage) || 1, 1), totalPages);

  const startIndex = (safePage - 1) * internalPageSize;

  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + internalPageSize)
    : sortedData;

  const changePage = (page) => {
    const nextPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);

    if (!isPageControlled) {
      setInternalPage(nextPage);
    }

    if (onPageChange) {
      onPageChange(nextPage);
    }
  };

  /* =====================================================
     PAGE SIZE
  ===================================================== */

  const changePageSize = (value) => {
    const nextSize = Number(value);

    setInternalPageSize(nextSize);

    changePage(1);
  };

  /* =====================================================
     SELECTION
  ===================================================== */

  const setSelected = (nextSelected) => {
    if (!isSelectionControlled) {
      setInternalSelected(nextSelected);
    }

    if (onSelectionChange) {
      onSelectionChange(nextSelected);
    }
  };

  const visibleRowIds = paginatedData.map((row) =>
    resolveRowId(row, data.indexOf(row)),
  );

  const allVisibleSelected =
    visibleRowIds.length > 0 &&
    visibleRowIds.every((id) => activeSelected.includes(id));

  const someVisibleSelected = visibleRowIds.some((id) =>
    activeSelected.includes(id),
  );

  const toggleAll = () => {
    if (allVisibleSelected) {
      setSelected(activeSelected.filter((id) => !visibleRowIds.includes(id)));

      return;
    }

    setSelected([...new Set([...activeSelected, ...visibleRowIds])]);
  };

  const toggleRow = (row, index) => {
    const id = resolveRowId(row, index);

    if (activeSelected.includes(id)) {
      setSelected(activeSelected.filter((selectedId) => selectedId !== id));
    } else {
      setSelected([...activeSelected, id]);
    }
  };

  /* =====================================================
     VISIBLE COLUMNS
  ===================================================== */

  const activeColumns = columns.filter((column) =>
    visibleColumns.includes(column.key),
  );

  /* =====================================================
     SORT
  ===================================================== */

  const handleSort = (column) => {
    if (!sortable || column.sortable === false) {
      return;
    }

    let nextDirection = "asc";

    if (sortKey === column.key && sortDirection === "asc") {
      nextDirection = "desc";
    }

    if (onSort) {
      onSort(column.key, nextDirection);
    }
  };

  /* =====================================================
     PAGINATION EFFECT
  ===================================================== */

  useEffect(() => {
    if (pagination && activePage > totalPages) {
      changePage(totalPages);
    }
  }, [pagination, activePage, totalPages]);

  /* =====================================================
     COLUMN VISIBILITY
  ===================================================== */

  useEffect(() => {
    setVisibleColumns((previous) => {
      const validKeys = columns.map((column) => column.key);

      return previous.filter((key) => validKeys.includes(key)).length
        ? previous.filter((key) => validKeys.includes(key))
        : validKeys;
    });
  }, [columns]);

  /* =====================================================
     CSS
  ===================================================== */

  const tableClasses = [
    "cc-table-container",

    `cc-table-${variant}`,

    `cc-table-${appearance}`,

    `cc-table-size-${size}`,

    striped ? "cc-table-striped" : "",

    bordered ? "cc-table-bordered" : "",

    hoverable ? "cc-table-hoverable" : "",

    stickyHeader ? "cc-table-sticky-header" : "",

    stickyFirstColumn ? "cc-table-sticky-first" : "",

    responsive ? "cc-table-responsive" : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className={tableClasses} {...props}>
      {/* =================================================
          TOOLBAR
      ================================================= */}

      {toolbar && (
        <div className="cc-table-toolbar">
          <div className="cc-table-heading">
            {toolbarTitle && <h3>{toolbarTitle}</h3>}

            {toolbarDescription && <p>{toolbarDescription}</p>}
          </div>

          <div className="cc-table-toolbar-actions">
            {showSearch && searchable && (
              <div className="cc-table-search">
                <FiSearch />

                <input
                  type="text"
                  value={activeSearch ?? ""}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label="Search table"
                />

                {activeSearch && (
                  <button
                    type="button"
                    onClick={() => updateSearch("")}
                    aria-label="Clear search"
                  >
                    <FiX />
                  </button>
                )}
              </div>
            )}

            {showColumnToggle && (
              <div className="cc-table-column-control">
                <button
                  type="button"
                  className="cc-table-tool-button"
                  onClick={() => setColumnMenuOpen((previous) => !previous)}
                >
                  <FiSliders />
                  Columns
                </button>

                {columnMenuOpen && (
                  <div className="cc-table-column-menu">
                    <div className="cc-table-column-menu-title">
                      Visible columns
                    </div>

                    {columns.map((column) => (
                      <label
                        key={column.key}
                        className="cc-table-column-option"
                      >
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(column.key)}
                          onChange={() => {
                            setVisibleColumns((previous) => {
                              if (previous.includes(column.key)) {
                                if (previous.length === 1) {
                                  return previous;
                                }

                                return previous.filter(
                                  (key) => key !== column.key,
                                );
                              }

                              return [...previous, column.key];
                            });
                          }}
                        />

                        <span>{column.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {showRefresh && (
              <button
                type="button"
                className="cc-table-tool-button cc-table-icon-tool"
                onClick={onRefresh}
                aria-label="Refresh table"
              >
                <FiRefreshCw />
              </button>
            )}

            {showDownload && (
              <button
                type="button"
                className="cc-table-tool-button"
                onClick={onDownload}
              >
                <FiDownload />
                Export
              </button>
            )}
          </div>
        </div>
      )}

      {/* =================================================
          SELECTION BAR
      ================================================= */}

      {selectable && activeSelected.length > 0 && (
        <div className="cc-table-selection-bar">
          <span>
            <strong>{activeSelected.length}</strong> selected
          </span>

          <button type="button" onClick={() => setSelected([])}>
            Clear selection
          </button>
        </div>
      )}

      {/* =================================================
          LOADING
      ================================================= */}

      {loading ? (
        <div className="cc-table-loading">
          {Array.from({
            length: loadingRows,
          }).map((_, rowIndex) => (
            <div className="cc-table-skeleton-row" key={rowIndex}>
              {Array.from({
                length:
                  activeColumns.length +
                  (selectable ? 1 : 0) +
                  (rowActions ? 1 : 0),
              }).map((_, cellIndex) => (
                <span key={cellIndex} className="cc-table-skeleton" />
              ))}
            </div>
          ))}
        </div>
      ) : error ? (
        /* =================================================
           ERROR
        ================================================= */

        <div className="cc-table-state">
          <div className="cc-table-state-icon cc-table-state-error">!</div>

          <h3>{errorTitle}</h3>

          <p>{errorDescription}</p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="cc-table-state-button"
            >
              <FiRefreshCw />
              Try Again
            </button>
          )}
        </div>
      ) : paginatedData.length === 0 ? (
        /* =================================================
           EMPTY
        ================================================= */

        <div className="cc-table-state">
          <div className="cc-table-state-icon">
            <FiSearch />
          </div>

          <h3>{emptyTitle}</h3>

          <p>{emptyDescription}</p>
        </div>
      ) : (
        /* =================================================
           TABLE
        ================================================= */

        <div
          className="cc-table-scroll"
          style={
            maxHeight
              ? {
                  maxHeight,
                }
              : undefined
          }
        >
          <table>
            <thead>
              <tr>
                {selectable && (
                  <th className="cc-table-checkbox-column">
                    <label className="cc-checkbox">
                      <input
                        type="checkbox"
                        checked={allVisibleSelected}
                        ref={(element) => {
                          if (element) {
                            element.indeterminate =
                              someVisibleSelected && !allVisibleSelected;
                          }
                        }}
                        onChange={toggleAll}
                      />

                      <span>
                        {someVisibleSelected && !allVisibleSelected ? (
                          <FiMinus />
                        ) : (
                          <FiCheck />
                        )}
                      </span>
                    </label>
                  </th>
                )}

                {activeColumns.map((column) => {
                  const isSorted = sortKey === column.key;

                  return (
                    <th
                      key={column.key}
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        textAlign: column.align || "left",
                      }}
                      className={[
                        column.headerClassName || "",
                        isSorted ? "cc-table-sorted-column" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {sortable && column.sortable !== false ? (
                        <button
                          type="button"
                          className="cc-table-sort-button"
                          onClick={() => handleSort(column)}
                        >
                          <span>{column.label}</span>

                          {isSorted ? (
                            sortDirection === "asc" ? (
                              <FiArrowUp />
                            ) : (
                              <FiArrowDown />
                            )
                          ) : (
                            <FiChevronDown className="cc-table-sort-idle" />
                          )}
                        </button>
                      ) : (
                        column.label
                      )}
                    </th>
                  );
                })}

                {rowActions && (
                  <th className="cc-table-actions-column">Actions</th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((row, rowIndex) => {
                const originalIndex = data.indexOf(row);

                const rowId = resolveRowId(row, originalIndex);

                const isSelected = activeSelected.includes(rowId);

                return (
                  <tr
                    key={rowId}
                    className={isSelected ? "cc-table-row-selected" : ""}
                    onClick={(event) => {
                      if (onRowClick) {
                        onRowClick(row, event);
                      }
                    }}
                    style={{
                      cursor: onRowClick ? "pointer" : undefined,
                    }}
                  >
                    {selectable && (
                      <td className="cc-table-checkbox-column">
                        <label
                          className="cc-checkbox"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleRow(row, originalIndex)}
                          />

                          <span>
                            <FiCheck />
                          </span>
                        </label>
                      </td>
                    )}

                    {activeColumns.map((column) => {
                      const value = row[column.key];

                      return (
                        <td
                          key={column.key}
                          style={{
                            textAlign: column.align || "left",
                          }}
                          className={column.cellClassName || ""}
                        >
                          {renderCell ? (
                            renderCell(value, row, column)
                          ) : column.render ? (
                            column.render(value, row)
                          ) : (
                            <DefaultCell
                              value={value}
                              row={row}
                              column={column}
                            />
                          )}
                        </td>
                      );
                    })}

                    {rowActions && (
                      <td
                        className="cc-table-actions-column"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {rowActions(row)}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* =================================================
          PAGINATION
      ================================================= */}

      {pagination && !loading && !error && sortedData.length > 0 && (
        <div className="cc-table-pagination">
          <div className="cc-table-pagination-info">
            {showPageSize && (
              <>
                <span>Rows</span>

                <select
                  value={internalPageSize}
                  onChange={(event) => changePageSize(event.target.value)}
                >
                  {pageSizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </>
            )}

            <span>
              Showing <strong>{startIndex + 1}</strong> –{" "}
              <strong>
                {Math.min(startIndex + paginatedData.length, sortedData.length)}
              </strong>{" "}
              of <strong>{sortedData.length}</strong>
            </span>
          </div>

          <div className="cc-table-pagination-controls">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => changePage(1)}
              aria-label="First page"
            >
              <FiChevronsLeft />
            </button>

            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => changePage(safePage - 1)}
              aria-label="Previous page"
            >
              <FiChevronLeft />
            </button>

            {Array.from(
              {
                length: Math.min(totalPages, 5),
              },
              (_, index) => {
                let page;

                if (totalPages <= 5) {
                  page = index + 1;
                } else if (safePage <= 3) {
                  page = index + 1;
                } else if (safePage >= totalPages - 2) {
                  page = totalPages - 4 + index;
                } else {
                  page = safePage - 2 + index;
                }

                return (
                  <button
                    type="button"
                    key={page}
                    className={page === safePage ? "cc-page-active" : ""}
                    onClick={() => changePage(page)}
                  >
                    {page}
                  </button>
                );
              },
            )}

            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => changePage(safePage + 1)}
              aria-label="Next page"
            >
              <FiChevronRight />
            </button>

            <button
              type="button"
              disabled={safePage === totalPages}
              onClick={() => changePage(totalPages)}
              aria-label="Last page"
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      )}

      {/* =================================================
          CUSTOM FOOTER
      ================================================= */}

      {footer && <div className="cc-table-custom-footer">{footer}</div>}
    </div>
  );
};

export default Table;
