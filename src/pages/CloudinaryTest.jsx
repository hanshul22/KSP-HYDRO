// src/pages/CloudinaryTest.jsx
// ─────────────────────────────────────────────────────────
// Quick test page to verify Cloudinary setup
// Navigate to /cloudinary-test to see this page
// ─────────────────────────────────────────────────────────

import { OptimizedImage, OptimizedVideo } from '@/components';
import { equipmentCloudinaryIds } from '@/data/cloudinaryMapping';

const CloudinaryTest = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Cloudinary Test Page
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📋 Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Open browser console (F12)</li>
            <li>Look for &ldquo;Cloudinary URL:&rdquo; logs</li>
            <li>Copy each URL and test in browser</li>
            <li>✅ = Image/video loads correctly</li>
            <li>❌ = 404 error (publicId is wrong)</li>
          </ol>
        </div>

        <div className="space-y-8">
          {/* Test Equipment 1 - Image */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Equipment #1 - AutoScreen (Image)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              PublicId: <code className="bg-gray-100 px-2 py-1 rounded">{equipmentCloudinaryIds.Equipement1}</code>
            </p>
            <OptimizedImage
              publicId={equipmentCloudinaryIds.Equipement1}
              alt="Equipment 1"
              width={800}
              height={450}
              className="rounded-lg"
            />
          </div>

          {/* Test Equipment 3 - Video */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Equipment #3 - IoT Controller (Video)
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Video PublicId: <code className="bg-gray-100 px-2 py-1 rounded">{equipmentCloudinaryIds.Equipement3}</code>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Poster PublicId: <code className="bg-gray-100 px-2 py-1 rounded">{equipmentCloudinaryIds.Equipement3Poster}</code>
            </p>
            <OptimizedVideo
              publicId={equipmentCloudinaryIds.Equipement3}
              posterPublicId={equipmentCloudinaryIds.Equipement3Poster}
              width={800}
              height={450}
              autoPlay
              muted
              loop
              className="rounded-lg"
            />
          </div>

          {/* All Equipment IDs */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              📝 All Equipment PublicIds
            </h3>
            <div className="space-y-2">
              {Object.entries(equipmentCloudinaryIds).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <code className="text-sm bg-gray-200 px-3 py-1 rounded">{value}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="text-lg font-bold text-blue-900 mb-2">
            💡 Next Steps
          </h3>
          <ul className="list-disc list-inside space-y-1 text-blue-800">
            <li>If images/videos load: ✅ Cloudinary is working!</li>
            <li>If 404 errors: Update publicIds in <code>src/data/cloudinaryMapping.js</code></li>
            <li>Then set <code>USE_CLOUDINARY = true</code> in EquipmentsSection.jsx</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CloudinaryTest;
