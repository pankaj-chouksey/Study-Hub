#!/bin/bash

# Pre-Push Security Check Script
# Run this before pushing to GitHub

echo "🔍 Running security checks..."
echo ""

# Check 1: Verify .env.local is ignored
echo "✓ Checking .env.local is gitignored..."
if git check-ignore .env.local > /dev/null 2>&1; then
    echo "  ✅ .env.local is properly ignored"
else
    echo "  ❌ WARNING: .env.local is NOT ignored!"
    exit 1
fi

# Check 2: Look for staged .env files
echo ""
echo "✓ Checking for staged environment files..."
if git diff --cached --name-only | grep -E "\.env\.(local|production|development)$" > /dev/null; then
    echo "  ❌ WARNING: Environment file is staged!"
    echo "  Run: git reset HEAD .env.local"
    exit 1
else
    echo "  ✅ No environment files staged"
fi

# Check 3: Search for potential secrets in staged files
echo ""
echo "✓ Checking for potential secrets in code..."
if git diff --cached | grep -iE "(mongodb\+srv://|password.*=.*['\"][^'\"]{8,}|secret.*=.*['\"][^'\"]{20,})" > /dev/null; then
    echo "  ⚠️  WARNING: Potential secret found in staged files!"
    echo "  Please review your changes carefully"
    read -p "  Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "  ✅ No obvious secrets found"
fi

# Check 4: Run npm audit
echo ""
echo "✓ Running npm audit..."
if npm audit --audit-level=high > /dev/null 2>&1; then
    echo "  ✅ No high-severity vulnerabilities"
else
    echo "  ⚠️  WARNING: Security vulnerabilities found"
    echo "  Run: npm audit fix"
    read -p "  Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "✅ All security checks passed!"
echo ""
echo "Safe to push to GitHub 🚀"
echo ""
echo "Next steps:"
echo "1. git push origin main"
echo "2. Set up environment variables in your hosting platform"
echo "3. Deploy!"
