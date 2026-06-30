$ErrorActionPreference = "Continue"

$BaseUrl = "https://global-earnings-radar.vercel.app"
$OutputPath = "docs/debug-last-run.txt"

New-Item -ItemType Directory -Force -Path "docs" | Out-Null

$results = New-Object System.Collections.Generic.List[string]

function Add-Line {
  param([string]$Line)
  $results.Add($Line) | Out-Null
  Write-Host $Line
}

function Test-Endpoint {
  param(
    [string]$Name,
    [string]$Url,
    [string]$Method = "GET",
    [int]$ExpectedStatus = 200,
    [string]$ExpectedBody = ""
  )

  try {
    $response = Invoke-WebRequest -Uri $Url -Method $Method -UseBasicParsing -TimeoutSec 30
    $statusCode = [int]$response.StatusCode
    $ok = $statusCode -eq $ExpectedStatus

    if ($ExpectedBody -and ($response.Content -notmatch [regex]::Escape($ExpectedBody))) {
      $ok = $false
    }

    if ($ok) {
      Add-Line "[OK] $Name - HTTP $statusCode - $Url"
    } else {
      Add-Line "[WARN] $Name - HTTP $statusCode - $Url"
      if ($ExpectedBody) {
        Add-Line "       Expected body contains: $ExpectedBody"
      }
    }
  } catch {
    Add-Line "[FAIL] $Name - $Url"
    Add-Line "       $($_.Exception.Message)"
  }
}

Add-Line "Global Earnings Radar Debug Run"
Add-Line "Time: $(Get-Date -Format o)"
Add-Line ""
Add-Line "Route checks"
Test-Endpoint -Name "Home" -Url "$BaseUrl/"
Test-Endpoint -Name "Pricing" -Url "$BaseUrl/pricing"
Test-Endpoint -Name "Market" -Url "$BaseUrl/market"

Add-Line ""
Add-Line "API checks"
Test-Endpoint -Name "Market Quote" -Url "$BaseUrl/api/market-quote?symbol=NVDA"
Test-Endpoint -Name "Market Search" -Url "$BaseUrl/api/market-search?q=tesla"
Test-Endpoint -Name "Market Cache Status Preview" -Url "$BaseUrl/api/market-cache-status"
Test-Endpoint -Name "Entitlement Status Preview" -Url "$BaseUrl/api/entitlement-status"
Test-Endpoint -Name "Disabled ECPay Checkout" -Url "$BaseUrl/api/create-ecpay-payment" -Method "POST" -ExpectedBody "ECPay checkout is not configured."

Add-Line ""
Add-Line "Pricing Entitlement Preview checks"
# Check /pricing route
try {
  $pricingResponse = Invoke-WebRequest -Uri "$BaseUrl/pricing" -UseBasicParsing -TimeoutSec 30
  if ($pricingResponse.StatusCode -eq 200) {
    Add-Line "[OK] Pricing route - HTTP $($pricingResponse.StatusCode)"
  } else {
    Add-Line "[WARN] Pricing route - HTTP $($pricingResponse.StatusCode)"
  }
} catch {
  Add-Line "[FAIL] Pricing route - $($_.Exception.Message)"
}

# Check entitlement status API
$entitlementChecksPassed = $true
try {
  $entitlementResponse = Invoke-WebRequest -Uri "$BaseUrl/api/entitlement-status" -UseBasicParsing -TimeoutSec 30
  if ($entitlementResponse.StatusCode -eq 200) {
    Add-Line "[OK] Entitlement Status API - HTTP $($entitlementResponse.StatusCode)"

    # Parse JSON response
    $entitlementJson = $entitlementResponse.Content | ConvertFrom-Json

    # Check currentTier is free
    if ($entitlementJson.currentTier -eq "free") {
      Add-Line "[OK] currentTier = 'free'"
    } else {
      Add-Line "[WARN] currentTier = '$($entitlementJson.currentTier)' (expected: 'free')"
      $entitlementChecksPassed = $false
    }

    # Check entitlementMode is preview-only
    if ($entitlementJson.entitlementMode -eq "preview-only") {
      Add-Line "[OK] entitlementMode = 'preview-only'"
    } else {
      Add-Line "[WARN] entitlementMode = '$($entitlementJson.entitlementMode)' (expected: 'preview-only')"
      $entitlementChecksPassed = $false
    }

    # Check aiAccessEnabled is false
    if ($entitlementJson.aiAccessEnabled -eq $false) {
      Add-Line "[OK] aiAccessEnabled = false (AI Pro locked)"
    } else {
      Add-Line "[WARN] aiAccessEnabled = $($entitlementJson.aiAccessEnabled) (expected: false)"
      $entitlementChecksPassed = $false
    }

    # Check paymentEnabled is false
    if ($entitlementJson.paymentEnabled -eq $false) {
      Add-Line "[OK] paymentEnabled = false (Payment disabled)"
    } else {
      Add-Line "[WARN] paymentEnabled = $($entitlementJson.paymentEnabled) (expected: false)"
      $entitlementChecksPassed = $false
    }

    # Check subscriptionEnabled is false
    if ($entitlementJson.subscriptionEnabled -eq $false) {
      Add-Line "[OK] subscriptionEnabled = false (Subscription disabled)"
    } else {
      Add-Line "[WARN] subscriptionEnabled = $($entitlementJson.subscriptionEnabled) (expected: false)"
      $entitlementChecksPassed = $false
    }

    # Check ECPay is disabled (no checkout enabled)
    if ($entitlementJson.paymentEnabled -eq $false) {
      Add-Line "[OK] ECPay Checkout = disabled (Cannot enable payment)"
    } else {
      Add-Line "[WARN] ECPay Checkout should be disabled"
      $entitlementChecksPassed = $false
    }

    if ($entitlementChecksPassed) {
      Add-Line "[OK] Pricing Entitlement Preview - All checks passed"
    } else {
      Add-Line "[WARN] Pricing Entitlement Preview - Some checks did not pass"
    }
  } else {
    Add-Line "[FAIL] Entitlement Status API - HTTP $($entitlementResponse.StatusCode)"
  }
} catch {
  Add-Line "[FAIL] Entitlement Status API - $($_.Exception.Message)"
}

Add-Line ""
Add-Line "Supabase Auth Scaffold checks"

$authChecksPassed = $true

# 1. Check required files exist
$requiredFiles = @(
  "src/lib/supabaseClient.js",
  "src/context/AuthContext.jsx",
  "src/components/AuthStatus.jsx",
  ".env.example"
)
foreach ($file in $requiredFiles) {
  if (Test-Path $file) {
    Add-Line "[OK] File exists: $file"
  } else {
    Add-Line "[FAIL] File missing: $file"
    $authChecksPassed = $false
  }
}

# 2. Check package.json contains @supabase/supabase-js
$packageJson = Get-Content "package.json" -Raw
if ($packageJson -match '@supabase/supabase-js') {
  Add-Line "[OK] package.json contains @supabase/supabase-js"
} else {
  Add-Line "[FAIL] package.json missing @supabase/supabase-js"
  $authChecksPassed = $false
}

# 3. Check .env.example format
$envExample = Get-Content ".env.example" -Raw -ErrorAction SilentlyContinue
if ($envExample) {
  if ($envExample -match 'VITE_SUPABASE_URL=' -and $envExample -match 'VITE_SUPABASE_ANON_KEY=') {
    Add-Line "[OK] .env.example contains VITE_SUPABASE_URL= and VITE_SUPABASE_ANON_KEY="
  } else {
    Add-Line "[FAIL] .env.example missing VITE_SUPABASE_URL= or VITE_SUPABASE_ANON_KEY="
    $authChecksPassed = $false
  }
  if ($envExample -match 'VITE_SUPABASE_URL=https://[a-z]' -or $envExample -match 'VITE_SUPABASE_ANON_KEY=eyJ[A-Za-z0-9]' -or $envExample -match 'sk-[a-zA-Z0-9]') {
    Add-Line "[FAIL] .env.example contains real credentials (VITE_SUPABASE_URL with value, VITE_SUPABASE_ANON_KEY with JWT, or sk- key)"
    $authChecksPassed = $false
  } else {
    Add-Line "[OK] .env.example has no real credentials"
  }
} else {
  Add-Line "[FAIL] .env.example file not found"
  $authChecksPassed = $false
}

# 4. Check AuthStatus.jsx for forbidden patterns
$authStatus = Get-Content "src/components/AuthStatus.jsx" -Raw -ErrorAction SilentlyContinue
if ($authStatus) {
  if ($authStatus -match 'return null') {
    Add-Line "[FAIL] AuthStatus.jsx contains 'return null'"
    $authChecksPassed = $false
  } else {
    Add-Line "[OK] AuthStatus.jsx has no 'return null'"
  }
  if ($authStatus -match 'style={{') {
    Add-Line "[FAIL] AuthStatus.jsx contains inline styles (style={{)"
    $authChecksPassed = $false
  } else {
    Add-Line "[OK] AuthStatus.jsx has no inline styles"
  }
} else {
  Add-Line "[FAIL] AuthStatus.jsx not found"
  $authChecksPassed = $false
}

# 5. Check Pricing.jsx contains required elements
$pricing = Get-Content "src/pages/Pricing.jsx" -Raw -ErrorAction SilentlyContinue
if ($pricing) {
  $pricingPassed = $true
  if ($pricing -match 'Authentication Preview') { Add-Line "[OK] Pricing.jsx contains 'Authentication Preview'" }
  else { Add-Line "[FAIL] Pricing.jsx missing 'Authentication Preview'"; $pricingPassed = $false }
  if ($pricing -match 'auth-preview-section') { Add-Line "[OK] Pricing.jsx contains 'auth-preview-section'" }
  else { Add-Line "[FAIL] Pricing.jsx missing 'auth-preview-section'"; $pricingPassed = $false }
  if ($pricing -match 'Pro locked / Not active') { Add-Line "[OK] Pricing.jsx contains 'Pro locked / Not active'" }
  else { Add-Line "[FAIL] Pricing.jsx missing 'Pro locked / Not active'"; $pricingPassed = $false }
  if ($pricing -match 'Disabled until configured') { Add-Line "[OK] Pricing.jsx contains 'Disabled until configured'" }
  else { Add-Line "[FAIL] Pricing.jsx missing 'Disabled until configured'"; $pricingPassed = $false }
  if (-not $pricingPassed) { $authChecksPassed = $false }
} else {
  Add-Line "[FAIL] Pricing.jsx not found"; $authChecksPassed = $false
}

# 6. Check AuthContext.jsx has no forbidden patterns
$authContext = Get-Content "src/context/AuthContext.jsx" -Raw -ErrorAction SilentlyContinue
if ($authContext) {
  $authCtxPassed = $true
  if ($authContext -match 'aiAccess') { Add-Line "[FAIL] AuthContext.jsx contains 'aiAccess'"; $authCtxPassed = $false }
  if ($authContext -match 'paidAccess') { Add-Line "[FAIL] AuthContext.jsx contains 'paidAccess'"; $authCtxPassed = $false }
  if ($authContext -match 'grantPro') { Add-Line "[FAIL] AuthContext.jsx contains 'grantPro'"; $authCtxPassed = $false }
  if ($authCtxPassed) { Add-Line "[OK] AuthContext.jsx has no forbidden patterns" }
  else { $authChecksPassed = $false }
} else {
  Add-Line "[FAIL] AuthContext.jsx not found"; $authChecksPassed = $false
}

if ($authChecksPassed) {
  Add-Line "[PASS] Supabase Auth Scaffold checks - All passed"
} else {
  Add-Line "[FAIL] Supabase Auth Scaffold checks - Some checks failed"
}

Add-Line ""
Add-Line "DNS check"
try {
  $dnsOutput = nslookup global-earnings-radar.vercel.app 2>&1
  Add-Line ($dnsOutput -join "`n")
} catch {
  Add-Line "[FAIL] DNS check failed: $($_.Exception.Message)"
}

Add-Line ""
Add-Line "HTTPS connectivity check"
try {
  $connection = Test-NetConnection global-earnings-radar.vercel.app -Port 443
  Add-Line "TcpTestSucceeded: $($connection.TcpTestSucceeded)"
} catch {
  Add-Line "[FAIL] HTTPS connectivity check failed: $($_.Exception.Message)"
}

$results | Set-Content $OutputPath -Encoding UTF8
Add-Line ""
Add-Line "Saved debug output to $OutputPath"

