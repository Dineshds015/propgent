const fs = require('fs');

async function fetchFigmaData() {
  const fileKey = 'B78NlL3eYxy5z3TlxJt8t9';
  const token = 'figd_B1wtjSweWeysWRTzXJxpIKtvsHksWXORq6dUSH1I';
  
  console.log('Fetching Figma file data...');
  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: {
      'X-Figma-Token': token
    }
  });

  if (!response.ok) {
    console.error(`Failed to fetch Figma data: ${response.statusText}`);
    process.exit(1);
  }

  const data = await response.json();
  
  // Extract document styles and styles mapping
  const colors = {};
  const textStyles = {};

  // Extract from figma styles dictionary if available
  if (data.styles) {
    for (const [key, style] of Object.entries(data.styles)) {
      if (style.styleType === 'FILL') {
        colors[key] = style.name;
      } else if (style.styleType === 'TEXT') {
        textStyles[key] = style.name;
      }
    }
  }

  // A recursive function to extract explicit values from nodes if needed
  const extractedColors = new Set();
  const fonts = new Set();

  const frames = [];

  function traverse(node) {
    if (node.fills) {
      node.fills.forEach(fill => {
        if (fill.type === 'SOLID' && fill.color) {
          const { r, g, b } = fill.color;
          const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
          extractedColors.add(hex);
        }
      });
    }
    
    if (node.style) {
      if (node.style.fontFamily) {
        fonts.add(`${node.style.fontFamily} - ${node.style.fontWeight} - ${node.style.fontSize}px`);
      }
    }

    if (node.type === 'FRAME' || node.type === 'COMPONENT') {
      frames.push(node.name);
    }

    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  traverse(data.document);

  const report = `
# Figma Extraction Report

## Project Name
${data.name}

## Document Colors (Unique solid fills)
${Array.from(extractedColors).join(', ')}

## Typography
${Array.from(fonts).join('\n')}

## Frames and Components
${frames.join('\n- ')}

`;

  fs.writeFileSync('figma-report.md', report);
  console.log('Saved report to figma-report.md');
}

fetchFigmaData();
