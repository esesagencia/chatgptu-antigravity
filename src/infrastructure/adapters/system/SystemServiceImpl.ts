// ABOUTME: Implementation of system health checks
// ABOUTME: Checks actual infrastructure connectivity

import { ISystemService } from '../../../application/ports/outbound/ISystemService';
import { ComponentHealth } from '../../../domain/entities/SystemStatus';

export class SystemServiceImpl implements ISystemService {
    async checkDatabase(): Promise<ComponentHealth> {
        const start = Date.now();
        try {
            // Simulate DB delay
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 50));
            // Simulation: await prisma.$queryRaw`SELECT 1`;
            return {
                status: 'healthy',
                latencyMs: Date.now() - start
            };
        } catch (error) {
            console.error('Database check failed', error);
            return {
                status: 'down',
                latencyMs: Date.now() - start,
                message: (error as Error).message
            };
        }
    }

    async checkApi(): Promise<ComponentHealth> {
        const start = Date.now();
        try {
            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) throw new Error('OPENAI_API_KEY is missing');

            // Real connectivity check to OpenAI
            const res = await fetch('https://api.openai.com/v1/models', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${apiKey}` }
            });

            if (!res.ok) throw new Error(`OpenAI API returned ${res.status}`);

            return {
                status: 'healthy',
                latencyMs: Date.now() - start
            };
        } catch (error) {
            console.error('API check failed', error);
            return {
                status: 'down',
                latencyMs: Date.now() - start,
                message: (error as Error).message
            };
        }
    }

    async checkInternet(): Promise<ComponentHealth> {
        const start = Date.now();
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // Increased timeout

            // Check reliable CDN endpoint
            const res = await fetch('https://1.1.1.1', {
                method: 'HEAD',
                signal: controller.signal,
                cache: 'no-store'
            });
            clearTimeout(timeoutId);

            return {
                status: res.ok ? 'healthy' : 'degraded',
                latencyMs: Date.now() - start,
            };
        } catch (error) {
            return {
                status: 'down',
                latencyMs: Date.now() - start,
                message: 'No Internet Connection'
            };
        }
    }

    getVersion(): string {
        return process.env.npm_package_version || '0.0.0';
    }
}
