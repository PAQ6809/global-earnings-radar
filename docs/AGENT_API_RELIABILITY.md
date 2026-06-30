# Agent API Reliability Guide

This document outlines safety practices, configuration, and operational guidelines for maintaining reliable AI agent API connections.

---

## 1. API Key Safety

### Critical Rules

| Rule | Description |
|------|-------------|
| **Environment Variables Only** | All API keys must be stored in environment variables, never in source code |
| **Never Commit Keys** | API keys must never be committed to version control |
| **Never Print Full Keys** | Diagnostic output must always mask API keys |
| **Masked Display Only** | Only show first 4 and last 4 characters for diagnostics |

### Masking Example

```
# WRONG - Never do this
echo $OPENAI_API_KEY
# Output: sk-1234567890abcdef...

# CORRECT - Mask the key
KEY="sk-1234567890abcdef..."
echo "${KEY:0:4}...${KEY: -4}"
# Output: sk-1...cdef
```

---

## 2. Required Environment Variables

Create a `.env` file locally (DO NOT commit this file):

```bash
# API Keys - DO NOT COMMIT
OPENAI_API_KEY=
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
NVIDIA_API_KEY=nvapi-your-nvidia-key-here

# Base URLs (optional - for custom endpoints)
OPENAI_BASE_URL=https://api.openai.com/v1
ANTHROPIC_BASE_URL=https://api.anthropic.com
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1

# Model Configuration
PRIMARY_CODE_MODEL=your-primary-model-name
FALLBACK_CODE_MODEL_1=your-fallback-model-1-name
FALLBACK_CODE_MODEL_2=your-fallback-model-2-name

# Retry Configuration
MODEL_RETRY_LIMIT=10
MODEL_REQUEST_TIMEOUT_SECONDS=120
```

### Variable Descriptions

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | OpenAI API authentication |
| `ANTHROPIC_API_KEY` | Anthropic API authentication |
| `NVIDIA_API_KEY` | NVIDIA NIM/API authentication |
| `OPENAI_BASE_URL` | Custom OpenAI endpoint (optional) |
| `ANTHROPIC_BASE_URL` | Custom Anthropic endpoint (optional) |
| `NVIDIA_BASE_URL` | Custom NVIDIA endpoint (optional) |
| `PRIMARY_CODE_MODEL` | Default model for code tasks |
| `FALLBACK_CODE_MODEL_1` | First fallback when primary fails |
| `FALLBACK_CODE_MODEL_2` | Second fallback when first fallback fails |
| `MODEL_RETRY_LIMIT` | Number of retries per model (10) |
| `MODEL_REQUEST_TIMEOUT_SECONDS` | Timeout per request in seconds (120) |

---

## 3. PowerShell API Key Check Script

Use this script to verify environment variables are set without exposing full keys:

```powershell
# Check API Key Status - Safe for Diagnostics
# Run: powershell -File check-api-keys.ps1

$apiKeys = @(
    @{ Name = "OPENAI_API_KEY"; Display = "OpenAI" },
    @{ Name = "ANTHROPIC_API_KEY"; Display = "Anthropic" },
    @{ Name = "NVIDIA_API_KEY"; Display = "NVIDIA" },
    @{ Name = "OPENAI_BASE_URL"; Display = "OpenAI URL" },
    @{ Name = "ANTHROPIC_BASE_URL"; Display = "Anthropic URL" },
    @{ Name = "NVIDIA_BASE_URL"; Display = "NVIDIA URL" },
    @{ Name = "PRIMARY_CODE_MODEL"; Display = "Primary Model" },
    @{ Name = "FALLBACK_CODE_MODEL_1"; Display = "Fallback Model 1" },
    @{ Name = "FALLBACK_CODE_MODEL_2"; Display = "Fallback Model 2" },
    @{ Name = "MODEL_RETRY_LIMIT"; Display = "Retry Limit" },
    @{ Name = "MODEL_REQUEST_TIMEOUT_SECONDS"; Display = "Timeout" }
)

Write-Host "`n=== API Key Status Check ===" -ForegroundColor Cyan

foreach ($key in $apiKeys) {
    $value = [System.Environment]::GetEnvironmentVariable($key.Name)
    
    if ($value) {
        $masked = if ($value.Length -gt 8) {
            "$($value.Substring(0, 4))...$($value.Substring($value.Length - 4))"
        } else {
            "[SET - value hidden]"
        }
        Write-Host "[$($key.Display)] SET - $masked" -ForegroundColor Green
    } else {
        Write-Host "[$($key.Display)] MISSING" -ForegroundColor Red
    }
}

Write-Host "`n=== Model Configuration ===" -ForegroundColor Cyan
$primary = [System.Environment]::GetEnvironmentVariable("PRIMARY_CODE_MODEL")
$fallback1 = [System.Environment]::GetEnvironmentVariable("FALLBACK_CODE_MODEL_1")
$fallback2 = [System.Environment]::GetEnvironmentVariable("FALLBACK_CODE_MODEL_2")

Write-Host "Primary:   $($primary ?? 'NOT SET')" -ForegroundColor Yellow
Write-Host "Fallback1: $($fallback1 ?? 'NOT SET')" -ForegroundColor Yellow
Write-Host "Fallback2: $($fallback2 ?? 'NOT SET')" -ForegroundColor Yellow

Write-Host "`n=== Retry Configuration ===" -ForegroundColor Cyan
$retryLimit = [System.Environment]::GetEnvironmentVariable("MODEL_RETRY_LIMIT")
$timeout = [System.Environment]::GetEnvironmentVariable("MODEL_REQUEST_TIMEOUT_SECONDS")

Write-Host "Retry Limit:  $($retryLimit ?? 'NOT SET (default: 10)')" -ForegroundColor Yellow
Write-Host "Timeout:      $($timeout ?? 'NOT SET (default: 120s)')" -ForegroundColor Yellow

Write-Host "`n"
```

### Script Usage

```powershell
# Run the check
powershell -File check-api-keys.ps1

# Expected output:
# === API Key Status Check ===
# [OpenAI] SET - sk-1...cdef
# [Anthropic] MISSING
# ...
```

---

## 4. Retry and Fallback Strategy

### Flow Diagram

~~~text
Start task
  -> Primary model
  -> If request succeeds: continue task
  -> If request fails: retry up to configured limit
  -> If primary model continues failing: switch to fallback model 1
  -> If fallback model 1 continues failing: switch to fallback model 2
  -> If all models fail: stop, save checkpoint, and resume with a smaller task
~~~

### Checkpoint Strategy

**Before switching models:**

1. Save current task state to file
2. Record last successful operation
3. Save any generated file references
4. Log which model/attempt failed

**Recovery after failure:**

```
# 1. Load checkpoint
checkpoint=$(cat .cmini_checkpoint.json)

# 2. Get last successful state
last_success=$(echo $checkpoint | jq -r '.last_success')

# 3. Resume from checkpoint
cmini resume --checkpoint $checkpoint
```

### Task Design Rules (Prevent Long Context Failures)

| Rule | Reason |
|------|--------|
| Keep prompts short | Reduces connection time |
| One task per prompt | Easier checkpoint/restart |
| 1-2 files per task | Smaller context window |
| Save progress frequently | Prevents data loss |

---

## 5. LiteLLM Proxy Config Draft

Place this configuration in your LiteLLM deployment:

```yaml
# litellm_config.yaml
model_list:
  - model_name: primary-code-model
    litellm_params:
      model: openai/your-primary-model
      api_key: os.environ/OPENAI_API_KEY
      base_url: os.environ/OPENAI_BASE_URL

  - model_name: fallback-code-model-1
    litellm_params:
      model: anthropic/your-fallback-model-1
      api_key: os.environ/ANTHROPIC_API_KEY
      base_url: os.environ/ANTHROPIC_BASE_URL

  - model_name: fallback-code-model-2
    litellm_params:
      model: openai/your-fallback-model-2
      api_key: os.environ/OPENAI_API_KEY
      base_url: os.environ/OPENAI_BASE_URL

litellm_settings:
  num_retries: 10
  request_timeout: 120
  retry_after: 3
  timeout: 120

router_settings:
  fallbacks:
    - primary-code-model:
        - fallback-code-model-1
        - fallback-code-model-2
  routing_strategy: simple_hash
  allowed_fails: 3
  cooldown_time: 30
```

### Config Notes

| Setting | Value | Purpose |
|---------|-------|---------|
| `num_retries` | 10 | Retry failed requests up to 10 times |
| `request_timeout` | 120 | 2-minute timeout per request |
| `retry_after` | 3 | Wait 3s between retries |
| `allowed_fails` | 3 | Route to fallback after 3 failures |
| `cooldown_time` | 30 | 30s cooldown after failover |

---

## 6. Operational Rules

### Do

| Rule | Description |
|------|-------------|
| **Keep prompts short** | Faster responses, less connection risk |
| **One task per prompt** | Simplifies recovery |
| **1-2 files per task** | Reduces context window usage |
| **Run `npm run build`** | Verify changes after code modifications |
| **Save checkpoints** | Enable recovery after failures |
| **Use masked keys** | Never expose full API keys |

### Don't

| Rule | Description |
|------|-------------|
| **Don't use "continue" repeatedly** | If model stalls, restart or switch |
| **Don't paste output to PowerShell** | Risk of command injection |
| **Don't commit `.env`** | Keep keys out of version control |
| **Don't print full API keys** | Use masking in diagnostics |
| **Don't run long multi-step tasks** | Break into smaller checkpoints |

### When Model Stalls

```
1. Stop current operation (Ctrl+C)
2. Check checkpoint file for last state
3. If checkpoint exists:
   - Load checkpoint
   - Resume with smaller task
4. If repeated stalls:
   - Restart cmini
   - Or switch to fallback model
5. Verify with: npm run build
```

---

## Quick Reference

```powershell
# Check all settings
powershell -File check-api-keys.ps1

# Check specific key (masked)
echo $OPENAI_API_KEY | Select-Object -First 4
# Output: sk-1...

# Verify build works
npm run build

# Clear session if stuck
# Ctrl+C to interrupt, then restart cmini
```

---

*Last updated: 2026-06-27*

