// import { useState, useEffect, useCallback } from "react";
// import { getRecords } from "../services/api.service";

// const useFetchData = (initialPayload, page, pageSize) => {
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [searchKeyword, setSearchKeyword] = useState("");
//     const [totalCount, setTotalCount] = useState(0);

//     const getData = useCallback(async () => {
//         try {
//             setIsLoading(true);
//             let payload = {
//                 ...initialPayload,
//             };

//             // if (searchKeyword) {
//                 payload.search = {
//                     field_name: initialPayload.search || [],
//                     searchKeyword: searchKeyword,
//                 };
//             // }
//                 payload.pagination = {
//                     page: page + 1,
//                     pageSize: pageSize,
//                 }
            
//                 payload.orderByModel = {
//                     field: initialPayload.orderByModel.field || [],
//                     order: initialPayload.orderByModel.order || []
//                 }
//             const responseData = await getRecords(payload);
//             if (responseData.code === 1) {
//                 setTotalCount(responseData.count);
//                 const sortedData = responseData.data
//                     .map((element, index) => ({
//                         ...element,
//                         index: page * pageSize + (index + 1),
//                     }))
//                     // .sort((a, b) => b.index - a.index);
//                 setData(sortedData);
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [page, pageSize, searchKeyword, initialPayload]);

//     useEffect(() => {
//         getData();
//     }, [getData]);

//     return {
//         data,
//         isLoading,
//         searchKeyword,
//         setSearchKeyword,
//         totalCount,
//     };
// };

// export default useFetchData;

import { useState, useEffect, useCallback } from "react";
import { getRecords } from "../services/api.service";

const useFetchData = (initialPayload, page, pageSize) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState(""); // Manage search input
    const [totalCount, setTotalCount] = useState(0);

    // Function to update the search keyword
    const getSearchInputData = useCallback((keyword) => {
        setSearchKeyword(keyword);
    }, []);

    const getData = useCallback(async () => {
        try {
            setIsLoading(true);
            let payload = {
                ...initialPayload,
                pagination: {
                    page: page + 1, // API pages often start at 1
                    pageSize: pageSize,
                },
                orderByModel: {
                    field: initialPayload.orderByModel?.field || [],
                    order: initialPayload.orderByModel?.order || [],
                },
                search : {
                    field_name: initialPayload.search?.field || [],
                    searchKeyword: searchKeyword,
                }
            };

            // Add searchKeyword to payload if it exists
            // if (searchKeyword) {
                
            // }

            const responseData = await getRecords(payload);
            if (responseData.code === 1) {
                setTotalCount(responseData.count || 0);
                const sortedData = responseData.data.map((element, index) => ({
                    ...element,
                    index: page * pageSize + (index + 1),
                }));
                setData(sortedData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [page, pageSize, searchKeyword, initialPayload]);

    useEffect(() => {
        getData();
    }, [getData]);

    return {
        data,
        isLoading,
        searchKeyword,
        getSearchInputData, // Expose this function for external use
        totalCount,
    };
};

export default useFetchData;
