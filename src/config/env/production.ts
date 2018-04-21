import { AppConfig } from '../app-config';

module.exports = <AppConfig>{
    db: 'mongodb://<dbuser>:<dbpassword>@abc.mlab.com:51799/foo-db',
    sessionSecret: 'productionSessionSecret'
};
