$x = Get-Content 'C:\Users\M Zohaib Hazoor\.gemini\antigravity-ide\brain\3740bc7b-5f1e-412d-b5bb-1dbf6ea60a9c\.system_generated\steps\206\content.md' -Raw
$dotIdx = $x.IndexOf('site-dot-overlay')
if ($dotIdx -ge 0) {
    $start = [Math]::Max(0, $dotIdx - 50)
    $len = [Math]::Min(400, $x.Length - $start)
    Write-Output $x.Substring($start, $len)
}
