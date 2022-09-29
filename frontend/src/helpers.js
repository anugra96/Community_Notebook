
// export const marker_color = (tag) => {
//     let ret_val = "";
//     if (tag === "Food") {
//         ret_val = "#DB1A37";
//     } else if (tag === "Climate") {
//         ret_val = "#114B5F";
//     } else if (tag === "Income") {
//         ret_val = "#07004D";
//     } else if (tag === "Health") {
//         ret_val = "#7F37A9";
//     } else if (tag === "Community") {
//         ret_val = "#304BC5";
//     } else if (tag === "Housing") {
//         ret_val = "#320E3b";
//     } else if (tag === "Sidewalks") {
//         ret_val = "#E2ADF2";
//     } else if (tag === "Gentrification") {
//         ret_val = "#318787";
//     } else if (tag === "Short-Term Rentals") {
//         ret_val = "#EF798A";
//     } else {
//         ret_val = "#7A0021"
//     }

//     return ret_val;


// };

export const marker_color = (tag) => {
    let ret_val = "";
    if (tag === "Food") {
        ret_val = "#EF476F";
    } else if (tag === "Climate") {
        ret_val = "#114B5F";
    } else if (tag === "Income") {
        ret_val = "#07004D";
    } else if (tag === "Health") {
        ret_val = "#A663CC";
    } else if (tag === "Community") {
        ret_val = "#6A7FDB";
    } else if (tag === "Housing") {
        ret_val = "#320E3b";
    } else if (tag === "Sidewalks") {
        ret_val = "#E2ADF2";
    } else if (tag === "Gentrification") {
        ret_val = "#59C3C3";
    } else if (tag === "Short-Term Rentals") {
        ret_val = "#EF798A";
    } else {
        ret_val = "#FFAFC5"
    }

    return ret_val;


};




const get_DB_URL = (type) => {
    const hosted_URL = "https://afternoon-eyrie-53412.herokuapp.com/api/note";
    const localhost_URL = "http://localhost:5000/api/note";

    if (type === "hosted") {
        return hosted_URL;
    } else {
        return localhost_URL;
    }
};

export const DB_URL = get_DB_URL("locahosted");

export const format_date = (raw_date) => {
    let date = new Date(raw_date);

    if (raw_date) {
        return date.toLocaleString('en-CA', {
            timeZone: 'America/New_York',
            dateStyle: 'full',
            timeStyle: 'medium'
        });
    } else {
        return "";
    }

}

export const tag_names = [

    {
        id: 0,
        name: "Food",
        active: true
    },
    {
        id: 1,
        name: "Climate",
        active: true
    },
    {
        id: 2,
        name: "Income",
        active: true
    },
    {
        id: 3,
        name: "Health",
        active: true
    },
    {
        id: 4,
        name: "Community",
        active: true
    },
    {
        id: 5,
        name: "Housing",
        active: true
    },
    {
        id: 6,
        name: "Sidewalks",
        active: true
    },
    {
        id: 7,
        name: "Gentrification",
        active: true
    },
    {
        id: 8,
        name: "Short-Term Rentals",
        active: true
    },
    {
        id: 9,
        name: "Infrastructure",
        active: true
    },

];



