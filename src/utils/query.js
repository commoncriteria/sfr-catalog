// Imports
import jmespath from 'jmespath';
import { object } from 'prop-types';

/**
 * Gets the Threats from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The Threats
 */
export function getThreats(sfrDB) {
    return jmespath.search(sfrDB, "Threats[*].Name");
}

/**
 * Gets the Security Objectives from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The Security Objectives
 */
export function getSecurityObjectives(sfrDB) {
    return jmespath.search(sfrDB, "Security_Objectives[*].Name");
}

/**
 * Gets the SFRs from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The SFRs
 */
export function getSfrs(sfrDB) {
    return jmespath.search(sfrDB, "SFRs[*].Name");
}

/**
 * Gets the PPs from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The PPs
 */
export function getPPs(sfrDB) {
    return jmespath.search(sfrDB, `"Protection_Profiles"[*].Name`);
}

/**
 * Gets the filtered Objectives
 * @param sfrDB     The SFRDatabase
 * @param threat    The Threat to filter on
 * @returns {*}     The Objectives based on filtered Threat(s)
 */
export function ThreatToSecurityObjective(sfrDB, threat) {
    return jmespath.search(sfrDB, `Threats[?Name == '${threat}'].Security_Objectives[]`);
}

/**
 * Gets the filtered SFRs
 * @param sfrDB     The SFRDatabase
 * @param threat    The Objective to filter on
 * @returns {*}     The SFRs based on filtered Objectives(s)
 */
export function SecurityObjectiveToSFR(sfrDB, objective) {
    return jmespath.search(sfrDB, `Security_Objectives[?Name == '${objective}'].SFRs[]`);
}

/**
 * Gets the SFR content from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The SFR(s) content
 */
export function getSfrContent(sfrDB, sfr) {
    return jmespath.search(sfrDB, `SFRs[?Name == '${sfr}'].PP_Specific_Implementations`);
}

/**
 * Gets the Threat content from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The Threat(s) content
 */
export function getThreatContent(sfrDB, threat) {
    return jmespath.search(sfrDB, `Threats[?Name == '${threat}'].Threat_Implementations`);
}

/**
 * Gets the SecurityObjectives content from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The SecurityObjectives(s) content
 */
export function getSecurityObjectiveContent(sfrDB, objective) {
    return jmespath.search(sfrDB, `Security_Objectives[?Name == '${objective}'].PP_Specific_Implementations`);
}

/**
 * Gets the Objectives based on given SFR
 * @param sfrDB     The SFRDatabase
 * @param sfr       The sfr to filter on
 * @returns {*}     The objectives based on filtered sfrs(s)
 */
export function SFRToSecurityObjectives(sfrDB, sfr) {
    return jmespath.search(sfrDB, `Security_Objectives[?contains(SFRs,'${sfr}')].Name`);
}

/**
 * Gets the Threats based on given SFR
 * @param sfrDB     The SFRDatabase
 * @param sfr       The sfr to filter on
 * @returns {*}     The objectives based on filtered sfrs(s)
 */
export function SFRToThreats(sfrDB, sfr) {
    let objectives = SFRToSecurityObjectives(sfrDB, sfr);

    if (objectives.length != 0) {
        let filter_str = '';
        for (let i = 0; i < objectives.length; i++) {
            filter_str = i == objectives.length - 1 ? filter_str += `contains(Security_Objectives,'${objectives[i]}')` : filter_str += `contains(Security_Objectives,'${objectives[i]}') || `;
        }

        return jmespath.search(sfrDB, `Threats[?${filter_str}].Name`);
    } else {
        return false;
    }
}

/**
 * Gets the SFRs based on given Threat
 * @param sfrDB     The SFRDatabase
 * @param threat    The threat to filter on
 * @returns {*}     The objectives based on filtered sfrs(s)
 */
export function ThreatToSFRs(sfrDB, threat) {
    // convert threat to objectives
    let objectives = ThreatToSecurityObjective(sfrDB, threat);

    if (objectives.length != 0) {
        // convert objectives to SFRs
        let filter_str = '';
        for (let i = 0; i < objectives.length; i++) {
            filter_str = i == objectives.length - 1 ? filter_str += `contains(Name,'${objectives[i]}')` : filter_str += `contains(Name,'${objectives[i]}') || `;
        }

        return jmespath.search(sfrDB, `Security_Objectives[?${filter_str}].SFRs[]`);
    } else {
        return false;
    }
}

/**
 * Gets the Threats based on a given Objective
 * @param sfrDB         The SFRDatabase
 * @param objective     The Objective to filter on
 * @returns {*}         The SFRs based on filtered Objectives(s)
 */
export function SecurityObjectiveToThreats(sfrDB, objective) {
    return jmespath.search(sfrDB, `Threats[?contains(Security_Objectives,'${objective}')].Name`);
}

/**
 * Gets a TD based on a given SFR
 * @param sfrDB         The SFRDatabase
 * @param sfr           The SFR to filter on
 * @returns {*}         The TD's tied to the SFR for all PP Specific Implementations
 */
export function sfrToTD(sfrDB, sfr) {
    return jmespath.search(sfrDB, `SFRs[?Component == '${sfr}'].PP_Specific_Implementations[]`);
}


export function PPFilter(sfrDB, threat, objective, sfr) {
    let threatPPs = [];
    let objectivePPs = [];
    let sfrPPs = [];

    if (!threat && !objective && !sfr) {
        return null;
    }


    if (threat) {
        threatPPs = jmespath.search(sfrDB, `Threats[?Name == '${threat}'].Threat_Implementations | keys([0])`);
    }

    if (objective) {
        objectivePPs = jmespath.search(sfrDB, `Security_Objectives[?Name == '${objective}'].PP_Specific_Implementations | keys([0])`);
    }

    if (sfr) {
        sfrPPs = jmespath.search(sfrDB, `SFRs[?Name == '${sfr}'].PP_Specific_Implementations | keys([0])`);
    }

    // if only threat is selected
    if (threat && !(objective && sfr)) {
        return threatPPs;
    }

    // if only threat and objective selected
    if (threat && objective && !sfr) {
        return threatPPs.filter(x => objectivePPs.includes(x));
    }

    // if only threat and sfr selected
    if (threat && sfr && !objective) {
        return threatPPs.filter(x => sfrPPs.includes(x));
    }

    // if only objective is selected
    if (objective && !(threat && sfr)) {
        return objectivePPs;
    }

    // if only objective and sfr selected
    if (objective && sfr && !threat) {
        return objectivePPs.filter(x => sfrPPs.includes(x));
    }

    // if only sfr is selected
    if (sfr && !(threat && objective)) {
        return sfrPPs;
    }

    // if all selections are made
    if (threat && objective && sfr) {
        return threatPPs.filter(x => objectivePPs.includes(x)).filter(y => sfrPPs.includes(y));
    }
}