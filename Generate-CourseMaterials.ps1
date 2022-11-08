if (!(Test-Path .\.materials)) {
    mkdir .\.materials
}

$CommonPaths = @(
    # Add additional shared paths for each module
    ".\LICENSE",
    ".\README.md"
)

# Example: Module 1
Compress-Archive -DestinationPath .\.materials\Module-1.zip -Update -Path ($CommonPaths + @(
    ".\Module 1"
))
