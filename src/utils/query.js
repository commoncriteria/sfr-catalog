// Imports
import jmespath from 'jmespath';

/**
 * Gets the Threats from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The Threats
 */
export function getThreats(sfrDB) {
    return jmespath.search(sfrDB, "Threats[*].Name");
}

/**
 * Gets the filtered Objectives
 * @param sfrDB The SFRDatabase
 * @param threat The Threat to filter on
 * @returns {*} The Objectives based on filtered Threat(s)
 */
export function ThreatToSecurityObjective(sfrDB, threat) {
    return jmespath.search(sfrDB, `Threats[?Name == '${threat}'].SecurityObjectives[]`);
}

/**
 * Gets the Security Objectives from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The Security Objectives
 */
export function getSecurityObjectives(sfrDB) {
    return jmespath.search(sfrDB, "SecurityObjectives[*].Name");
}

/**
 * Gets the SFRs from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The SFRs
 */
export function getSfrs(sfrDB) {
    return jmespath.search(sfrDB, "SFRs[*].Name");
}