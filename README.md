# xteam-api

Full API Implementation inside NodeJS Module

More info at https://api.xteam.xyz/
Get **APIKEY** here https://api.xteam.xyz/register
## Usage
```ts
import { API: XTeam } from 'xteam-api'

// Set Your APIKEY
XTeam.apikey = 'your-apikey'
```

## Example
TTP
```ts
const json = await XTeam.free.ttp('hello')
```

ATTP
```ts
const json = await XTeam.free.attp('hello')
```