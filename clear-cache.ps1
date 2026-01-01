# Clear Next.js cache and restart instructions
Write-Host "Clearing Next.js build cache..." -ForegroundColor Yellow

# Remove .next folder if it exists
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "✓ Cleared .next folder" -ForegroundColor Green
} else {
    Write-Host "✓ .next folder not found (already cleared)" -ForegroundColor Green
}

# Remove node_modules/.cache if it exists
if (Test-Path node_modules\.cache) {
    Remove-Item -Recurse -Force node_modules\.cache
    Write-Host "✓ Cleared node_modules cache" -ForegroundColor Green
}

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Stop your dev server (Ctrl+C)" -ForegroundColor White
Write-Host "2. Run: npm run dev" -ForegroundColor White
Write-Host "3. Hard refresh browser (Ctrl+Shift+R)" -ForegroundColor White

