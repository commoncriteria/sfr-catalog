import jmespath from 'jmespath';

export function getThreats(sfrDB) {
    return jmespath.search(sfrDB, "Threats[*].Name");
}

export function getSecurityObjectives(sfrDB) {
    return jmespath.search(sfrDB, "SecurityObjectives[*].Name");
}