// ABOUTME: UI component to display system health status
// ABOUTME: Uses Next.js client component pattern

'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';

interface ComponentHealth {
    status: 'healthy' | 'degraded' | 'down';
}

interface SystemStatus {
    database: ComponentHealth;
    api: ComponentHealth;
    internet: ComponentHealth;
}

export function StatusBadge() {
    const { data: status, isLoading, isError } = useQuery<SystemStatus>({
        queryKey: ['system-status'],
        queryFn: async () => {
            const res = await fetch('/api/status');
            if (!res.ok) throw new Error('Failed to fetch status');
            return res.json();
        },
        refetchInterval: 30000, // Check every 30s
    });

    if (isLoading) return <Badge variant="outline">Checking System...</Badge>;
    if (isError) return <Badge variant="destructive">System Error</Badge>;

    const isHealthy =
        status?.database?.status === 'healthy' &&
        status?.api?.status === 'healthy' &&
        status?.internet?.status === 'healthy';

    return (
        <div className="flex items-center gap-2">
            <a href="/status" className="hover:opacity-80 transition-opacity">
                <Badge variant={isHealthy ? 'default' : 'destructive'} className={isHealthy ? 'bg-green-500 hover:bg-green-600' : ''}>
                    {isHealthy ? 'System Operational' : 'System Issues'}
                </Badge>
            </a>
        </div>
    );
}
