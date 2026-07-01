const fs = require('fs');
const path = require('path');

const gradleFilePath = path.join(__dirname, '..', 'node_modules', '@capacitor-community', 'admob', 'android', 'build.gradle');

try {
  if (fs.existsSync(gradleFilePath)) {
    let content = fs.readFileSync(gradleFilePath, 'utf8');
    content = content.replace(/getDefaultProguardFile\('proguard-android\.txt'\)/g, "getDefaultProguardFile('proguard-android-optimize.txt')");
    fs.writeFileSync(gradleFilePath, content, 'utf8');
    console.log('Successfully patched build.gradle for @capacitor-community/admob');
  } else {
    console.log('build.gradle not found for @capacitor-community/admob, skipping patch.');
  }
} catch (e) {
  console.error('Error during postinstall script:', e);
}
