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
Test-Endpoint -Name "Disabled ECPay Checkout" -Url "$BaseUrl/api/create-ecpay-payment" -Method "POST" -ExpectedBody "ECPay checkout is not configured."

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
