// Microcosm Ecosystem World-Space Scale System Constants
// Seabed Diameter = 3.4 units (CircleGeometry radius 1.7)
// Glass Sphere Diameter = 5.6 units (SphereGeometry radius 2.8)

export const ECOSYSTEM_WORLD_SCALES = {
  SEABED_RADIUS: 1.7,
  SEABED_DIAMETER: 3.4,
  GLASS_SPHERE_RADIUS: 2.8,
  GLASS_SPHERE_DIAMETER: 5.6,

  // Fish: 13.2% of seabed diameter (0.45 units) - strictly in 10-20% range
  FISH_TARGET_SIZE: 0.45,

  // Rock: 17.6% of seabed diameter (0.60 units)
  ROCK_TARGET_SIZE: 0.60,

  // Plant / Seaweed: 29.4% of seabed diameter (1.00 units)
  PLANT_TARGET_SIZE: 1.00,

  // Sunken Artifacts (Boat / Dock): 26.5% of seabed diameter (0.90 units)
  ARTIFACT_TARGET_SIZE: 0.90,

  // Small Props (Lure / Fishing Rod): 11.7% of seabed diameter (0.40 units)
  PROP_TARGET_SIZE: 0.40,
} as const;
