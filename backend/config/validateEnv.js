// Validate required environment variables
const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET_KEY',
  'JWT_EXPIRES',
  'COOKIE_EXPIRE',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'RESEND_API',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'FRONTEND_URL'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\nPlease check your config.env file and ensure all variables are set.');
  process.exit(1);
}

console.log('✅ All required environment variables are set');
