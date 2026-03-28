# Hello, stranger!

### This is the client-side code for the Day Dreamers band! It is my passion project over the last couple of years. 

... and it only took me two and a half years to write a readme, but here we are. And I'm glad you're taking the time to check out this repo.

**Instructions to get setup:**

1. install bun (this is the command for macOS): 
```bash
curl -fsSL https://bun.com/install | bash
```
2. install your dependencies (you may have to allow post-installs manually):
```bash
bun i
```
3. sign into firebase:
```bash
firebase login
```

### General architecture

- If running in dev (e.g. ```bun run dev```), you will be connected to the dev backend. If running in prod (e.g. ```bun run build```), you will be connected to the prod backend.