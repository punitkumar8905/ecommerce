const messages = {
    catch_error: {
        msg: "internal server error",
        flag: 0,
    },

    delete_msg: (module_name) => {
        return {
            msg: `${module_name} deleted successfully`,
            flag: 1,
        };
    },

      created_msg: (module_name) => {
        return {
            msg: `${module_name} created successfully`,
            flag: 1,
        };
    },

    general_error: (text) => {
        return {
            msg: text,
            flag: 0,
        };
    },
    
    general_success: (text) => {
        return {
            msg: text,
            flag: 1,
        };
    }
}


module.exports = { messages };