# Pre-Push Security Check Script (PowerShell)
# Run this before pushing to GitHub

Write-Host "🔍 Running security checks..." -ForegroundColor Cyan
Write-Host ""

# Check 1: Verify .env.local is ignored
Write-Host "✓ Checking .env.local is gitignored..." -ForegroundColor Yellow
$envIgnored = git check-ignore .env.local 2>$null
if ($envIgnored) {
    Write-Host "  ✅ .env.local is properly ignored" -ForegroundColor Green
} else {
    Write-Host "  ❌ WARNING: .env.local is NOT ignored!" -ForegroundColor Red
    exit 1
}

# Check 2: Look for staged .env files
Write-Host ""
Write-Host "✓ Checking for staged environment files..." -ForegroundColor Yellow
$stagedEnvFiles = git diff --cached --name-only | Select-String -Pattern "\.env\.(local|production|development)$"
if ($stagedEnvFiles) {
    Write-Host "  ❌ WARNING: Environment file is staged!" -ForegroundColor Red
    Write-Host "  Run: git reset HEAD .env.local" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "  ✅ No environment files staged" -ForegroundColor Green
}

# Check 3: Search for potential secrets in staged files
Write-Host ""
Write-Host "✓ Checking for potential secrets in code..." -ForegroundColor Yellow
$potentialSecrets = git diff --cached | Select-String -Pattern "(mongodb\+srv://|password.*=.*['\`"][^'\`"]{8,}|secret.*=.*['\`"][^'\`"]{20,})" -CaseSensitive:$false
if ($potentialSecrets) {
    Write-Host "  ⚠️  WARNING: Potential secret found in staged files!" -ForegroundColor Yellow
    Write-Host "  Please review your changes carefully" -ForegroundColor Yellow
    $continue = Read-Host "  Continue anyway? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
} else {
    Write-Host "  ✅ No obvious secrets found" -ForegroundColor Green
}

# Check 4: Run npm audit
Write-Host ""
Write-Host "✓ Running npm audit..." -ForegroundColor Yellow
$auditResult = npm audit --audit-level=high 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ No high-severity vulnerabilities" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  WARNING: Security vulnerabilities found" -ForegroundColor Yellow
    Write-Host "  Run: npm audit fix" -ForegroundColor Yellow
    $continue = Read-Host "  Continue anyway? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
}

Write-Host ""
Write-Host "All security checks passed!" -ForegroundColor Green
Write-Host ""
Write-Host "Safe to push to GitHub" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. git push origin main"
Write-Host "2. Set up environment variables in your hosting platform"
Write-Host "3. Deploy"
