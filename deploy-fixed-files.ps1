# ==========================================
# TypeScript Files Deployment Script
# Deploys 11 fixed TypeScript files to correct monorepo locations
# Run from monorepo root directory
# ==========================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "TypeScript Files Deployment Script" -ForegroundColor Cyan
Write-Host "Deploying 11 fixed files to monorepo" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

# Get the current directory (should be monorepo root)
$rootDir = Get-Location
Write-Host "Working directory: $rootDir`n" -ForegroundColor Yellow

# Define file mappings: @("Source file name", "Destination path", "Original file name")
$fileMappings = @(
    # Legal Pages
    @("AboutFooter-FIXED.tsx", "packages/legal-pages/src/about", "AboutFooter.tsx"),
    @("TermsModal-FIXED.tsx", "packages/legal-pages/src/terms", "TermsModal.tsx"),
    @("TermsPage-FIXED.tsx", "packages/legal-pages/src/terms", "TermsPage.tsx"),
    
    # Stripe Helpers - Checkout
    @("handlePriceSwitching-FIXED.ts", "packages/stripe-helpers/src/checkout", "handlePriceSwitching.ts"),
    
    # Stripe Helpers - Config
    @("defaultConfig-FIXED.ts", "packages/stripe-helpers/src/config", "defaultConfig.ts"),
    
    # Stripe Helpers - Email
    @("emailTemplates-FIXED.ts", "packages/stripe-helpers/src/email", "emailTemplates.ts"),
    @("sendAccessCodeEmail-FIXED.ts", "packages/stripe-helpers/src/email", "sendAccessCodeEmail.ts"),
    
    # Stripe Helpers - Utils
    @("utilityFunctions-FIXED.ts", "packages/stripe-helpers/src/utils", "utilityFunctions.ts"),
    
    # Stripe Helpers - Webhooks
    @("handleCheckoutCompleted-FIXED.ts", "packages/stripe-helpers/src/webhooks", "handleCheckoutCompleted.ts"),
    @("handleStripeWebhook-FIXED.ts", "packages/stripe-helpers/src/webhooks", "handleStripeWebhook.ts"),
    @("subscriptionHandlers-FIXED.ts", "packages/stripe-helpers/src/webhooks", "subscriptionHandlers.ts")
)

$successCount = 0
$failureCount = 0
$backupCount = 0

# Process each file
foreach ($mapping in $fileMappings) {
    $sourceFile = $mapping[0]
    $destFolder = $mapping[1]
    $originalName = $mapping[2]
    
    $sourcePath = Join-Path $rootDir $sourceFile
    $destPath = Join-Path $rootDir $destFolder $originalName
    $destFolderPath = Join-Path $rootDir $destFolder
    
    Write-Host "Processing: $sourceFile" -ForegroundColor Magenta
    
    # Check if source file exists
    if (-not (Test-Path $sourcePath)) {
        Write-Host "  [X] Source file not found: $sourcePath" -ForegroundColor Red
        $failureCount++
        continue
    }
    
    # Create destination folder if it doesn't exist
    if (-not (Test-Path $destFolderPath)) {
        Write-Host "  [!] Creating directory: $destFolderPath" -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $destFolderPath -Force | Out-Null
    }
    
    # Backup existing file if it exists
    if (Test-Path $destPath) {
        $backupPath = "$destPath.backup"
        Write-Host "  [!] Backing up existing file: $originalName" -ForegroundColor Yellow
        Copy-Item $destPath $backupPath -Force
        $backupCount++
    }
    
    # Copy file with new name
    try {
        Copy-Item $sourcePath $destPath -Force
        Write-Host "  [OK] Deployed: $originalName -> $destFolder/" -ForegroundColor Green
        $successCount++
    }
    catch {
        Write-Host "  [X] Error deploying file: $_" -ForegroundColor Red
        $failureCount++
    }
}

# Summary
Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "Deployment Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "[OK] Successfully deployed: $successCount files" -ForegroundColor Green
Write-Host "[!] Backups created: $backupCount files" -ForegroundColor Yellow
Write-Host "[X] Failed: $failureCount files" -ForegroundColor Red

if ($failureCount -eq 0) {
    Write-Host "`n[SUCCESS] All files deployed successfully!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Run: npm run build:packages" -ForegroundColor White
    Write-Host "  2. Should complete with 0 TypeScript errors" -ForegroundColor White
} else {
    Write-Host "`n[WARNING] Some files failed to deploy. Please check the errors above." -ForegroundColor Red
}

Write-Host "`n================================================`n" -ForegroundColor Cyan
