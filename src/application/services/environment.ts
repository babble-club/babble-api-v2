export enum LocalEnvironment {
  Local = 'local',
  Test = 'test',
}

export enum DevelopmentEnvironment {
  Gin = 'gin',
  Vodka = 'vodka',
  Martini = 'martini',
  Tequila = 'tequila',
  Brandy = 'brandy',
  Lemon = 'lemon',
  Mint = 'mint',
  Mojito = 'mojito',
  Nuke = 'nuke',
  Olive = 'olive',
  Tonic = 'tonic',
}

export enum PreProductionEnvironment {
  R2Internal = 'r2-internal',
  UAT = 'uat',
}

export enum ProductionEnvironment {
  Production = 'production',
  Prod = 'prod',
}

//Union type to represent all possible Environment values
export type Environment =
  | LocalEnvironment
  | DevelopmentEnvironment
  | PreProductionEnvironment
  | ProductionEnvironment;

// An array to store all possible environment values for validation
const allEnvironments = [
  ...Object.values(LocalEnvironment),
  ...Object.values(DevelopmentEnvironment),
  ...Object.values(PreProductionEnvironment),
  ...Object.values(ProductionEnvironment),
];

const DEFAULT_ENVIRONMENT = LocalEnvironment.Local; // Default environment as constant

/**
 * Gets the current application environment from process.env.NODE_ENV,
 * normalizing it to lowercase and trimming whitespace.
 *
 * Defaults to 'local' if NODE_ENV is not set or is invalid.
 *
 * @returns {Environment} The current application environment.
 */
const getCurrentEnvironment = (): Environment => {
  const env = process.env.NODE_ENV || DEFAULT_ENVIRONMENT; // Default to 'local' if not set

  const normalizedEnv = env.toString().toLowerCase().trim();

  if (isValidEnvironment(normalizedEnv)) {
    return normalizedEnv as Environment;
  }

  console.warn(`Invalid NODE_ENV: "${env}". Defaulting to "${DEFAULT_ENVIRONMENT}".`);
  return DEFAULT_ENVIRONMENT;
};

const isValidEnvironment = (value: string): value is Environment => {
  return allEnvironments.includes(value as Environment);
};

const isEnvironmentOfType = <T extends Environment>(environmentEnum: {
  [key: string]: T;
}): boolean => {
  const currentEnv = getCurrentEnvironment();
  return Object.values(environmentEnum).includes(currentEnv as T);
};

export const Environment = {
  isLocal(): boolean {
    return isEnvironmentOfType(LocalEnvironment);
  },
  isDevelopment(): boolean {
    return isEnvironmentOfType(DevelopmentEnvironment);
  },
  isPreProduction(): boolean {
    return isEnvironmentOfType(PreProductionEnvironment);
  },
  isProduction(): boolean {
    return isEnvironmentOfType(ProductionEnvironment);
  },
  getCurrentEnvironment(): Environment {
    return getCurrentEnvironment();
  },
};
