# Modern Office Git Diff

> An experiment in tracking versions of modern Office XML files in Git.

Modern Office file formats are ZIP archives with XML files in them.
The ZIP archives are binary files so Git (and furthemore GitHub, GitLab where diff cannot be tweaked) won't display a nice diff for them.
The XML files are not binary, so in order to display a diff for these, this unpacks the ZIP files to directories that are tracked in Git.
Tracking generated files is pretty dumb, but so is tracking binary files and when forced to have one,
it's not a leap to have the other as well if it bring something useful to the table.

This is achieved using a PowerShell script which unpacks the ZIP file to a tracked directory,
formats the XML files for nice diff and tracks the formatted files as well.

**Features:**

- Every Office file (DOCX, XLSX, PPTS) has complementary `.git` directory with XML and TXT files for diffing
- Formatting XML files for nicer diffing
- Generating TXT files from just text nodes for lossy text-only diffing
- Ability to run as a Git hook for worry free tracking

**Examples:**

The XML diff captures the exact change whereas the TXT diff captures text-only change for quick content inspection.

- [Example Word diff](https://github.com/TomasHubelbauer/modern-office-xml-git/commit/3413eacaaeb236a06033a443d7979f19207a613b)
- [Example Excel diff](https://github.com/TomasHubelbauer/modern-office-xml-git/commit/5f4ef47d345ab451f17e41ebf0befbc842ff5dba)

## Running

Run `./cmd/version-office-files.ps1` in PowerShell
(use PowerShell ISE or click on the file in VS Code and use PowerShell Integrated Console that will pop up to avoid security error)
to version Office files manually add a pre-commit hook to do it automatically:

- Set up the pre-commit hook:

```sh
cp .git/hooks/pre-commit.sample .git/hooks/pre-commit
code .git/hooks/pre-commit
```

`.git/hooks/pre-commit`

```sh
#!/usr/bin/env bash
powershell cmd/version-office-files.ps1
```

- Open the files and make some changes
  - `open` on Unix
  - `start` on Windows
- `git add *`
- `git commit -m "Make some changes"`
- See the commit diff for the Office changes

## Studying

See `git log` and [development notes](doc/notes.md).

## Contributing

See [planned development](doc/tasks.md).
