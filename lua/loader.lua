--[[
    Premium Loader for FVKHUB
    Developed for Key-Licences
]]

local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer

-- Configuration
local API_URL = _G.FVK_API_URL or "http://localhost:5173/api/v1/auth"
local GET_KEY_URL = _G.FVK_KEY_URL or "http://localhost:5173"
local SCRIPT_ID = _G.FVK_SCRIPT_ID 

-- GUI Creation
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "FVKHUBLoader"
ScreenGui.ResetOnSpawn = false
ScreenGui.IgnoreGuiInset = true
ScreenGui.Parent = gethui and gethui() or game:GetService("CoreGui") or LocalPlayer:FindFirstChildOfClass("PlayerGui")

local MainFrame = Instance.new("Frame")
MainFrame.Name = "MainFrame"
MainFrame.Size = UDim2.new(0, 350, 0, 250)
MainFrame.Position = UDim2.new(0.5, -175, 0.5, -125)
MainFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
MainFrame.BorderSizePixel = 0
MainFrame.Parent = ScreenGui

local UICorner = Instance.new("UICorner")
UICorner.CornerRadius = UDim.new(0, 12)
UICorner.Parent = MainFrame

-- Gradient Background
local UIGradient = Instance.new("UIGradient")
UIGradient.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(30, 30, 30)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(15, 15, 15))
})
UIGradient.Rotation = 45
UIGradient.Parent = MainFrame

-- UI Title
local Title = Instance.new("TextLabel")
Title.Name = "Title"
Title.Size = UDim2.new(1, 0, 0, 50)
Title.BackgroundTransparency = 1
Title.Text = "FVKHUB LOADER"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.TextSize = 22
Title.Font = Enum.Font.GothamBold
Title.Parent = MainFrame

-- Key Input
local KeyInput = Instance.new("TextBox")
KeyInput.Name = "KeyInput"
KeyInput.Size = UDim2.new(0, 280, 0, 45)
KeyInput.Position = UDim2.new(0.5, -140, 0, 80)
KeyInput.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
KeyInput.BorderSizePixel = 0
KeyInput.Text = ""
KeyInput.PlaceholderText = "Enter License Key Here..."
KeyInput.TextColor3 = Color3.fromRGB(255, 255, 255)
KeyInput.PlaceholderColor3 = Color3.fromRGB(150, 150, 150)
KeyInput.TextSize = 14
KeyInput.Font = Enum.Font.Gotham
KeyInput.Parent = MainFrame

local KeyCorner = Instance.new("UICorner")
KeyCorner.CornerRadius = UDim.new(0, 8)
KeyCorner.Parent = KeyInput

-- Buttons Container
local ButtonsArea = Instance.new("Frame")
ButtonsArea.Size = UDim2.new(0, 280, 0, 45)
ButtonsArea.Position = UDim2.new(0.5, -140, 0, 140)
ButtonsArea.BackgroundTransparency = 1
ButtonsArea.Parent = MainFrame

local UIListLayout = Instance.new("UIListLayout")
UIListLayout.FillDirection = Enum.FillDirection.Horizontal
UIListLayout.Padding = UDim.new(0, 10)
UIListLayout.Parent = ButtonsArea

-- Login Button
local LoginBtn = Instance.new("TextButton")
LoginBtn.Name = "LoginBtn"
LoginBtn.Size = UDim2.new(0.65, -5, 1, 0)
LoginBtn.BackgroundColor3 = Color3.fromRGB(60, 120, 255)
LoginBtn.BorderSizePixel = 0
LoginBtn.Text = "AUTHENTICATE"
LoginBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
LoginBtn.TextSize = 14
LoginBtn.Font = Enum.Font.GothamBold
LoginBtn.Parent = ButtonsArea

local LoginCorner = Instance.new("UICorner")
LoginCorner.CornerRadius = UDim.new(0, 8)
LoginCorner.Parent = LoginBtn

-- Get Key Button
local GetKeyBtn = Instance.new("TextButton")
GetKeyBtn.Name = "GetKeyBtn"
GetKeyBtn.Size = UDim2.new(0.35, -5, 1, 0)
GetKeyBtn.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
GetKeyBtn.BorderSizePixel = 0
GetKeyBtn.Text = "GET KEY"
GetKeyBtn.TextColor3 = Color3.fromRGB(200, 200, 200)
GetKeyBtn.TextSize = 14
GetKeyBtn.Font = Enum.Font.GothamBold
GetKeyBtn.Parent = ButtonsArea

local GetKeyCorner = Instance.new("UICorner")
GetKeyCorner.CornerRadius = UDim.new(0, 8)
GetKeyCorner.Parent = GetKeyBtn

-- Footer Info
local Status = Instance.new("TextLabel")
Status.Name = "Status"
Status.Size = UDim2.new(1, 0, 0, 30)
Status.Position = UDim2.new(0, 0, 1, -40)
Status.BackgroundTransparency = 1
Status.Text = "Awaiting credentials..."
Status.TextColor3 = Color3.fromRGB(150, 150, 150)
Status.TextSize = 12
Status.Font = Enum.Font.Gotham
Status.Parent = MainFrame

-- LOGIC
local FILE_NAME = "fvkhub_key.txt"

local function gethwid()
    local hwid = "LOCAL_CLIENT_FALLBACK"
    pcall(function()
        hwid = game:GetService("RbxAnalyticsService"):GetClientId()
    end)
    return hwid
end

local function notify(msg, color)
    Status.Text = msg
    Status.TextColor3 = color or Color3.fromRGB(200, 200, 200)
end

local function authenticate(auto)
    local key = KeyInput.Text
    if key == "" then
        notify("Please enter a key first!", Color3.fromRGB(255, 100, 100))
        return
    end

    if auto then
        notify("Auto-syncing credentials...", Color3.fromRGB(100, 200, 255))
    else
        notify("Verifying sequence...", Color3.fromRGB(100, 200, 255))
    end
    
    local hwid = gethwid()
    local payload = HttpService:JSONEncode({
        key = key,
        hwid = hwid,
        scriptId = (SCRIPT_ID ~= "" and not SCRIPT_ID:find("^http")) and SCRIPT_ID or nil
    })
    
    local success, response = pcall(function()
        return HttpService:PostAsync(API_URL, payload, Enum.HttpContentType.ApplicationJson)
    end)

    if success then
        local data = HttpService:JSONDecode(response)
        if data.success then
            notify("Access Granted! Loading module...", Color3.fromRGB(100, 255, 100))
            
            -- Premium/Free System Notification
            pcall(function()
                local tierName = (data.tier or "Free"):upper()
                local isPremium = (tierName ~= "FREE")
                
                game:GetService("StarterGui"):SetCore("SendNotification", {
                    Title = "FVKHUB SUCCESS",
                    Text = isPremium and "Welcome back, Premium User! Enjoy your exclusive features." or "Free Key Activated. Upgrade for permanent & ad-free access!",
                    Duration = 5,
                    Icon = isPremium and "rbxassetid://10617344078" or "rbxassetid://10617360055"
                })
            end)
            
            -- Save key for next time
            pcall(function()
                if writefile then
                    writefile(FILE_NAME, key)
                end
            end)

            task.wait(1)
            
            local code = data.sourceCode
            
            -- Fallback to SCRIPT_ID if it's a URL and no code was returned by API
            if (not code or code == "") and SCRIPT_ID:find("^http") then
                notify("Fetching module from source...", Color3.fromRGB(100, 200, 255))
                local fetchSuccess, fetchResult = pcall(function()
                    return game:HttpGet(SCRIPT_ID)
                end)
                if fetchSuccess then
                    code = fetchResult
                else
                    notify("Failed to fetch module from GitHub.", Color3.fromRGB(255, 100, 100))
                end
            end

            if code and code ~= "" then
                local func, err = loadstring(code)
                if func then
                    ScreenGui:Destroy()
                    func()
                else
                    notify("Failed to parse source: " .. tostring(err), Color3.fromRGB(255, 100, 100))
                end
            else
                notify("Login success, but no module found.", Color3.fromRGB(255, 200, 100))
            end
        else
            notify(data.message or "Invalid Protocol.", Color3.fromRGB(255, 100, 100))
        end
    else
        notify("Connection node failed.", Color3.fromRGB(255, 100, 100))
    end
end

-- Auto Load Logic
pcall(function()
    if isfile and isfile(FILE_NAME) then
        local savedKey = readfile(FILE_NAME)
        if savedKey and savedKey ~= "" then
            KeyInput.Text = savedKey
            task.delay(1, function()
                authenticate(true)
            end)
        end
    end
end)

-- Interactions
LoginBtn.MouseButton1Click:Connect(authenticate)

GetKeyBtn.MouseButton1Click:Connect(function()
    if setclipboard then
        setclipboard(GET_KEY_URL)
        notify("URL copied to clipboard!", Color3.fromRGB(100, 255, 100))
    else
        notify("Open this link: " .. GET_KEY_URL, Color3.fromRGB(255, 255, 255))
    end
end)

-- Hover Effects
local function addHover(btn, normalColor, hoverColor)
    btn.MouseEnter:Connect(function()
        TweenService:Create(btn, TweenInfo.new(0.3), {BackgroundColor3 = hoverColor}):Play()
    end)
    btn.MouseLeave:Connect(function()
        TweenService:Create(btn, TweenInfo.new(0.3), {BackgroundColor3 = normalColor}):Play()
    end)
end

addHover(LoginBtn, Color3.fromRGB(60, 120, 255), Color3.fromRGB(80, 140, 255))
addHover(GetKeyBtn, Color3.fromRGB(45, 45, 45), Color3.fromRGB(55, 55, 55))

-- Draggable MainFrame
local UserInputService = game:GetService("UserInputService")
local dragging, dragInput, dragStart, startPos

local function update(input)
    local delta = input.Position - dragStart
    MainFrame.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
end

MainFrame.InputBegan:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
        dragging = true
        dragStart = input.Position
        startPos = MainFrame.Position
        
        input.Changed:Connect(function()
            if input.UserInputState == Enum.UserInputState.End then
                dragging = false
            end
        end)
    end
end)

MainFrame.InputChanged:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then
        dragInput = input
    end
end)

UserInputService.InputChanged:Connect(function(input)
    if input == dragInput and dragging then
        update(input)
    end
end)
