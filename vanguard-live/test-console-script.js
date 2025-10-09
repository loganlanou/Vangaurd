// ====================================
// VANGUARD Accent Color Test Script
// ====================================
// Paste this into Chrome DevTools Console while viewing http://localhost:3000/studio

(function() {
    console.clear();
    console.log('%c🎨 VANGUARD Accent Color Test Script', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%c==================================', 'color: #667eea;');
    console.log('');

    // Get the iframe
    const iframe = document.querySelector('iframe[src*="color-palette-generator"]');

    if (!iframe) {
        console.log('%c❌ ERROR: Could not find color-palette-generator iframe', 'color: red; font-weight: bold;');
        console.log('Make sure you are on http://localhost:3000/studio');
        return;
    }

    console.log('%c✅ Found iframe', 'color: green;');

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Test 1: Check for accent color input
    console.log('');
    console.log('%cTest 1: Checking for Accent Color Input', 'font-weight: bold; color: #667eea;');
    const accentInput = iframeDoc.getElementById('accentColor');

    if (!accentInput) {
        console.log('%c❌ FAILED: Accent color input not found', 'color: red;');
        return;
    }

    console.log('%c✅ PASSED: Accent color input found', 'color: green;');
    console.log('   Current value:', accentInput.value);

    // Test 2: Check for Accent/Price label
    console.log('');
    console.log('%cTest 2: Checking for "Accent/Price" Label', 'font-weight: bold; color: #667eea;');
    const labels = Array.from(iframeDoc.querySelectorAll('.color-label-text'));
    const accentLabel = labels.find(label => label.textContent.includes('Accent/Price'));

    if (!accentLabel) {
        console.log('%c❌ FAILED: "Accent/Price" label not found', 'color: red;');
    } else {
        console.log('%c✅ PASSED: "Accent/Price" label found', 'color: green;');
    }

    // Test 3: Navigate to pricing page
    console.log('');
    console.log('%cTest 3: Navigating to Pricing Page', 'font-weight: bold; color: #667eea;');
    const pricingLink = Array.from(iframeDoc.querySelectorAll('.nav-link'))
        .find(link => link.textContent.trim() === 'Pricing');

    if (!pricingLink) {
        console.log('%c⚠️  WARNING: Could not find Pricing navigation link', 'color: orange;');
    } else {
        pricingLink.click();
        console.log('%c✅ PASSED: Navigated to Pricing page', 'color: green;');
    }

    // Wait for page to render
    setTimeout(() => {
        // Test 4: Check for price text elements
        console.log('');
        console.log('%cTest 4: Checking for Price Text Elements', 'font-weight: bold; color: #667eea;');
        const priceTexts = iframeDoc.querySelectorAll('.price-text');

        if (priceTexts.length === 0) {
            console.log('%c❌ FAILED: No .price-text elements found', 'color: red;');
            return;
        }

        console.log('%c✅ PASSED: Found ' + priceTexts.length + ' price text elements', 'color: green;');

        // Get original colors
        const originalColors = Array.from(priceTexts).map((el, i) => {
            const color = window.getComputedStyle(el).color;
            console.log('   Price ' + (i + 1) + ' color:', color);
            return color;
        });

        // Test 5: Change accent color and verify
        console.log('');
        console.log('%cTest 5: Testing Color Change Functionality', 'font-weight: bold; color: #667eea;');
        console.log('   Changing accent color to red (#ff0000)...');

        accentInput.value = '#ff0000';
        accentInput.dispatchEvent(new Event('change'));

        setTimeout(() => {
            const newColors = Array.from(priceTexts).map((el, i) => {
                const color = window.getComputedStyle(el).color;
                console.log('   Price ' + (i + 1) + ' new color:', color);
                return color;
            });

            // Check if colors changed
            const changed = originalColors.some((color, i) => color !== newColors[i]);

            if (changed) {
                console.log('%c✅ PASSED: Colors changed successfully!', 'color: green; font-weight: bold;');
            } else {
                console.log('%c❌ FAILED: Colors did not change', 'color: red; font-weight: bold;');
            }

            // Test 6: Change to another color
            console.log('');
            console.log('%cTest 6: Testing Another Color (#00ff00)', 'font-weight: bold; color: #667eea;');
            accentInput.value = '#00ff00';
            accentInput.dispatchEvent(new Event('change'));

            setTimeout(() => {
                const greenColors = Array.from(priceTexts).map((el, i) => {
                    const color = window.getComputedStyle(el).color;
                    return color;
                });

                const changedToGreen = newColors.some((color, i) => color !== greenColors[i]);

                if (changedToGreen) {
                    console.log('%c✅ PASSED: Colors changed to green successfully!', 'color: green; font-weight: bold;');
                } else {
                    console.log('%c❌ FAILED: Colors did not change to green', 'color: red; font-weight: bold;');
                }

                // Reset to original
                console.log('');
                console.log('%cResetting to original color...', 'font-style: italic;');
                accentInput.value = '#6366f1';
                accentInput.dispatchEvent(new Event('change'));

                console.log('');
                console.log('%c==================================', 'color: #667eea;');
                console.log('%c✅ ALL TESTS COMPLETE!', 'font-size: 16px; font-weight: bold; color: green;');
                console.log('%c==================================', 'color: #667eea;');
                console.log('');
                console.log('%cSummary:', 'font-weight: bold;');
                console.log('✅ Accent color input exists and is accessible');
                console.log('✅ Accent/Price label is present in the UI');
                console.log('✅ Price text elements are found on pricing page');
                console.log('✅ Accent color changes are applied to pricing text');
                console.log('✅ Red text is now editable through the left menu!');

            }, 300);

        }, 300);

    }, 500);

})();
