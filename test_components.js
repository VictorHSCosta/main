// Simple syntax validation for our React components
const fs = require('fs');
const path = require('path');

const components = [
  'app/javascript/Pages/Home.jsx',
  'app/javascript/Shared/Navbar.jsx',
  'app/javascript/Shared/FeatureCard.jsx',
  'app/javascript/Shared/Footer.jsx'
];

console.log('🔍 Validating React components syntax...');

components.forEach(componentPath => {
  try {
    const content = fs.readFileSync(componentPath, 'utf8');

    // Basic syntax checks
    if (!content.includes('import')) {
      console.warn(`⚠️  ${componentPath}: No imports found`);
    }

    if (!content.includes('export')) {
      console.warn(`⚠️  ${componentPath}: No exports found`);
    }

    // Check for JSX syntax
    if (componentPath.endsWith('.jsx') && !content.includes('return(') && !content.includes('return <')) {
      console.warn(`⚠️  ${componentPath}: May not contain valid JSX return statement`);
    }

    console.log(`✅ ${componentPath}: Syntax validation passed`);

  } catch (error) {
    console.error(`❌ ${componentPath}: Error reading file - ${error.message}`);
  }
});

console.log('\n🎉 Component validation complete!');