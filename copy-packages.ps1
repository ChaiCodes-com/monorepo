# copy-packages.ps1
# Automated script to copy @chaicodes packages to monorepo

# UPDATE THIS: Where are your files stored?
$sourcePath = "C:\users\hp\desktop\claude-projects\monorepo"

# Get current directory (monorepo root)
$repoRoot = Get-Location

Write-Host "ChAICodes Package Copy Script" -ForegroundColor Cyan
Write-Host ""
Write-Host "Source Path: $sourcePath" -ForegroundColor Yellow
Write-Host "Repo Root:   $repoRoot" -ForegroundColor Yellow
Write-Host ""

# Verify source path exists
if (!(Test-Path $sourcePath)) {
    Write-Host "ERROR: Source path not found: $sourcePath" -ForegroundColor Red
    Write-Host "Please update the sourcePath variable in this script." -ForegroundColor Red
    exit 1
}

# Copy stripe-helpers
Write-Host "Copying stripe-helpers..." -ForegroundColor Green
Write-Host ""

$stripeFiles = @{
    "package.json" = "packages\stripe-helpers\package.json"
    "index.js" = "packages\stripe-helpers\src\index.js"
    "createCheckoutSession.js" = "packages\stripe-helpers\src\checkout\createCheckoutSession.js"
    "handlePriceSwitching.js" = "packages\stripe-helpers\src\checkout\handlePriceSwitching.js"
    "handleStripeWebhook.js" = "packages\stripe-helpers\src\webhooks\handleStripeWebhook.js"
    "handleCheckoutCompleted.js" = "packages\stripe-helpers\src\webhooks\handleCheckoutCompleted.js"
    "subscriptionHandlers.js" = "packages\stripe-helpers\src\webhooks\subscriptionHandlers.js"
    "sendAccessCodeEmail.js" = "packages\stripe-helpers\src\email\sendAccessCodeEmail.js"
    "emailTemplates.js" = "packages\stripe-helpers\src\email\emailTemplates.js"
    "databaseUtilities.js" = "packages\stripe-helpers\src\database\databaseUtilities.js"
    "utilityFunctions.js" = "packages\stripe-helpers\src\utils\utilityFunctions.js"
    "defaultConfig.js" = "packages\stripe-helpers\src\config\defaultConfig.js"
    "README.md" = "packages\stripe-helpers\README.md"
}

$stripeSuccess = 0
$stripeFailed = 0

foreach ($file in $stripeFiles.GetEnumerator()) {
    $sourceName = "packages-stripe-helpers-" + $file.Key
    $sourceFile = Join-Path $sourcePath $sourceName
    $destFile = Join-Path $repoRoot $file.Value
    $destDir = Split-Path $destFile -Parent

    if (!(Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    if (Test-Path $sourceFile) {
        Copy-Item -Path $sourceFile -Destination $destFile -Force
        Write-Host "  OK: $($file.Key)" -ForegroundColor Green
        $stripeSuccess++
    } else {
        Write-Host "  MISSING: $($file.Key)" -ForegroundColor Red
        $stripeFailed++
    }
}

Write-Host ""
Write-Host "stripe-helpers: $stripeSuccess copied, $stripeFailed missing" -ForegroundColor Cyan
Write-Host ""

# Copy legal-pages
Write-Host "Copying legal-pages..." -ForegroundColor Green
Write-Host ""

$legalFiles = @{
    "package.json" = "packages\legal-pages\package.json"
    "index.js" = "packages\legal-pages\src\index.js"
    "branding.js" = "packages\legal-pages\src\shared\branding.js"
    "AboutPage.jsx" = "packages\legal-pages\src\about\AboutPage.jsx"
    "AboutFooter.jsx" = "packages\legal-pages\src\about\AboutFooter.jsx"
    "TermsPage.jsx" = "packages\legal-pages\src\terms\TermsPage.jsx"
    "TermsModal.jsx" = "packages\legal-pages\src\terms\TermsModal.jsx"
    "README.md" = "packages\legal-pages\README.md"
}

$legalSuccess = 0
$legalFailed = 0

foreach ($file in $legalFiles.GetEnumerator()) {
    $sourceName = "packages-legal-pages-" + $file.Key
    $sourceFile = Join-Path $sourcePath $sourceName
    $destFile = Join-Path $repoRoot $file.Value
    $destDir = Split-Path $destFile -Parent

    if (!(Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    if (Test-Path $sourceFile) {
        Copy-Item -Path $sourceFile -Destination $destFile -Force
        Write-Host "  OK: $($file.Key)" -ForegroundColor Green
        $legalSuccess++
    } else {
        Write-Host "  MISSING: $($file.Key)" -ForegroundColor Red
        $legalFailed++
    }
}

Write-Host ""
Write-Host "legal-pages: $legalSuccess copied, $legalFailed missing" -ForegroundColor Cyan
Write-Host ""

# Summary
$totalSuccess = $stripeSuccess + $legalSuccess
$totalFailed = $stripeFailed + $legalFailed

Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "Total Files:         $($totalSuccess + $totalFailed)" -ForegroundColor White
Write-Host "Successfully Copied: $totalSuccess" -ForegroundColor Green
Write-Host "Missing/Failed:      $totalFailed" -ForegroundColor $(if ($totalFailed -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($totalFailed -eq 0) {
    Write-Host "SUCCESS! All files copied." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. npm install" -ForegroundColor White
    Write-Host "  2. git add ." -ForegroundColor White
    Write-Host "  3. git commit -m 'Add packages'" -ForegroundColor White
    Write-Host "  4. git push origin main" -ForegroundColor White
    exit 0
} else {
    Write-Host "Some files were missing. Check the source path." -ForegroundColor Red
    exit 1
}