export const definition = {
    type: "items",
    component: "accordion",
    items: {
        dimensions: {
            uses: "dimensions",
            min: 1,
            max: 1,
        },
        measure: {
            uses: "measures",
            min: 1,
            max: 1,
        },
        sorting: {
            uses: "sorting",
        },
        appearance: {
            uses: "settings",
        },
    },
};