@echo off
echo Fixing commit to remove Claude attribution...
echo.
echo Step 1: Setting up the filter...

git filter-branch -f --msg-filter "sed 's/🤖 Generated with \[Claude Code\](https:\/\/claude.com\/claude-code)//g' | sed 's/Co-Authored-By: Claude <noreply@anthropic.com>//g' | sed '/^$/d'" 6d84d58^..HEAD

echo.
echo Done! Commit history has been rewritten.
echo.
echo Next step: Force push to GitHub
echo Run: git push origin main --force
echo.
pause
