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
 * @param pps       The pps to filter on (only for sfr content search)
 * @returns {*}     The objectives based on filtered sfrs(s)
 */
export function SFRToSecurityObjectives(sfrDB, sfr, pps = []) {
    if (pps.length != 0) {
        // get all objectives mapped to the SFR
        let objectives = jmespath.search(sfrDB, `Security_Objectives[?contains(SFRs,'${sfr}')]`);
        // filter down the objectives to only the ones for the PPs passed in
        let filtered_objectives_objects = objectives.filter(objective => Object.keys(objective.PP_Specific_Implementations).every(x => x.includes(pps)));
        // pull out names
        let filtered_objectives = filtered_objectives_objects.map(objective => objective.Name);

        return filtered_objectives.sort();
    } else {
        return jmespath.search(sfrDB, `Security_Objectives[?contains(SFRs,'${sfr}')].Name`).sort();
    }
}

/**
 * Gets the Threats based on given SFR
 * @param sfrDB     The SFRDatabase
 * @param sfr       The sfr to filter on
 * @param pps       The pps to filter on (only for sfr content search)
 * @returns {*}     The objectives based on filtered sfrs(s)
 */
export function SFRToThreats(sfrDB, sfr, pps = []) {
    let objectives = SFRToSecurityObjectives(sfrDB, sfr);

    if (objectives.length != 0) {
        let filter_str = '';
        for (let i = 0; i < objectives.length; i++) {
            filter_str = i == objectives.length - 1 ? filter_str += `contains(Security_Objectives,'${objectives[i]}')` : filter_str += `contains(Security_Objectives,'${objectives[i]}') || `;
        }

        if (pps.length != 0) {
            // get all threats mapped to the SFR
            let threats = jmespath.search(sfrDB, `Threats[?${filter_str}]`);
            // filter down the threats to only the ones for the PPs passed in
            let filtered_threats_objects = threats.filter(threat => Object.keys(threat.Threat_Implementations).every(x => x.includes(pps)));
            // pull out names
            let filtered_threats = filtered_threats_objects.map(threat => threat.Name);

            return filtered_threats.sort();
        } else {
            return jmespath.search(sfrDB, `Threats[?${filter_str}].Name`).sort();
        }
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
 * @param pps           The PPs to filter on
 * @returns {*}         The TD's tied to the SFR for all PP Specific Implementations
 */
export function sfrToTD(sfrDB, sfr, pps) {
    // only search for TDs if an SFR and PP has been selected
    if (pps && sfr) {
        let pp_implementations = jmespath.search(sfrDB, `SFRs[?Component == '${sfr}'].PP_Specific_Implementations`)[0];

        let filtered_pp_implementations = Object.keys(pp_implementations).filter(key => pps.includes(key)).reduce((obj, key) => {
            obj[key] = pp_implementations[key];
            return obj;
        }, {});

        // create array of TD's based on the user selections
        let td_number = [];
        for (const [ppName, ppMeta] of Object.entries(filtered_pp_implementations)) {
            for (const [ppMetaKey, ppMetaValue] of Object.entries(ppMeta)) {
                if (ppMetaKey == 'TD_List') {
                    ppMeta[ppMetaKey].forEach(td => {
                        td_number.push(td.TD_Number);
                    });
                }
            }
        }

        // if there are TDs, return the metadata, else return empty arr
        if (td_number.length != 0) {
            // get the TD object (which has pub date, text, etc)
            let filter_str = '';
            for (let i = 0; i < td_number.length; i++) {
                filter_str = i == td_number.length - 1 ? filter_str += `contains(TD_Number,'${td_number[i]}')` : filter_str += `contains(TD_Number,'${td_number[i]}') || `;
            }

            return jmespath.search(sfrDB, `Technical_Decisions[?${filter_str}]`);
        } else {
            return td_number;
        }
    }
}

/**
 * Get PP(s) based on user selections
 * @param sfrDB         The SFRDatabase
 * @param threat        The Threat to filter on
 * @param objective     The Objective to filter on
 * @param sfr           The SFR to filter on
 * @returns {*}         The PP's tied to the selections, for all PP Implementations
 */
export function PPFilter(sfrDB, threat, objective, sfr) {
    // PPs mapped to each selection type
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
    if (threat && !objective && !sfr) {
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
    if (objective && !threat && !sfr) {
        return objectivePPs;
    }

    // if only objective and sfr selected
    if (objective && sfr && !threat) {
        return objectivePPs.filter(x => sfrPPs.includes(x));
    }

    // if only sfr is selected
    if (sfr && !threat && !objective) {
        return sfrPPs;
    }

    // if all selections are made
    if (threat && objective && sfr) {
        return threatPPs.filter(x => objectivePPs.includes(x)).filter(y => sfrPPs.includes(y));
    }
}


/**
 * Gets the SFR content from the SFRDatabase
 * @param sfrDB The SFRDatabase
 * @returns {*} The SFR(s) content
 */
export function stringToSFR(sfrDB, searchString) {
    if (searchString) {
        let sfr_xml_mapping = {};
        let sfrs = getSfrs(sfrDB);

        // get sfr:xml mapping for all SFRs
        sfrs.forEach(sfr => {
            sfr_xml_mapping[sfr] = getSfrContent(sfrDB, sfr);
        });

        let matchedSfrToPP = {};
        let return_arr = [];
        let return_obj = {}; // will look like {'search': 'abc', 'sfr': 'abc', 'pps': []}

        for (const [sfr, ppImplementation] of Object.entries(sfr_xml_mapping)) {
            let pp_arr = [];
            for (const [pp, value] of Object.entries(ppImplementation[0])) {
                if ('XML' in value) {
                    if (value['XML'].toLowerCase().includes(searchString.toLowerCase())) {
                        pp_arr.push(pp);
                    }
                }
            }
            if (pp_arr.length != 0) {
                matchedSfrToPP[sfr] = pp_arr;
                return_obj["search"] = searchString;
                return_obj["sfr"] = sfr;
                return_obj["pp_list"] = pp_arr;
                return_arr.push(return_obj);
                return_obj = {};
            }
        }

        // if search is the sfr name itself, get that sfr (mainly for iterations, since they dont show up as a single string in the XML)
        // check if it is already in the object (for non-iteration sfrs it will already be there)
        let sfr = jmespath.search(sfrDB, `SFRs[?Name == '${searchString.toUpperCase()}']`);

        if (sfr.length != 0) {
            let sfr_modified_object = { "search": searchString, "sfr": searchString.toUpperCase(), "pp_list": Object.keys(sfr[0].PP_Specific_Implementations) }

            // only add if it is not already there
            if (!return_arr.some(elem => elem.sfr == sfr[0].Component)) {
                return_arr.push(sfr_modified_object);
            }
        }

        return return_arr.sort((a, b) => a.sfr.localeCompare(b.sfr)); // sorted alphabetically by SFR name
    } else {
        return false;
    }
}
