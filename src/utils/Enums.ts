import country_codes from '../../country-codes.json';

const _GENDER = {
  Female: 'Female',
  Male: 'Male'
};

const _DOMAIN = {
  WD: 'Web Developer',
  ML: 'ML Engineer',
  cloudArch: 'Cloud Architect',
  cloudEng: 'Cloud Engineer',
  SW: 'SW Engineer',
  DS: 'Data Science'
}

const _SKILLS = {
  PHP: 'PHP',
  SQL: 'SQL',
  JAVA: 'JAVA',
  MySQL: 'MySQL',
  Appwrite: 'Appwrite',
  Superbase: 'Superbase',
  MongoDB: 'MongoDB',
  JavaScript: 'JavaScript',
  TypeScript: 'TypeScript',
  PostgresSQL: 'PostgresSQL'
}

const SKILLS = function () {
  const results = [];
  for (let k in _SKILLS) {
    results.push({ label: k, value: _SKILLS[k as keyof typeof _SKILLS] })
  }
  return results;
};

const GENDER = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' }
];

const DOMAIN = function () {
  const results = [];
  for (let k in _DOMAIN) {
    results.push({ label: _DOMAIN[k as keyof typeof _DOMAIN], value: _DOMAIN[k as keyof typeof _DOMAIN] });
  }
  return results;
};

const COUNTRIES = function () {
  const results = [];
  for (let k  of country_codes) {
    results.push({
      label: k.name,
      value: k.dial_code,
    })
  }
  return results;
}

const PRIMARY_ROLES = [
  { label: 'Mentor', value: 'Mentor' },
  { label: 'Mentee', value: 'Mentee' }
];


export {GENDER, DOMAIN, SKILLS, COUNTRIES, PRIMARY_ROLES}