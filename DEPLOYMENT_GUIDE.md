# Deployment Guide — uncharteduser.brave

## Zero-Cost Hosting Options

### Option A: Fleek (Recommended for IPFS + Unstoppable Domains)

Fleek is purpose-built for Web3 domains and IPFS. Free tier includes IPFS pinning,
automatic deploys from Git, and native Unstoppable Domains integration.

**Steps:**

1. Push this project to GitHub:
   ```bash
   git init
   git remote add origin https://github.com/YOUR_USERNAME/uncharteduser-brave.git
   git add .
   git commit -m "Initial build"
   git push -u origin main
   ```

2. Go to https://fleek.xyz and sign in with your wallet (Brave Wallet works!).

3. Click **"Add New Site"** → connect your GitHub repo.

4. Set build settings:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node version: `18`

5. Click **Deploy**. Fleek will build and pin to IPFS automatically.

6. After deploy, copy the **IPFS CID** shown in the Fleek dashboard.

---

### Option B: Cloudflare Pages (Best traditional speed)

1. Push to GitHub as above.
2. Go to https://pages.cloudflare.com → **Create a project** → connect repo.
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Save and Deploy**.
5. Your site will have a free `.pages.dev` URL immediately.

---

### Option C: GitHub Pages

1. Install the deploy tool:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json` scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`
4. Enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch.

---

## Linking uncharteduser.brave to Your Hosting

### Via Fleek (Easiest — Native Web3 Domain Support)

1. In your Fleek project dashboard, click **"Add Custom Domain"**.
2. Select **Unstoppable Domains** as the domain type.
3. Enter `uncharteduser.brave`.
4. Fleek will instruct you to set an IPFS hash record — follow the prompt.
5. Go to https://unstoppabledomains.com → **My Domains** → Manage `uncharteduser.brave`.
6. Under **IPFS**, paste the IPFS hash (CID) that Fleek generated.
7. Save. Propagation is instant (no DNS TTL — it's blockchain!).

### Testing Your Domain

- **In Brave Browser**: Type `uncharteduser.brave` directly in the address bar.
  Brave has native Unstoppable Domains resolution built in.

- **In Chrome/Safari**: Use the `.limo` gateway:
  ```
  https://uncharteduser.limo
  ```
  This is a free Web2 gateway to your Web3 domain that anyone can access.

- **Direct IPFS**: Use any IPFS gateway:
  ```
  https://ipfs.io/ipfs/YOUR_CID_HERE
  ```

---

## XMTP Messaging Setup

1. Go to https://xmtp.chat
2. Connect your `uncharteduser.brave` owner wallet.
3. Your wallet address is now reachable via XMTP.
4. Share the link: `https://xmtp.chat/dm/YOUR_WALLET_ADDRESS`
5. Visitors using XMTP-compatible apps (Converse, hey.xyz) can message you directly.

## Mailchain Setup

1. Go to https://app.mailchain.com
2. Connect your Brave Wallet.
3. Your Unstoppable Domain (`uncharteduser@unstoppable`) is automatically registered.
4. You can receive emails at `uncharteduser@unstoppable.mailchain.com`.

---

## Environment Configuration After Deploy

Once live, update `src/config.ts`:

1. Set `OWNER_ADDRESSES` to your wallet address (lowercase, with 0x prefix).
2. Generate a new `BACKUP_PIN_HASH`:
   - Visit: https://emn178.github.io/online-tools/sha256.html
   - Type your chosen PIN and copy the hash.
   - Paste it as `BACKUP_PIN_HASH` in config.ts.
3. Rebuild and redeploy.

