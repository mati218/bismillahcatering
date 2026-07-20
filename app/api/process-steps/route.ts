import { NextResponse } from 'next/server';
import { getProcessSteps } from '@/lib/data/processSteps';

export async function GET() {
  const steps = await getProcessSteps();
  return NextResponse.json(steps);
}
