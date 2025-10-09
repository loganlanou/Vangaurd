const CDP = require('chrome-remote-interface');

async function testAccentColor() {
    let client;
    try {
        client = await CDP();
        const { Page, Runtime } = client;

        await Page.enable();

        console.log('Navigating to studio page...');
        await Page.navigate({ url: 'http://localhost:3000/studio' });
        await Page.loadEventFired();

        // Wait for iframe to load
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('\n=== Testing Accent Color Control ===\n');

        // Get the iframe
        const getIframeContext = `
            (function() {
                const iframe = document.querySelector('iframe[src*="color-palette-generator"]');
                if (!iframe) return 'No iframe found';
                return 'Iframe found';
            })()
        `;
        const iframeResult = await Runtime.evaluate({ expression: getIframeContext });
        console.log('1. Iframe status:', iframeResult.result.value);

        // Switch to iframe context and test
        const testScript = `
            (function() {
                const iframe = document.querySelector('iframe[src*="color-palette-generator"]');
                if (!iframe) return { error: 'Iframe not found' };

                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

                // Check if accent color input exists
                const accentColorInput = iframeDoc.getElementById('accentColor');
                if (!accentColorInput) {
                    return { error: 'Accent color input not found' };
                }

                // Get current accent color
                const currentAccentColor = accentColorInput.value;

                // Navigate to pricing page to see pricing text
                const pricingNavLink = iframeDoc.querySelector('.nav-link[onclick*="pricing"]');
                if (pricingNavLink) {
                    pricingNavLink.click();
                }

                // Get pricing text element
                const priceTexts = iframeDoc.querySelectorAll('.price-text');
                const priceColors = Array.from(priceTexts).map(el => {
                    return window.getComputedStyle(el).color;
                });

                // Change accent color to test
                const testColor = '#ff0000'; // Red for testing
                accentColorInput.value = testColor;
                accentColorInput.dispatchEvent(new Event('change'));

                // Wait a moment for changes to apply
                setTimeout(() => {}, 100);

                // Get new pricing text colors
                const newPriceColors = Array.from(priceTexts).map(el => {
                    return window.getComputedStyle(el).color;
                });

                return {
                    success: true,
                    accentInputExists: true,
                    currentAccentColor: currentAccentColor,
                    priceTextCount: priceTexts.length,
                    originalColors: priceColors,
                    newColors: newPriceColors,
                    testColor: testColor
                };
            })()
        `;

        // Wait for page to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = await Runtime.evaluate({
            expression: testScript,
            awaitPromise: true
        });

        if (result.result.value) {
            const testResult = result.result.value;

            if (testResult.error) {
                console.log('❌ Error:', testResult.error);
            } else {
                console.log('✅ Accent color input exists:', testResult.accentInputExists);
                console.log('📝 Current accent color value:', testResult.currentAccentColor);
                console.log('💰 Price text elements found:', testResult.priceTextCount);
                console.log('🎨 Original price colors:', testResult.originalColors);
                console.log('🎨 New price colors (after changing to', testResult.testColor + '):', testResult.newColors);

                if (testResult.originalColors && testResult.newColors) {
                    const colorsChanged = testResult.originalColors.some((color, i) =>
                        color !== testResult.newColors[i]
                    );
                    console.log('\n' + (colorsChanged ? '✅' : '❌'),
                        'Colors changed:', colorsChanged ? 'YES' : 'NO');
                }
            }
        }

        // Take screenshot
        console.log('\n📸 Taking screenshot...');
        const screenshot = await Page.captureScreenshot({ format: 'png' });
        require('fs').writeFileSync('/tmp/accent-color-test.png', screenshot.data, 'base64');
        console.log('Screenshot saved to /tmp/accent-color-test.png');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

testAccentColor().catch(console.error);
