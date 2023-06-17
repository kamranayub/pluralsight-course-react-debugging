if (!(Test-Path .\.materials)) {
    mkdir .\.materials
}

$CommonPaths = @(
    # Add additional shared paths for each module
    ".\LICENSE",
    ".\README.md"
)

Compress-Archive -DestinationPath .\.materials\Module-2.zip -Update -Path ($CommonPaths + @(
    ".\Module 2"
))
Compress-Archive -DestinationPath .\.materials\Module-3.zip -Update -Path ($CommonPaths + @(
    ".\Module 3"
))
Compress-Archive -DestinationPath .\.materials\Module-4.zip -Update -Path ($CommonPaths + @(
    ".\Module 4"
))
Compress-Archive -DestinationPath .\.materials\Module-6.zip -Update -Path ($CommonPaths + @(
    ".\Module 6"
))
Compress-Archive -DestinationPath .\.materials\Module-7.zip -Update -Path ($CommonPaths + @(
    ".\Module 7"
))