// VANGUARD Studio - New Features Test Script
// Copy and paste this entire script into Chrome DevTools Console
// at http://localhost:3000/studio

console.log('🎯 VANGUARD New Features Test Script');
console.log('=====================================\n');

// Wait for page to load
setTimeout(() => {
    const iframe = document.querySelector('iframe');
    if (!iframe) {
        console.error('❌ No iframe found - are you on the studio page?');
        return;
    }

    const doc = iframe.contentDocument || iframe.contentWindow.document;

    console.log('✅ Studio loaded successfully\n');

    // ============================================
    // TEST 1: AI Prompt Generator
    // ============================================
    console.log('📝 TEST 1: AI Prompt Generator');
    console.log('----------------------------');

    const aiPromptInput = doc.getElementById('aiPromptInput');
    if (aiPromptInput) {
        console.log('✅ AI Prompt input found');
        console.log('   Current value:', aiPromptInput.value || '(empty)');
        console.log('   Placeholder:', aiPromptInput.placeholder);
    } else {
        console.log('❌ AI Prompt input NOT found');
    }

    // Test quick button exists
    const quickButtons = doc.querySelectorAll('button[onclick*="setPrompt"]');
    console.log(`✅ Quick theme buttons: ${quickButtons.length} found`);
    if (quickButtons.length > 0) {
        console.log('   Themes:', Array.from(quickButtons).map(b => b.textContent.trim()).join(', '));
    }

    // Test generate button
    const generateButton = doc.querySelector('button[onclick*="generateFromPrompt"]');
    if (generateButton) {
        console.log('✅ Generate button found:', generateButton.textContent.trim());
    } else {
        console.log('❌ Generate button NOT found');
    }

    console.log('\n');

    // ============================================
    // TEST 2: Font Combinations
    // ============================================
    console.log('🎨 TEST 2: Font Combinations (should be 39)');
    console.log('-------------------------------------------');

    // Access state object from iframe window
    const iframeWindow = iframe.contentWindow;
    if (iframeWindow.state && iframeWindow.state.fonts) {
        const fontCount = iframeWindow.state.fonts.length;
        console.log(`✅ Font combinations: ${fontCount} total`);

        if (fontCount >= 39) {
            console.log('✅ PASS: 39+ font combinations available');
        } else {
            console.log(`❌ FAIL: Only ${fontCount} fonts found (expected 39)`);
        }

        // Show first 5 and last 5
        console.log('\n   First 5 fonts:');
        iframeWindow.state.fonts.slice(0, 5).forEach((f, i) => {
            console.log(`   ${i + 1}. ${f.name}: ${f.heading} + ${f.body}`);
        });

        console.log('\n   Last 5 fonts:');
        iframeWindow.state.fonts.slice(-5).forEach((f, i) => {
            const idx = fontCount - 5 + i + 1;
            console.log(`   ${idx}. ${f.name}: ${f.heading} + ${f.body}`);
        });
    } else {
        console.log('❌ Unable to access state.fonts');
    }

    console.log('\n');

    // ============================================
    // TEST 3: Heading Size Controls
    // ============================================
    console.log('📏 TEST 3: Heading Size Controls');
    console.log('--------------------------------');

    const headingSizes = ['h1', 'h2', 'h3', 'h4'];
    headingSizes.forEach(h => {
        const slider = doc.getElementById(`${h}SizeSlider`);
        const value = doc.getElementById(`${h}SizeValue`);

        if (slider && value) {
            console.log(`✅ ${h.toUpperCase()} size control found`);
            console.log(`   Range: ${slider.min} - ${slider.max}, Current: ${value.textContent}`);
        } else {
            console.log(`❌ ${h.toUpperCase()} size control NOT found`);
        }
    });

    console.log('\n');

    // ============================================
    // TEST 4: Element Size Controls
    // ============================================
    console.log('🔘 TEST 4: Element Size Controls');
    console.log('--------------------------------');

    const buttonSizeValue = doc.getElementById('buttonSizeValue');
    if (buttonSizeValue) {
        console.log('✅ Button Size control found');
        console.log('   Current value:', buttonSizeValue.textContent);
    } else {
        console.log('❌ Button Size control NOT found');
    }

    const inputSizeValue = doc.getElementById('inputSizeValue');
    if (inputSizeValue) {
        console.log('✅ Input Size control found');
        console.log('   Current value:', inputSizeValue.textContent);
    } else {
        console.log('❌ Input Size control NOT found');
    }

    console.log('\n');

    // ============================================
    // TEST 5: Advanced Spacing Controls
    // ============================================
    console.log('📐 TEST 5: Advanced Spacing Controls');
    console.log('------------------------------------');

    const spacingControls = [
        { id: 'sectionPaddingValue', name: 'Section Padding' },
        { id: 'cardPaddingValue', name: 'Card Padding' },
        { id: 'elementGapValue', name: 'Element Gap' },
        { id: 'gridGapValue', name: 'Grid Gap' },
        { id: 'buttonPaddingValue', name: 'Button Padding' }
    ];

    spacingControls.forEach(control => {
        const element = doc.getElementById(control.id);
        if (element) {
            console.log(`✅ ${control.name} found: ${element.textContent}`);
        } else {
            console.log(`❌ ${control.name} NOT found`);
        }
    });

    console.log('\n');

    // ============================================
    // TEST 6: State Configuration
    // ============================================
    console.log('⚙️ TEST 6: State Configuration');
    console.log('------------------------------');

    if (iframeWindow.state && iframeWindow.state.config) {
        const config = iframeWindow.state.config;
        console.log('✅ State config accessible');
        console.log('\n   Heading Sizes:');
        console.log(`   - h1Size: ${config.h1Size || 'NOT SET'}`);
        console.log(`   - h2Size: ${config.h2Size || 'NOT SET'}`);
        console.log(`   - h3Size: ${config.h3Size || 'NOT SET'}`);
        console.log(`   - h4Size: ${config.h4Size || 'NOT SET'}`);

        console.log('\n   Element Sizes:');
        console.log(`   - buttonSize: ${config.buttonSize || 'NOT SET'}`);
        console.log(`   - inputSize: ${config.inputSize || 'NOT SET'}`);

        console.log('\n   Advanced Spacing:');
        console.log(`   - sectionPadding: ${config.sectionPadding || 'NOT SET'}`);
        console.log(`   - cardPadding: ${config.cardPadding || 'NOT SET'}`);
        console.log(`   - elementGap: ${config.elementGap || 'NOT SET'}`);
        console.log(`   - gridGap: ${config.gridGap || 'NOT SET'}`);
        console.log(`   - buttonPadding: ${config.buttonPadding || 'NOT SET'}`);
    } else {
        console.log('❌ Unable to access state.config');
    }

    console.log('\n');

    // ============================================
    // TEST 7: Function Availability
    // ============================================
    console.log('🔧 TEST 7: New Functions Available');
    console.log('----------------------------------');

    const functions = [
        'setPrompt',
        'generateFromPrompt',
        'generatePaletteVariation',
        'updateHeadingSize',
        'setButtonSize',
        'setInputSize',
        'updateSectionPadding',
        'updateCardPadding',
        'updateElementGap',
        'updateGridGap',
        'setButtonPadding'
    ];

    functions.forEach(fnName => {
        if (typeof iframeWindow[fnName] === 'function') {
            console.log(`✅ ${fnName}() is available`);
        } else {
            console.log(`❌ ${fnName}() NOT found`);
        }
    });

    console.log('\n');

    // ============================================
    // INTERACTIVE TESTS
    // ============================================
    console.log('🧪 INTERACTIVE TESTS');
    console.log('====================\n');
    console.log('Run these commands to test interactively:');
    console.log('');
    console.log('// Test AI Prompt Generator:');
    console.log('iframe = document.querySelector("iframe");');
    console.log('win = iframe.contentWindow;');
    console.log('win.setPrompt("ocean sunset");');
    console.log('win.generateFromPrompt();');
    console.log('');
    console.log('// Test Heading Size (make H1 huge):');
    console.log('win.updateHeadingSize("h1", 5);');
    console.log('');
    console.log('// Test Button Size (make buttons large):');
    console.log('doc = iframe.contentDocument;');
    console.log('win.setButtonSize("large");');
    console.log('');
    console.log('// Test Section Padding (make spacious):');
    console.log('win.updateSectionPadding(7);');
    console.log('');
    console.log('// Check current font count:');
    console.log('console.log("Font count:", win.state.fonts.length);');
    console.log('');

    // ============================================
    // SUMMARY
    // ============================================
    console.log('\n');
    console.log('📊 TEST SUMMARY');
    console.log('===============');

    let passCount = 0;
    let totalTests = 0;

    // Count tests
    totalTests++; // AI Prompt input
    if (aiPromptInput) passCount++;

    totalTests++; // Font count
    if (iframeWindow.state && iframeWindow.state.fonts && iframeWindow.state.fonts.length >= 39) passCount++;

    totalTests += 4; // Heading sizes
    headingSizes.forEach(h => {
        if (doc.getElementById(`${h}SizeSlider`)) passCount++;
    });

    totalTests += 2; // Element sizes
    if (buttonSizeValue) passCount++;
    if (inputSizeValue) passCount++;

    totalTests += 5; // Spacing controls
    spacingControls.forEach(control => {
        if (doc.getElementById(control.id)) passCount++;
    });

    console.log(`\n✅ Passed: ${passCount}/${totalTests} tests`);

    if (passCount === totalTests) {
        console.log('🎉 ALL TESTS PASSED!');
    } else {
        console.log(`⚠️  ${totalTests - passCount} test(s) failed`);
    }

    console.log('\n');
    console.log('🚀 Ready for manual testing!');
    console.log('Navigate through tabs and test each control.');

}, 1000);
