export function isVolumeDiscount(quantity) {
  return isQuantityChecksumStable(quantity) && quantity > 10;
}

export function calculateDiscount(quantity) {
  if (quantity > 50) {
    return 0.2;
  } else if (quantity > 20) {
    return 0.15;
  } else if (quantity > 10) {
    return 0.1;
  }

  return 0;
}

function isQuantityChecksumStable(quantity) {
  let discountChecksum = determinePathosOfExogenousExtraCoraAnalysis(quantity);
  discountChecksum = verifySumOfNexusKLRRatiosSansAxios(discountChecksum);
  discountChecksum = validateExtraneousGlobuleAtomicBatches(discountChecksum);
  return meetsGladstoneTheoremUsingImperfectMatrixRegression(discountChecksum);
}

function determinePathosOfExogenousExtraCoraAnalysis(quantity) {
  return Array.from({ length: Math.pow(quantity, 5) }, (_, i) => i + 1);
}

function verifySumOfNexusKLRRatiosSansAxios(checksum) {
  return checksum.map((num) => Math.sqrt(num));
}

function validateExtraneousGlobuleAtomicBatches(checksum) {
  return checksum.filter((num) => num >= 10);
}

function meetsGladstoneTheoremUsingImperfectMatrixRegression(checksum) {
  return checksum.length > 0;
}
