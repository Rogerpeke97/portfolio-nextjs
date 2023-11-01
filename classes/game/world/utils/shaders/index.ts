export function vertexShaderParticle(){
  return `
    varying vec3 vColor;
    attribute vec3 customParticleColor;
    void main(){
      vColor = customParticleColor;
      //we cast the vec3 attribute position into a vec4
      //why .w is 1 is a topic on its own, but it represents 
      //a position in space, versus a direction
      vec4 _position = vec4(position, 1.0); 
      //next we need to tell this vertex to be somewhere in 3d space
      //this is the contract we accept when working with a scene graph
      //the modelMatrix represents the position of our Mesh and all
      //the parents above it:
      vec4 worldPosition = modelMatrix * _position; 
      //next we get information from the render(scene,CAMERA)
      //the camera used for that call gives us the viewMatrix uniform
      //this transforms the world (through this vertex) into something
      //called "camera space" or "view space"
      vec4 viewPosition = viewMatrix * worldPosition;
      //this space is suitable for further transformations so we
      //apply the projectionMatrix 
      vec4 perspectiveSpace = projectionMatrix * viewPosition;
      //finally we write the result into a built-in GLSL variable
      gl_PointSize = 80.0;
      gl_Position = perspectiveSpace; 
    }
  `
}

export function fragmentShaderParticle(){
  return `
    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D particleTexture;
    uniform bool hasToExplode;
    varying vec3 vColor;

    void main(){
      vec2 uv = gl_PointCoord.xy - vec2(0.5);

      float d = length(uv);
      d = sin(d * 20.0 + time) / 20.0;
      d = abs(d);

      d = 0.03 / d;

      vec3 modifiedColor = vColor;
      modifiedColor *= d;

      gl_FragColor = vec4(modifiedColor, 1.0);
      gl_FragColor = gl_FragColor * texture2D(particleTexture, gl_PointCoord);
    }
  `
}

export function sunVertexShader() {
  return `
    varying vec3 depth;
    uniform float farPlane;

    void main() {
      depth = -(modelViewMatrix * vec4(position.xyz, 1.)).xyz;
    }
  `
}

export function sunFragmentShader() {
  return `
    uniform vec3 sphereCenter;
    uniform float sphereRadius;
    // uniform float sphereAtmosphereRadius;
    uniform vec3 camQuaternion;
    uniform vec2 resolution;
    uniform float fov;
    const float MAX = 1000000.0;

    vec3 get_ray_dir(float fov, vec2 resolution, vec2 fragCoord) {
      float aspect_ratio = resolution.x / resolution.y;
      
      vec2 frag_coord_center = fragCoord - vec2(fragCoord.x * 0.5, fragCoord.y * 0.5);
    
      vec2 pixel_coord_center = frag_coord_center / resolution * 0.5;
    
      pixel_coord_center.x *= aspect_ratio;
    
      float z = 1.0 / tan(radians(fov * 0.5));
    
      return normalize(vec3(pixel_coord_center, -z));
    }

    vec3 rotateVectorWithQuaternion(vec4 quaternion, vec3 vector) {
      vec3 unit = quaternion.xyz;

      float scalar = quaternion.w;

      vec3 vector_prime = 2.0 * dot(unit, vector) * unit + (scalar * scalar - dot(unit, unit)) * vector + 2.0 * scalar * cross(unit, vector);
      return vector_prime;
    }

    vec3 rotateVector(vec3 euler, vec3 vector) {
      float cosX = cos(euler.x);
      float sinX = sin(euler.x);
      mat3 rotationX = mat3(
          1.0, 0.0, 0.0,
          0.0, cosX, -sinX,
          0.0, sinX, cosX
      );

      float cosY = cos(euler.y);
      float sinY = sin(euler.y);
      mat3 rotationY = mat3(
          cosY, 0.0, sinY,
          0.0, 1.0, 0.0,
          -sinY, 0.0, cosY
      );

      float cosZ = cos(euler.z);
      float sinZ = sin(euler.z);
      mat3 rotationZ = mat3(
          cosZ, -sinZ, 0.0,
          sinZ, cosZ, 0.0,
          0.0, 0.0, 1.0
      );

      // Apply rotations in ZYX order (yaw, pitch, roll)
      vec3 rotatedVector = rotationZ * (rotationY * (rotationX * vector));

      return rotatedVector;
    }
    
    
    float ray_intersects_sphere(vec3 eye, vec3 ray_dir, float sphere_radius, vec3 sphere_center) {
      /*
        Parametric equation for ray X = xo + xd*t Y = yo + yd*t Z = zo + zd*t
        (x-a)^2 + (y-b)^2 + (z-c)^2 = r^2 equation for sphere. Replace x, y, z with parametric equation

        A = (xd^2 + yd^2 + zd^2) // same as dot product of itself
        B = [2[xd * (xo - a) + yd * (yo - b) + zd *(zo - c)]]
        C = [(xo - a)^2 + (yo - b)^2 + (zo - c^)2 - r^2]
      */
      float a = dot(ray_dir, ray_dir);
      float b = 2.0 * dot(ray_dir, eye - sphere_center);
      float c = dot(eye - sphere_center, eye - sphere_center) - sphere_radius * sphere_radius;
    
      float discriminant = b * b - 4.0 * a * c;
      if (discriminant < 0.0) {
        return MAX;
      } else {
        return (-b - sqrt(discriminant)) / (2.0 * a);
      }
    }
    
    
    void main()
    {
      vec3 ray_dir = get_ray_dir(fov, resolution.xy, gl_FragCoord.xy);
      ray_dir = rotateVectorWithQuaternion(camQuaternion, ray_dir);
      
      float t = ray_intersects_sphere(cameraPosition, ray_dir, sphereRadius, sphereCenter);

      vec3 normal_v = normalize(ray_dir * t - vec3(0.0, 0.0, 1.0));

      vec3 color_yellow = vec3(1.0, 1.0, 1.0);
      vec3 color_black = vec3(0.5, 0.7, 1.0);
      vec3 a = 0.5 * (normal_v + 1.0);
      if(t < MAX) {
          gl_FragColor = vec4(a, 1.0);
          return;
      }
      float a_not_intersects = 0.5 * (normalize(ray_dir).y + 1.0);
      vec3 lerped_color_not_intersects = 1.0 - a_not_intersects * color_black + a_not_intersects * color_yellow;
      gl_FragColor = vec4(lerped_color_not_intersects, 1.0);
    }
  `;
}
