# TypeScript Files Deployment Script (SIMPLIFIED)
# Deploys 11 fixed TypeScript files to correct monorepo locations

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "TypeScript Files Deployment Script" -ForegroundColor Cyan
Write-Host "Deploying 11 fixed files to monorepo" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

$rootDir = (Get-Location).Path
Write-Host "Working directory: $rootDir`n" -ForegroundColor Yellow

# Define file mappings: @("Source file", "Dest folder", "Original name")
$files = @(
    @("AboutFooter-FIXED.tsx", "packages\legal-pages\src\about", "AboutFooter.tsx"),
    @("TermsModal-FIXED.tsx", "packages\legal-pages\src\terms", "TermsModal.tsx"),
    @("TermsPage-FIXED.tsx", "packages\legal-pages\src\terms", "TermsPage.tsx"),
    @("handlePriceSwitching-FIXED.ts", "packages\stripe-helpers\src\checkout", "handlePriceSwitching.ts"),
    @("defaultConfig-FIXED.ts", "packages\stripe-helpers\src\config", "defaultConfig.ts"),
    @("emailTemplates-FIXED.ts", "packages\stripe-helpers\src\email", "emailTemplates.ts"),
    @("sendAccessCodeEmail-FIXED.ts", "packages\stripe-helpers\src\email", "sendAccessCodeEmail.ts"),
    @("utilityFunctions-FIXED.ts", "packages\stripe-helpers\src\utils", "utilityFunctions.ts"),
    @("handleCheckoutCompleted-FIXED.ts", "packages\stripe-helpers\src\webhooks", "handleCheckoutCompleted.ts"),
    @("handleStripeWebhook-FIXED.ts", "packages\stripe-helpers\src\webhooks", "handleStripeWebhook.ts"),
    @("subscriptionHandlers-FIXED.ts", "packages\stripe-helpers\src\webhooks", "subscriptionHandlers.ts")
)

$success = 0
$failed = 0

foreach ($file in $files) {
    $sourceFile = $file[0]
    $destFolder = $file[1]
    $originalName = $file[2]
    
    $source = "$rootDir\$sourceFile"
    $dest = "$rootDir\$destFolder\$originalName"
    
    Write-Host "Processing: $sourceFile" -ForegroundColor Magenta
    
    # Check source exists
    if (-not (Test-Path $source)) {
        Write-Host "  [X] Source not found: $sourceFile" -ForegroundColor Red
        $failed++
        continue
    }
    
    # Create folder if needed
    $destFolderFull = "$rootDir\$destFolder"
    if (-not (Test-Path $destFolderFull)) {
        Write-Host "  [+] Creating folder: $destFolder" -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $destFolderFull -Force > $null
    }
    
    # Backup if file exists
    if (Test-Path $dest) {
        Write-Host "  [~] Backing up: $originalName" -ForegroundColor Yellow
        Copy-Item $dest "$dest.backup" -Force
    }
    
    # Copy file
    try {
        Copy-Item $source $dest -Force
        Write-Host "  [OK] Copied: $originalName" -ForegroundColor Green
        $success++
    }
    catch {
        Write-Host "  [X] Failed: $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "[OK] Success: $success files" -ForegroundColor Green
Write-Host "[X] Failed: $failed files" -ForegroundColor Red

if ($failed -eq 0) {
    Write-Host "`n[SUCCESS] All files deployed!" -ForegroundColor Green
    Write-Host "`nRun: npm run build:packages" -ForegroundColor Cyan
}
Write-Host "`n================================================`n" -ForegroundColor Cyan
