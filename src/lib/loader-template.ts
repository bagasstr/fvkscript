export const LOADER_TEMPLATE = `-- FVKHUB LOADER TEMPLATE (DO NOT MODIFY MANUALLY)
local SCRIPT_ID = "{{SCRIPT_ID}}"
local API_URL = "http://localhost:5173/api/v1/auth" -- Ganti ke domain anda saat produksi

-- Load the remote loader logic
local success, result = pcall(function()
    return game:HttpGet("https://raw.githubusercontent.com/Fvkhub/fvkhub/refs/heads/main/loader.lua")
end)

if success then
    -- Inject the SCRIPT_ID into the remote loader environment
    local function init()
        _G.FVK_SCRIPT_ID = SCRIPT_ID
        _G.FVK_API_URL = API_URL
        loadstring(result)()
    end
    init()
else
    warn("FVKHUB: Failed to bridge connection to secure node.")
end
`;
