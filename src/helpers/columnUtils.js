import { Button } from "reactstrap";

export const generateColumns = (data, columnData, handleEdit) => {
    console.log('hello generateColumns');
    
    if (!data || !data.length) return [];

    // Custom accessor function to handle nested objects and arrays
    const createAccessor = (path) => (row) => {
        return path.reduce((acc, key) => {
            // Check if key is an array index like 'free_trials[0]'
            const arrayMatch = key.match(/(\w+)\[(\d+)\]/);
            if (arrayMatch) {
                const [, arrayKey, index] = arrayMatch;
                return acc && Array.isArray(acc[arrayKey]) ? acc[arrayKey][Number(index)] : "-";
            }
            return acc && acc[key] ? acc[key] : "-";
        }, row);
    };

    const columns = columnData.map((col) => {
        const colPath = col.value.split("."); // Split nested keys
        const displayName = col.label.toUpperCase();

        return {
            Header: displayName,
            accessor: colPath.length > 1 ? createAccessor(colPath) : col.value, // Handle nested paths if present
            disableFilters: true,
            filterable: false,
            Cell: ({ value, row }) => {
                // Format date values
                if (["createdAt"].includes(col.value) && value) {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                }
                if (col.value === "is_active") {
                    return value === "Active" ? "Inactive" : "Active";
                }
                if (col.value === "actions") {
                    return (
                        <Button color="primary" onClick={() => {
                            handleEdit(row.original.id);
                        }}>
                            <i className="fas fa-edit"></i>
                        </Button>
                    );
                }

                return value;
            },
        };
    });

    return columns;
};
