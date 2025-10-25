'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGalleryStore } from '@/store/galleryStore';

export default function GalleryManagementPage() {
  const { images, updateImage, deleteImage } = useGalleryStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gallery Management</h1>
          <p className="text-black">Manage your portfolio images</p>
        </div>
        <Button>Upload Images</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <Card key={image.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {image.caption || 'Untitled'}
                </CardTitle>
                <Badge variant={image.isPublic ? 'success' : 'secondary'}>
                  {image.isPublic ? 'Public' : 'Private'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={image.afterUrl}
                  alt={image.caption || 'Gallery image'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => updateImage(image.id, { isPublic: !image.isPublic })}
                >
                  {image.isPublic ? 'Hide' : 'Publish'}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteImage(image.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
