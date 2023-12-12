/* ----------- SUN FRAG SHADER FOR SHADER_TOY ----------- */
const vec3 sphereCenter = vec3(0.0, 0.0, -0.3); 
const float sphereRadius = 0.05;
// ASSUMING CAM POSITION 0
// vec3 cameraPosition = vec3(0.0, 0.0, 0.0);
uniform vec2 resolution;
const float fov = 49.0;
const float MAX = 1000000.0;
const float PI = 3.1415926535897932384626433832795;

vec3 get_ray_dir(float fov, vec2 resolution, vec2 fragCoord) {
  float aspect_ratio = resolution.x / resolution.y;

  vec2 frag_coord_center = fragCoord - resolution * 0.5;
  
  vec2 pixel_coord_center = frag_coord_center / (resolution * 0.5);

  pixel_coord_center.x *= aspect_ratio;

  float z = 1.0 / tan(radians(fov * 0.5));

  return vec3(pixel_coord_center, z);
}

float ray_intersects_sphere(vec3 ray_dir, float sphere_radius, vec3 sphere_center) {
  /*
    Parametric equation for ray X = xo + xd*t Y = yo + yd*t Z = zo + zd*t
    (x-a)^2 + (y-b)^2 + (z-c)^2 = r^2 equation for sphere. Replace x, y, z with parametric equation

    A = (xd^2 + yd^2 + zd^2) // same as dot product of itself
    B = [2[xd * (xo - a) + yd * (yo - b) + zd *(zo - c)]]
    C = [(xo - a)^2 + (yo - b)^2 + (zo - c^)2 - r^2]
  */
  float a = dot(ray_dir, ray_dir);
  float b = 2.0 * dot(ray_dir, sphere_center);
  float c = dot(sphere_center, sphere_center) - sphere_radius * sphere_radius;

  float discriminant = b * b - 4.0 * a * c;
  if (discriminant < 0.0) {
    return -1.0;
  } else {
    return (-b - sqrt(discriminant)) / (2.0 * a);
  }
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 ray_dir = get_ray_dir(fov, iResolution.xy, fragCoord.xy);
  
  float t = ray_intersects_sphere(ray_dir, sphereRadius, sphereCenter);

  vec3 hit_point = normalize(sphereCenter + ray_dir * t);
    
  vec3 sphere_normal = normalize(hit_point - sphereCenter);
  
  vec3 light_dir = vec3(0.3, 1.0, -0.4);
  
  float d = max(dot(hit_point, light_dir), 0.0);
  
  float oscillating_val = 0.5 * sin(iTime * 0.5 * PI);
        
  light_dir.z -= oscillating_val;
    
  float light_intensity = dot(light_dir, sphere_normal);
  
  vec3 color_red = vec3(1.0, 0.7, 0.0) * light_intensity;
  
  if(t > 0.0) {
      fragColor = vec4(color_red * d, 1.0);
      
      return;
  }
  
  vec2 uv = fragCoord/iResolution.xy;
  
  fragColor = vec4(vec3(uv, 0.9), 1.0);
}
/* ----------- SUN FRAG SHADER FOR SHADER_TOY ----------- */
