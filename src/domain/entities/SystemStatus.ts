// ABOUTME: Captures health of critical components like DB and API

export type HealthState = 'healthy' | 'degraded' | 'down';

export interface ComponentHealth {
    status: HealthState;
    latencyMs?: number;
    message?: string;
}

export class SystemStatus {
    constructor(
        public readonly database: ComponentHealth,
        public readonly api: ComponentHealth,
        public readonly internet: ComponentHealth,
        public readonly version: string,
        public readonly timestamp: Date
    ) { }

    get isHealthy(): boolean {
        return (
            this.database.status === 'healthy' &&
            this.api.status === 'healthy' &&
            this.internet.status === 'healthy'
        );
    }

    static create(
        database: ComponentHealth,
        api: ComponentHealth,
        internet: ComponentHealth,
        version: string
    ): SystemStatus {
        return new SystemStatus(database, api, internet, version, new Date());
    }
}
