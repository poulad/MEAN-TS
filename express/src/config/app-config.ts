export interface AppConfig {
    db: string;
    sessionSecret: string;
}

export function loadAppConfigurations(): AppConfig {
    return require('./env/' + process.env.NODE_ENV + '.js');
}
