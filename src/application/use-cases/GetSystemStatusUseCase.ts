// ABOUTME: Use case to retrieve current system status
// ABOUTME: Orchestrates checks for DB, API, and other services

import { SystemStatus } from '../../domain/entities/SystemStatus';
import { ISystemService } from '../ports/outbound/ISystemService';

export class GetSystemStatusUseCase {
    constructor(private readonly systemService: ISystemService) { }

    async execute(): Promise<SystemStatus> {
        const [dbStatus, apiStatus, internetStatus] = await Promise.all([
            this.systemService.checkDatabase(),
            this.systemService.checkApi(),
            this.systemService.checkInternet(),
        ]);

        const version = this.systemService.getVersion();

        return SystemStatus.create(dbStatus, apiStatus, internetStatus, version);
    }
}
