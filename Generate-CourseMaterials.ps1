if (!(Test-Path .\.materials)) {
    mkdir .\.materials
}

Remove-Item .\.materials\* -Recurse -Force

$CommonPaths = @(
    # Add additional shared paths for each module
    ".\LICENSE",
    ".\README.md",
    ".materials\demo.zip"
)

$DemoPaths = @(
    ".\demo\src",
    ".\demo\public",
    ".\demo\README.md",
    ".\demo\package.json",
    ".\demo\package-lock.json",
    ".\demo\.gitignore",
    ".\demo\.vscode",
    ".\demo\.eslintrc.json"
)

function Compress($destinationPath, $pathsToCompress) {
    Compress-Archive -DestinationPath $destinationPath -Update -Path $pathsToCompress
}

Compress ".\.materials\demo.zip" $DemoPaths
Compress ".\.materials\Module-2.zip" ($CommonPaths + ".\Module 2")
Compress ".\.materials\Module-4.zip" ($CommonPaths + ".\Module 4")
Compress ".\.materials\Module-5.zip" ($CommonPaths + ".\Module 5")
Compress ".\.materials\Module-6.zip" ($CommonPaths + ".\Module 6")
Compress ".\.materials\Module-7.zip" ($CommonPaths + ".\Module 7")