#!/usr/bin/env node

const fs = require('fs');

// Read from stdin
let message = '';
process.stdin.on('data', (chunk) => {
  message += chunk;
});

process.stdin.on('end', () => {
  // Remove Claude attribution lines
  const lines = message.split('\n');
  const cleanedLines = [];

  for (const line of lines) {
    // Check for various Claude attribution patterns
    if (line.includes('Generated with') && line.includes('Claude')) {
      continue;
    }
    if (line.includes('Co-Authored-By: Claude')) {
      continue;
    }
    if (line.includes('🤖') || line.includes('Generated with [Claude Code]')) {
      continue;
    }
    // Skip leading empty lines
    if (line.trim() === '' && cleanedLines.length === 0) {
      continue;
    }
    cleanedLines.push(line);
  }

  // Remove trailing empty lines
  while (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1].trim() === '') {
    cleanedLines.pop();
  }

  console.log(cleanedLines.join('\n'));
});
