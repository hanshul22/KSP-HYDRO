// src/data/cloudinaryMapping.js
// ─────────────────────────────────────────────────────────
// Cloudinary publicId mapping for equipment images/videos
//
// HOW TO USE:
// 1. Upload your equipment files to Cloudinary dashboard
// 2. Go to Media Library → ksp folder
// 3. Click each asset and copy its Public ID
// 4. Paste the Public IDs below (WITHOUT the "ksp/" prefix)
// 5. Import this in EquipmentsSection.jsx
// ─────────────────────────────────────────────────────────

export const equipmentCloudinaryIds = {
  // Equipment #1 - AutoScreen (image)
  Equipement1: 'Equipment1',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  
  // Equipment #2 - OLMS (image)
  Equipement2: 'Equipment2',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  
  // Equipment #3 - IoT Controller (video)
  Equipement3: 'Equipment3',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Equipement3Poster: 'Equipment3-thumbnail',  // ← Video thumbnail publicId (without ksp/)
  
  // Equipment #4 - Decanters (image)
  Equipement4: 'Equipment4',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  
  // Equipment #5 - Pumping Systems (image)
  Equipement5: 'Equipment5',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  
  // Equipment #6 - OWC (image)
  Equipement6: 'Equipment6',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  
  // Equipment #7 - DAF System (video)
  Equipement7: 'Equipment7',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Equipement7Poster: 'Equipment7-thumbnail',  // ← Video thumbnail publicId (without ksp/)
};

// IMPORTANT NOTES:
// - All publicIds should be WITHOUT the "ksp/" prefix
// - The component will automatically add "ksp/" when constructing URLs
// - Poster publicIds should match the exact filename in Cloudinary (case-sensitive, no extension)
// - Example: If Cloudinary shows "ksp/Equipment3-thumbnail.jpg", use "Equipment3-thumbnail"

// ─────────────────────────────────────────────────────────
// Product Videos & Images Mapping
// ─────────────────────────────────────────────────────────

export const productCloudinaryIds = {
  // Product #1 - Swimming Pool Systems (video)
  Prd1: 'Prd1',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd1Poster: 'prd-img1',  // ← Video thumbnail publicId (without ksp/)
  
  // Product #2 - Water Treatment Plant (image)
  Prd2: 'Prd2',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  
  // Product #3 - Sewage Treatment Plant (video)
  Prd3: 'Prd3',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd3Poster: 'prd-img3',  // ← Video thumbnail publicId (without ksp/)
  
  // Product #4 - Effluent Treatment Plant (video)
  Prd4: 'Prd4',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd4Poster: 'prd-img4',  // ← Video thumbnail publicId (without ksp/)
  
  // Product #5 - Reverse Osmosis Systems (video)
  Prd5: 'Prd5',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd5Poster: 'prd-img5',  // ← Video thumbnail publicId (without ksp/) - NOTE: Upload prd-img5 thumbnail first!
  
  // Product #6 - Lake Revival & Water Body Aeration (video)
  Prd6: 'Prd6',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd6Poster: 'prd-img6',  // ← Video thumbnail publicId (without ksp/)
  
  // Product #7 - Domestic RO Systems (image)
  Prd7: 'Prd7',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  
  // Product #8 - Ultra Filtration Systems (video)
  Prd8: 'Prd8',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd8Poster: 'prd-img8',  // ← Video thumbnail publicId (without ksp/) - NOTE: Upload prd-img8 thumbnail first!
  
  // Product #9 - Membrane Bio Reactor (video)
  Prd9: 'Prd9',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd9Poster: 'prd-img9',  // ← Video thumbnail publicId (without ksp/)
  
  // Product #10 - Bio-Activated HD Reactor (video)
  Prd10: 'Prj10',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd10Poster: 'prd-img10',  // ← Video thumbnail publicId (without ksp/)
  
  // Product #11 - Sequencing Batch Reactor (video)
  Prd11: 'Prj11',  // ← Replace with actual publicId from Cloudinary (without ksp/)
  Prd11Poster: 'prd-img11',  // ← Video thumbnail publicId (without ksp/)
};
