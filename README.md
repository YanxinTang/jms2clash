# jms2clash

Convert JustMySocks subscription to clash proxy-provider

## Usage

```bash
# wrangler login
pnpm exec wrangler login


# set secrets
pnpm exec wrangler secret put BASIC_USER
pnpm exec wrangler secret put BASIC_PASS

# deploy
pnpm exec wrangler deploy
```

### Fallback URL

- Proxies is sorted by `FALLBACK_SERVERS_ORDER`
- URL: `https://<BASIC_USER>:<BASIC_PASS>@<YOUR_SERVER_NAME>/fallback.yaml?service=xxxxxx&id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxxx`

### Select URL

- Proxies is jms's order
- URL: `https://<BASIC_USER>:<BASIC_PASS>@<YOUR_SERVER_NAME>/select.yaml?service=xxxxxx&id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxxx`

## Development

```bash
# locale env
touch .dev.vars
echo "BASIC_USER=admin" >> .dev.vars
echo "BASIC_PASS=admin" >> .dev.vars

# start development
pnpm run start
```

More information refer to [warangler](https://developers.cloudflare.com/workers/wrangler/)
