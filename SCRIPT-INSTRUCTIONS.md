# How to Use copy-packages.ps1

## Quick Start (3 Steps)

### Step 1: Download the Script

Copy `copy-packages.ps1` from `/mnt/user-data/outputs/` to your monorepo root folder.

Example:
```
C:\Projects\monorepo\copy-packages.ps1
```

---

### Step 2: Edit the Script (1 Line Change)

Open `copy-packages.ps1` in PowerShell ISE or your text editor.

Find this line (around line 8):

```powershell
$sourcePath = "C:\Users\YourUsername\Downloads"  # ← UPDATE THIS PATH
```

Replace it with where your files are. Examples:

```powershell
# If files are in Downloads
$sourcePath = "C:\Users\ChaiWang\Downloads"

# If files are in Documents
$sourcePath = "C:\Users\ChaiWang\Documents"

# If files are in a specific folder
$sourcePath = "D:\Claude\outputs"

# If files are on cloud storage
$sourcePath = "C:\Users\ChaiWang\OneDrive\outputs"
```

Save the file.

---

### Step 3: Run the Script

Open PowerShell in your monorepo root directory and run:

```powershell
.\copy-packages.ps1
```

**That's it!** The script will:
- ✅ Copy all 22 files to correct locations
- ✅ Create folders automatically
- ✅ Verify everything worked
- ✅ Show results with colors

---

## Expected Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 ChAICodes Package Copy Script
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Source Path: C:\Users\ChaiWang\Downloads
Repo Root:   C:\Projects\monorepo

📦 Copying @chaicodes/stripe-helpers...

  ✅ package.json
  ✅ index.js
  ✅ createCheckoutSession.js
  ... (more files)

stripe-helpers: 13 copied, 0 failed

📄 Copying @chaicodes/legal-pages...

  ✅ package.json
  ✅ index.js
  ... (more files)

legal-pages: 8 copied, 0 failed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SUCCESS! All files copied correctly!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next steps:
  1. Run: npm install
  2. Verify: npm ls @chaicodes/stripe-helpers @chaicodes/legal-pages
  3. Commit: git add . && git commit -m 'Add packages' && git push
```

---

## Troubleshooting

### "ERROR: Source path not found"

The script can't find your files. Make sure:

```powershell
# Check where your files actually are
Get-ChildItem -Path "C:\Users\ChaiWang\Downloads" -Filter "packages-*"

# If you see them, update $sourcePath to that location
```

---

### Script Won't Run

If you get "cannot be loaded because running scripts is disabled":

```powershell
# Enable scripts for this session only
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Then run the script
.\copy-packages.ps1
```

---

### Some Files Show "❌ - Source not found"

Check:

1. Are the files in the path you specified?
2. Do the file names match exactly? (case-sensitive)
3. Are all files in `/mnt/user-data/outputs/`?

---

## After Running the Script

Once the script completes successfully:

```powershell
# 1. Install all dependencies
npm install

# 2. Verify packages were linked
npm ls @chaicodes/stripe-helpers @chaicodes/legal-pages

# 3. Commit to GitHub
git add .
git commit -m "Add @chaicodes/stripe-helpers and @chaicodes/legal-pages packages"
git push origin main
```

---

## Script Details

The script:
- 📋 Copies 13 stripe-helpers files
- 📋 Copies 8 legal-pages files
- 📁 Creates all directories automatically
- ✅ Verifies each file
- 📊 Shows results with counts
- 🎨 Uses colors for easy reading

---

## Need Help?

If the script fails, check:

1. **Source path exists?**
   ```powershell
   Test-Path "C:\path\to\files"
   ```

2. **Files are there?**
   ```powershell
   Get-ChildItem "C:\path\to\files" -Filter "packages-*" | Select Name
   ```

3. **In right directory?**
   ```powershell
   Get-Location  # Should show monorepo root
   ```

---

**That's it! The script handles everything else.** 🚀
