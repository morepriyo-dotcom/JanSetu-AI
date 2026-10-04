<#
.SYNOPSIS
    Universal AI Agent Project Setup Script
.DESCRIPTION
    Instantly equips any new project with:
    - AGENTS.md (Universal AI standards for Roo Code, Antigravity, Cursor)
    - GEMINI.md (Google Cloud Developer / Antigravity project rules)
    - .coderabbit.yaml (AI PR Code Reviewer config)
    - ralph_loop.ps1 (Autonomous verification & commit loop runner)
.EXAMPLE
    .\setup_new_project.ps1 -TargetPath "C:\Users\morep\OneDrive\Desktop\MyNewApp"
#>

param(
    [Parameter(Mandatory=$false)]
    [string]$TargetPath = "."
)

$SourceDir = $PSScriptRoot

if (-not (Test-Path $TargetPath)) {
    Write-Host "Creating target directory: $TargetPath" -ForegroundColor Cyan
    New-Item -ItemType Directory -Force -Path $TargetPath | Out-Null
}

$ResolvedPath = (Resolve-Path $TargetPath).Path
Write-Host "`n🚀 Equipping project at '$ResolvedPath' with AI Agent Stack..." -ForegroundColor Green

# 1. AGENTS.md
Copy-Item -Force (Join-Path $SourceDir "universal_AGENTS.md") (Join-Path $ResolvedPath "AGENTS.md")
Write-Host "  ✅ Injected AGENTS.md (Roo Code + Antigravity + Cursor standard)" -ForegroundColor Green

# 2. GEMINI.md
Copy-Item -Force (Join-Path $SourceDir "universal_GEMINI.md") (Join-Path $ResolvedPath "GEMINI.md")
Write-Host "  ✅ Injected GEMINI.md (Google Cloud & Antigravity guidelines)" -ForegroundColor Green

# 3. .coderabbit.yaml
Copy-Item -Force (Join-Path $SourceDir "coderabbit.yaml") (Join-Path $ResolvedPath ".coderabbit.yaml")
Write-Host "  ✅ Injected .coderabbit.yaml (Automated PR Reviewer)" -ForegroundColor Green

# 4. ralph_loop.ps1
Copy-Item -Force (Join-Path $SourceDir "ralph_loop.ps1") (Join-Path $ResolvedPath "ralph_loop.ps1")
Write-Host "  ✅ Injected ralph_loop.ps1 (Autonomous task execution loop)" -ForegroundColor Green

Write-Host "`n🎉 Setup complete! All AI agent protocols and tools are active in '$ResolvedPath'." -ForegroundColor Cyan
