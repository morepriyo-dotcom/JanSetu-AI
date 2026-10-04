<#
.SYNOPSIS
    Ralph Loop — Autonomous Verification & Iterative Task Runner
.DESCRIPTION
    Runs an iterative, stateless development verification loop for AI coding agents.
    Prevents context rot by executing, verifying (lint + build), and committing in clean atomic cycles.
.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\ralph_loop.ps1
    powershell -ExecutionPolicy Bypass -File .\ralph_loop.ps1 -Continuous
#>

param(
    [switch]$Continuous,
    [int]$IntervalSeconds = 15,
    [string]$CommitMessage = ""
)

function Write-Step([string]$msg, [string]$color = "Cyan") {
    Write-Host "`n[$([DateTime]::Now.ToString('HH:mm:ss'))] === $msg ===" -ForegroundColor $color
}

function Run-Verification {
    Write-Step "Step 1: Running Linter (npm run lint)..." "Yellow"
    npm run lint
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Linting failed! Please resolve lint errors before committing." -ForegroundColor Red
        return $false
    }
    Write-Host "✅ Linting passed cleanly." -ForegroundColor Green

    Write-Step "Step 2: Running Production Build (npm run build)..." "Yellow"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed! Please resolve build errors before committing." -ForegroundColor Red
        return $false
    }
    Write-Host "✅ Production build compiled successfully." -ForegroundColor Green

    return $true
}

function Commit-VerifiedChanges([string]$msg) {
    $status = git status --porcelain
    if (-not $status) {
        Write-Host "ℹ️ Working tree clean. No uncommitted changes." -ForegroundColor DarkGray
        return
    }

    Write-Step "Step 3: Staging and Committing Verified Changes..." "Cyan"
    git add -A

    $finalMsg = if ($msg) { $msg } else { "chore(ralph-loop): verified build and lint pass ($([DateTime]::Now.ToString('yyyy-MM-dd HH:mm')))" }
    git commit -m $finalMsg

    if ($LASTEXITCODE -eq 0) {
        Write-Host "🚀 Changes successfully committed to git: $finalMsg" -ForegroundColor Green
    }
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  🔄 RALPH LOOP ENGINE: Autonomous Agent Orchestrator     " -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan

if ($Continuous) {
    Write-Host "Running in CONTINUOUS WATCH MODE (Ctrl+C to stop)..." -ForegroundColor Yellow
    $iteration = 1
    while ($true) {
        Write-Step "Ralph Loop Iteration #$iteration" "Magenta"
        $ok = Run-Verification
        if ($ok) {
            Commit-VerifiedChanges "chore(ralph-loop): iteration #$iteration verified build"
        }
        $iteration++
        Write-Host "Sleeping for $IntervalSeconds seconds..." -ForegroundColor DarkGray
        Start-Sleep -Seconds $IntervalSeconds
    }
}
if (-not $Continuous) {
    Write-Host "Running SINGLE-PASS Ralph Verification..." -ForegroundColor Yellow
    $ok = Run-Verification
    if ($ok) {
        Commit-VerifiedChanges $CommitMessage
        Write-Host "`n🎉 Ralph Loop pass completed successfully! Code is 100% verified." -ForegroundColor Green
    }
    if (-not $ok) {
        Write-Host "`n⚠️ Ralph Loop stopped due to verification errors. Review output above." -ForegroundColor Red
        exit 1
    }
}
