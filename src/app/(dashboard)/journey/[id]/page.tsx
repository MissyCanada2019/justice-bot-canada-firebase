// src/app/(dashboard)/journey/[id]/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function JourneyDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Journey Details for Case #{params.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a static placeholder page for a single case journey.</p>
          <p>The dynamic content that was previously here was causing rendering errors.</p>
        </CardContent>
      </Card>
    </div>
  );
}
