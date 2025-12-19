// ABOUTME: API Route for system status check
// ABOUTME: Exposes GetSystemStatusUseCase

import { NextResponse } from 'next/server';
import { GetSystemStatusUseCase } from '@/application/use-cases/GetSystemStatusUseCase';
import { SystemServiceImpl } from '@/infrastructure/adapters/system/SystemServiceImpl';

export const dynamic = 'force-dynamic';

export async function GET() {
    const systemService = new SystemServiceImpl();
    const getSystemStatus = new GetSystemStatusUseCase(systemService);

    try {
        const status = await getSystemStatus.execute();
        return NextResponse.json(status);
    } catch (error) {
        console.error('Failed to get system status:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
