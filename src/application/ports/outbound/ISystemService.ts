// ABOUTME: Port for retrieving system status from infrastructure
// ABOUTME: Abstraction for health checks

import { ComponentHealth } from '../../../domain/entities/SystemStatus';

export interface ISystemService {
    checkDatabase(): Promise<ComponentHealth>;
    checkApi(): Promise<ComponentHealth>;
    checkInternet(): Promise<ComponentHealth>;
    getVersion(): string;
}
