$ErrorActionPreference = "Continue"

$root = Split-Path -Parent $PSScriptRoot
$docsDir = Join-Path $root "docs"
$outFile = Join-Path $docsDir "debug-last-run.txt"

New-Item -ItemType Directory -Force -Path $docsDir | Out-Null

$lines = New-Object System.Collections.Generic.List[string]

function Add-Line {
  param([string]$Text)
  $lines.Add($Text)
  Write-Host $Text
}

function Test-SiteUrl {
  param(
    [string]$Method,
    [string]$Url
  )

  Add-Line ""
  Add-Line "Testing [$Method] $Url"

  try {
    if ($Method -eq "POST") {
      $response = Invoke-WebRequest -Uri $Url -Method POST -UseBasicParsing -TimeoutSec 20
    } else {
      $response = Invoke-WebRequest -Uri $Url -Method GET -UseBasicParsing -TimeoutSec 20
    }

    $contentType = $response.Headers["Content-Type"]
    $length = 0
    if ($null -ne $response.Content) {
      $length = $response.Content.Length
    }

    Add-Line "StatusCode: $($response.StatusCode)"
    Add-Line "ContentType: $contentType"
    Add-Line "Length: $length"
  } catch {
    Add-Line "ERROR: $($_.Exception.Message)"
  }
}

Add-Line "Global Earnings Radar Site Debug"
Add-Line "GeneratedAt: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')"
Add-Line "Machine: $env:COMPUTERNAME"
Add-Line ""

$targets = @(
  @{ Method = "GET"; Url = "https://global-earnings-radar.vercel.app/" },
  @{ Method = "GET"; Url = "https://global-earnings-radar.vercel.app/pricing" },
  @{ Method = "GET"; Url = "https://global-earnings-radar.vercel.app/market" },
  @{ Method = "GET"; Url = "https://global-earnings-radar.vercel.app/api/market-quote?symbol=NVDA" },
  @{ Method = "GET"; Url = "https://global-earnings-radar.vercel.app/api/market-search?q=tesla" },
  @{ Method = "POST"; Url = "https://global-earnings-radar.vercel.app/api/create-ecpay-payment" }
)

foreach ($target in $targets) {
  Test-SiteUrl -Method $target.Method -Url $target.Url
}

Add-Line ""
Add-Line "DNS Lookup"
try {
  $dns = nslookup global-earnings-radar.vercel.app 2>&1
  foreach ($line in $dns) {
    Add-Line $line.ToString()
  }
} catch {
  Add-Line "DNS ERROR: $($_.Exception.Message)"
}

Add-Line ""
Add-Line "HTTPS Connectivity"
try {
  $net = Test-NetConnection global-earnings-radar.vercel.app -Port 443
  Add-Line "ComputerName: $($net.ComputerName)"
  Add-Line "RemoteAddress: $($net.RemoteAddress)"
  Add-Line "RemotePort: $($net.RemotePort)"
  Add-Line "InterfaceAlias: $($net.InterfaceAlias)"
  Add-Line "SourceAddress: $($net.SourceAddress)"
  Add-Line "TcpTestSucceeded: $($net.TcpTestSucceeded)"
} catch {
  Add-Line "NET ERROR: $($_.Exception.Message)"
}

$lines | Set-Content -Path $outFile -Encoding UTF8

Add-Line ""
Add-Line "Saved debug output to docs/debug-last-run.txt"
