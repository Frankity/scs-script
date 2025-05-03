const reservedWords = [
    {        
        "name": "cargo_loading_methods",
        "type": "array",
        "description": "array of tokens representing supported cargo by this body.",
        "example": "cargo_loading_methods[]: area|area_cont_20ft|area_cont_40ft\narea_cont_45ft|area_cont_53ft|area_cylinder\narea_logger|auxiliary_only|bulk|custom"
    },
    {        
        "name": "cargo_regular_width",
        "type": "float",
        "description": "float representing at which width extension parts for the trailer are switched on.",
        "example": "cargo_regular_width: 2.4"
    },
    {        
        "name": "cargo_warning_signs",
        "type": "boolean",
        "description": "bool value indicating whether body should have warning signs part switching supported or not.",
        "example": "cargo_warning_signs: false|true"
    },
    {        
        "name": "cargo_areas",
        "type": "array",
        "description": "array of area sizes (X,Z) that are used for any of area based loading method.",
        "example": "cargo_areas[]: (2.4, 14.39)"
    },
    {        
        "name": "cargo_areas_cylinder_data",
        "type": "array",
        "description": "array aligned with cargo areas, storing additional data for cylinder based loading (each item representing height, slope angle for given cargo area).",
        "example": "cargo_areas_cylinder_data[]: cargo_areas_definition"
    },
    {        
        "name": "cargo_custom_loads",
        "type": "array",
        "description": "array of `cargo_custom_load_data_u` unit pointers storing custom load offset per cargo.",
        "example": "cargo_custom_loads[]: .cargo_def_name"
    },
    {        
        "name": "cargo_lashing_mounts",
        "type": "array",
        "description": "array of `cargo_lashing_mount_u` unit pointers storing lashing mount definitions.",
        "example": "cargo_lashing_mounts[]: .cargo_lashing_mount_def_name"
    },
    {        
        "name": "cargo_lashing_strap",
        "type": "unit",
        "description": "unit pointer to cargo_lashing_gear_u storing configuration of lashing gear used when `strap` gear method is selected by the cargo model match.",
        "example": "cargo_lashing_strap: .strap"
    },
    {        
        "name": "cargo_lashing_chain",
        "type": "unit",
        "description": "unit pointer to cargo_lashing_gear_u storing configuration of lashing gear used when `chain` gear methods is selected by the cargo model match",
        "example": "cargo_lashing_chain: .chain"
    },
    {        
        "name": "wrn_sgn_off",
        "type": "unit",
        "description": "part will be switched on if loaded cargo width is under 2.5m",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "wrn_sgn_29",
        "type": "unit",
        "description": "part will be switched on if loaded cargo width is above 2.5m and under 2.9m",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "wrn_sgn_32",
        "type": "unit",
        "description": "part will be switched on if loaded cargo width is above 2.9m and under 3.2m",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "wrn_sgn_max",
        "type": "unit",
        "description": "part will be switched on if loaded cargo width is above 3.2m",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "larea_on_X",
        "type": "unit",
        "description": "for area based loading methods game searches for the parts `larea_on_X` and `larea_off_X` where X is the index of the area from `cargo_areas[]` attribute.",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "larea_off_X",
        "type": "unit",
        "description": "for area based loading methods game searches for the parts `larea_on_X` and `larea_off_X` where X is the index of the area from `cargo_areas[]` attribute.",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "cargo_on",
        "type": "unit",
        "description": "for rest of the loading methods game will be searching for the parts `cargo_on` and `cargo_off`.",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "cargo_off",
        "type": "unit",
        "description": "for rest of the loading methods game will be searching for the parts `cargo_on` and `cargo_off`.",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "cargo_token",
        "type": "string",
        "description": "cargo suffix token for which this custom load data are used.",
        "example": "cargo_token: cargo_def_name"
    },
    {        
        "name": "offset",
        "type": "float3",
        "description": "position offset from cargo locator.",
        "example": "offset: (0, 0, 0)"
    },
    {        
        "name": "rotation",
        "type": "float3",
        "description": "rotation offset from cargo locator in degrees",
        "example": "rotation: (0, 0, 0)"
    },
    {        
        "name": "spacing",
        "type": "float",
        "description": "`float` defining space between individual lashing mount points on the lashing mount.",
        "example": "spacing: 0.396"
    },
    {        
        "name": "hook_angle_constraints",
        "type": "float3",
        "description": "`float3` defining angle constraints on each axis for the hook used with this mount, ranging from 0 to 90° (zero meaning no rotation allowed, 90° meaning 90 degrees into either negative or positive direction)",
        "example": "hook_angle_constraints: (90, 90, 10)"
    },
    {        
        "name": "open_model",
        "type": "string",
        "description": "string as path to the model placed on lashing mount when lashing is done to it.",
        "example": "open_model: \"/vehicle/trailer_owned/scs_dropdeck/body/hook_chain_open.pmd\""
    },
    {        
        "name": "closed_model",
        "type": "string",
        "description": "string as path to the model placed on lashing mount when when spaced position is not used (this model will be placed only in case spacing is grater than 0).",
        "example": "closed_model: \"/vehicle/trailer_owned/scs_dropdeck/body/hook_chain_closed.pmd\""
    },
    {        
        "name": "lashm_s_X",
        "type": "unit",
        "description": "For lashing mount to be correctly loaded, the body or chassis (if body model is not defined) has to have proper model locators pair: `lashm_s_X` and `lashm_e_X` where X is the index of the lashing mount inside the `cargo_lashing_mounts` array of the trailer body data.\nFirst locator is representing the start and second is representing the end of the lashing mount.\nNote that lashing mounts should be placed on forward vehicle axis from front to the rear of the vehicle.",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "lashm_e_X",
        "type": "unit",
        "description": "For lashing mount to be correctly loaded, the body or chassis (if body model is not defined) has to have proper model locators pair: `lashm_s_X` and `lashm_e_X` where X is the index of the lashing mount inside the `cargo_lashing_mounts` array of the trailer body data.\nFirst locator is representing the start and second is representing the end of the lashing mount.\nNote that lashing mounts should be placed on forward vehicle axis from front to the rear of the vehicle.",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "material",
        "type": "string",
        "description": "used to customize the appearance of objects in the game.",
        "example": "material: \"/vehicle/trailer_owned/trailer_name/loderas2.mat\""
    },
    {        
        "name": "size",
        "type": "float3, float2",
        "description": "defines the size of an object.\nif it's about `accessory_trailer_body_data` size it gets this definition:\nInterior dimensions (cargo area) of the body in meters (width, height, length).\nif it's about glass_pane_data: The size (width, height) of the glass pane in meters.",
        "example": "size: (10, 10, 10) for accessory_trailer_body_data\nsize: (0.5, 0.5) for glass_pane_data"
    },
    {        
        "name": "texcoord_uratio",
        "type": "float",
        "description": "float defining U ratio of texture used within material of generated geometry: uratio = texture_width / texture_height.",
        "example": "texcoord_uratio: 1.5"
    },
    {        
        "name": "start_hook",
        "type": "string",
        "description": "string as path to the model to be added on the start of the generated lashing path",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "start_hook_length",
        "type": "string",
        "description": "string as path to the model to be added on the end of the generated lashing path",
        "example": "start_hook_length: 1.0"
    },
    {        
        "name": "end_hook",
        "type": "string",
        "description": "string as path to the model to be added on the end of the generated lashing path.",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "end_hook_length",
        "type": "float",
        "description": "float as length from model origin to the hook end it it's forward direction for which lashing will be offset.",
        "example": "end_hook_length: 1.5"
    },
    {        
        "name": "binder",
        "type": "string",
        "description": "string as path to the binder model that is inserted on first part of lashing, model has to be placed along forward direction to be properly aligned with generated lashing.",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {        
        "name": "binder_length",
        "type": "float",
        "description": "float as length from model origin to the end of the binder bottom in it's inverse forward direction",
        "example": "not enough data to provide an example, check the reference guide."
    },
    {
        "name": "data_path",
        "type": "array of strings",
        "description": "Array of strings defining different models of the same cargo model match (same dimensions but different look).",
        "example": "data_path: [\"/model/path1\", \"/model/path2\"]"
    },
    {
        "name": "dimensions",
        "type": "float3",
        "description": "Represents dimensions of the cargo model match in each axis (X, Y, Z). Y is currently ignored but might be used in the future.",
        "example": "dimensions: (2.5, 0.0, 6.0)"
    },
    {
        "name": "unit_volume_factor",
        "type": "float",
        "description": "Factor of the cargo unit volume defined in cargo data, used to distinguish different visual representations of the same cargo.",
        "example": "unit_volume_factor: 1.2"
    },
    {
        "name": "loading_method",
        "type": "token",
        "description": "Token indicating the loading method the cargo model match will use. See #Cargo loading methods.",
        "example": "loading_method: \"top_crane\""
    },
    {
        "name": "lashing_method",
        "type": "token",
        "description": "Token indicating the lashing method the cargo model match will use. See #Cargo lashing methods.",
        "example": "lashing_method: \"chain_lashing\""
    },
    {
        "name": "lashing_gear_type",
        "type": "token",
        "description": "Token indicating the type of lashing gear used by the cargo model match. See #Cargo lashing gear types.",
        "example": "lashing_gear_type: \"hook_gear\""
    },
    {
        "name": "lashing_hook_angle_constraints",
        "type": "float3",
        "description": "Angle constraint on each axis of the hook in range 0–90°, applied only when direct lashing is used for the cargo model match.",
        "example": "lashing_hook_angle_constraints: (30.0, 45.0, 60.0)"
    },
    {
        "name": "area",
        "type": "token",
        "description": "Cargo placed on area; the game automatically calculates the number of cargo model matches that can fit onto the trailer.",
        "example": "area: \"example_value\""
    },
    {
        "name": "area_cont_20ft",
        "type": "token",
        "description": "Variation of 'area' for 20ft containers.",
        "example": "area_cont_20ft: \"example_value\""
    },
    {
        "name": "area_cont_40ft",
        "type": "token",
        "description": "Variation of 'area' for 40ft containers.",
        "example": "area_cont_40ft: \"example_value\""
    },
    {
        "name": "area_cont_45ft",
        "type": "token",
        "description": "Variation of 'area' for 45ft containers.",
        "example": "area_cont_45ft: \"example_value\""
    },
    {
        "name": "area_cont_53ft",
        "type": "token",
        "description": "Variation of 'area' for 53ft containers.",
        "example": "area_cont_53ft: \"example_value\""
    },
    {
        "name": "area_cylinder",
        "type": "token",
        "description": "Cylindrical cargo placed into a prism volume defined by bottom and top area.",
        "example": "area_cylinder: \"example_value\""
    },
    {
        "name": "area_logger",
        "type": "token",
        "description": "Variation of 'area' for loggers with side support.",
        "example": "area_logger: \"example_value\""
    },
    {
        "name": "auxiliary_only",
        "type": "token",
        "description": "No real cargo; only auxiliary models are placed on custom nodes (e.g., ADR signs, reefer lights).",
        "example": "auxiliary_only: \"example_value\""
    },
    {
        "name": "bulk",
        "type": "token",
        "description": "Bulk cargo loaded with mesh generation.",
        "example": "bulk: \"example_value\""
    },
    {
        "name": "custom",
        "type": "token",
        "description": "Cargo placed using a custom placement defined by cargo locator and 'cargo_custom_load_data_u' inside body.",
        "example": "custom: \"example_value\""
    },
    {        
        "name": "direct",
        "type": "cargo",
        "description": "cargo is lashed directly from rigid point on cargo to the trailer lashing mounts utilizing",
        "example": "direct: \"example_value\""
    },
    {        
        "name": "top_over",
        "type": "cargo",
        "description": "cargo is lashed with top over technique, trying to find perpendicular lashing against the loading area",
        "example": "top_over: \"example_value\""
    },
    {        
        "name": "none",
        "type": "cargo",
        "description": "cargo is not lashed, this can be used in combination with cargoes that are embedded on the trailer or lashed on itself",
        "example": "none: \"example_value\""
    },
    {        
        "name": "chain",
        "type": "lashing gear types",
        "description": "game creates diamond intersections segments to simulate chain mesh with a combination of alpha test material",
        "example": "cargo_lashing_gear : .chain"
    },
    {        
        "name": "strap",
        "type": "lashing gear types",
        "description": "game creates square intersection segments to simulate strap mesh",
        "example": "cargo_lashing_gear : .strap"
    },
    {        
        "name": "none",
        "type": "lashing gear types",
        "description": "Specifies no strap.",
        "example": "cargo_lashing_gear : none"
    },
    {        
        "name": "coll",
        "type": "string",
        "description": "Path to the collision descriptor (.pmc) for the accessory (if applicable).",
        "example": "strap:  \"/vehicle/trailer_owned/upgrade/r_mudflap/vehicle_name/loderas.pmc\""
    },
    {        
        "name": "cargo_def",
        "type": "string",
        "description": "unit class is used to assign a cargo to be produced or accepted by a company.",
        "example": "cargo_def : .cargo_def_name"
    },
    {        
        "name": "cargo",
        "type": "string",
        "description": "The unit name of the cargo, corresponding to a cargo_data unit.",
        "example": "cargo: \"cargo.stolen_ducks\""
    },
    {        
        "name": "SiiNunit",
        "type": "string",
        "description": "The magic mark – used to check if the file is a real SII file or not.",
        "example": "SiiNunit\n{..."
    },
    {        
        "name": "cargo_lashing_gear",
        "type": "unit",
        "description": "unit that represent the type of lashing gear.",
        "example": "cargo_lashing_gear : .strap|.chain|none"
    },
    {        
        "name": "accessory_addon_data",
        "type": "unit",
        "description": "must be set to some unique value - each component divided by dot can have max 12 characters.",
        "example": "accessory_addon_data : custom.amazing.renault.f_grill"
    },
    {        
        "name": "name",
        "type": "string",
        "description": "is the name of the element in truck configuration screen.",
        "example": "name : \"Awesome element\""
    },
    {        
        "name": "price",
        "type": "int",
        "description": "is a price of your accessory in game base currency (€ for ETS2, $ for ATS).",
        "example": "price : 100000"
    },
    {        
        "name": "unlock",
        "type": "int",
        "description": "level when the accessory is unlocked. If zero it will be unlocked immediately on game start.",
        "example": "level : 12"
    },
    {        
        "name": "icon",
        "type": "string",
        "description": "is a image that is displayed in truck configuration screen.",
        "example": "icon : \"awesome_addon_icon\""
    },
    {        
        "name": "exterior_model",
        "type": "string",
        "description": "is a model addon, it must a path to the `.pmd` file you will get after converting the data.",
        "example": "exterior_model : \"/vehicle/truck/upgrade/frontgrill/renault_magnum_2009/custom_grill.pmd\""
    },
    {        
        "name": "exterior_model_uk",
        "type": "string",
        "description": "Path to the model descriptor (.pmd) for the model to be displayed in the exterior view for right-hand drive vehicles (if applicable). If unset, defaults to exterior_model.",
        "example": "exterior_model_uk : \"/vehicle/truck/upgrade/frontgrill/renault_magnum_2009/custom_grill.pmd\""
    },
    {        
        "name": "interior_model",
        "type": "string",
        "description": "Path to the model descriptor (.pmd) for the model to be displayed in the interior view (if applicable).",
        "example": "interior_model : \"/path/to/my_gps_model_int.pmd\""
    },
    {        
        "name": "suitable_for",
        "type": "array",
        "description": "Each array member specifies a unit name — or a pattern using wildcards (*) — which must be present on the vehicle for this accessory to become visible in the store and applicable to the vehicle.",
        "example": "suitable_for[] : trailer.def_name.chassis"
    },
    {        
        "name": "variant",
        "type": "string",
        "description": "Name of the variant to be used on all descriptors of this accessory.",
        "example": "variant : variant_name"
    },

];

module.exports = reservedWords;