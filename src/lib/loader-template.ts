export const LOADER_TEMPLATE = `
local SCRIPT_ID = "{{SCRIPT_ID}}"

-- Secure Internal Protocol
local function _D(data)
    local b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    data = string.gsub(data, '[^'..b..'=]', '')
    return (data:gsub('.', function(x)
        if (x == '=') then return '' end
        local r, f = '', (b:find(x) - 1)
        for i = 6, 1, -1 do r = r .. (f % 2 ^ i - f % 2 ^ (i - 1) > 0 and '1' or '0') end
        return r
    end):gsub('%d%d%d%d%d%d%d%d', function(x)
        local c = 0
        for i = 1, 8 do if (x:sub(i, i) == '1') then c = c + 2 ^ (8 - i) end end
        return string.char(c)
    end))
end

-- Protocol Node Node
local API_URL = _D("aHR0cDovL2xvY2FsaG9zdDo1MTczL2FwaS92MS9hdXRo")

-- Load the remote loader logic
local success, result = pcall(function()
    return game:HttpGet("https://raw.githubusercontent.com/Fvkhub/fvkhub/refs/heads/main/loader.lua")
end)

if success then
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
