#!/bin/bash
# Script to remove Claude attribution from git history

echo "Removing Claude attribution from commit 6d84d58..."

# Use filter-branch to rewrite the commit message
git filter-branch --msg-filter '
  sed "/🤖 Generated with \[Claude Code\]/d" | \
  sed "/Co-Authored-By: Claude/d" | \
  sed "/Generated with Claude/d" | \
  sed -e :a -e "/^\s*$/d; N; ba"
' --force -- 6d84d58..HEAD

echo "Done! Now you need to force push:"
echo "git push origin main --force"
echo ""
echo "⚠️  WARNING: This rewrites history. Make sure no one else is using this branch!"
