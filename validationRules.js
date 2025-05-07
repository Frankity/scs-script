const validationRules = {
    price: { type: "number" },
    unlock: { type: "number" },
    model: { type: "string" },
    icon: { type: "string" },
    variant: { type: "enum", values: ["default", "custom", "premium"] },
    look: { type: "enum", values: ["default", "sport", "luxury"] },
    size: { type: "tuple", allowedLengths: [2, 3], elementType: "number" },
    total_size: { type: "tuple", length: 3, elementType: "number" },
    offset: { type: "tupleOrNumber", allowedLengths: [1, 3], elementType: "number" },
    rotation: { type: "tuple", allowedLengths: [1,3], elementType: "number" }
    
};

module.exports = validationRules;