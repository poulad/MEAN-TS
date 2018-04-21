export interface AppConfig {
    db: string;
    sessionSecret: string;
}

export function loadAppConfigurations(): AppConfig {
    const config = <AppConfig> require('./env/' + process.env.NODE_ENV + '.js');

    config.db = process.env['APP_MONGO'] || config.db;

    return config;
}
