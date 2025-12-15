// ABOUTME: Detailed status dashboard page
// ABOUTME: Displays health of all system components with latency

'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Database, Globe, Server } from 'lucide-react';

interface ComponentHealth {
    status: 'healthy' | 'degraded' | 'down';
    latencyMs?: number;
    message?: string;
}

interface SystemStatus {
    database: ComponentHealth;
    api: ComponentHealth;
    internet: ComponentHealth;
    version: string;
    timestamp: string;
}

function StatusCard({
    title,
    icon: Icon,
    health
}: {
    title: string;
    icon: any;
    health?: ComponentHealth
}) {
    if (!health) return <div className="animate-pulse h-32 bg-muted rounded-lg" />;

    const isHealthy = health.status === 'healthy';
    const isDown = health.status === 'down';

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold capitalize flex items-center gap-2">
                    {health.status}
                    <Badge variant={isHealthy ? 'default' : isDown ? 'destructive' : 'secondary'}>
                        {isHealthy ? 'Operational' : isDown ? 'Outage' : 'Degraded'}
                    </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {health.latencyMs ? `${health.latencyMs}ms latency` : 'Latency unknown'}
                </p>
                {health.message && (
                    <p className="text-xs text-red-500 mt-1">
                        {health.message}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export default function StatusPage() {
    const { data: status, isLoading, isError } = useQuery<SystemStatus>({
        queryKey: ['system-status-full'],
        queryFn: async () => {
            const res = await fetch('/api/status');
            if (!res.ok) throw new Error('Failed to fetch status');
            return res.json();
        },
        refetchInterval: 10000,
    });

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">System Status</h2>
                <p className="text-muted-foreground">Real-time monitoring of application infrastructure.</p>
                {status?.timestamp && (
                    <p className="text-xs text-muted-foreground mt-2">Last updated: {new Date(status.timestamp).toLocaleString()}</p>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatusCard
                    title="Database"
                    icon={Database}
                    health={status?.database}
                />
                <StatusCard
                    title="AI API Service"
                    icon={Server}
                    health={status?.api}
                />
                <StatusCard
                    title="Internet Connectivity"
                    icon={Globe}
                    health={status?.internet}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span className="text-sm font-medium">Version:</span>
                        <span className="text-sm text-muted-foreground">{status?.version || 'Unknown'}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
