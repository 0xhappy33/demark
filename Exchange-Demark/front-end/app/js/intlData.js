module.exports = {
  "locales": "en-US",
  "formats": {
    "date": {
      "short": {
        "day": "numeric",
        "month": "long",
        "year": "numeric"
      },
      "long": {
        "day": "numeric",
        "month": "short",
        "year": "numeric",
        "hour": "numeric",
        "minute": "numeric",
        "second": "numeric"
      }
    },
    "number": {
      "USD": {
        "style": "currency",
        "currency": "USD",
        "minimumFractionDigits": 2
      },
      "btc": {
        "maximumFractionDigits": 8
      },
      "ether": {
        "maximumFractionDigits": 18
      }
    }
  },
  "messages": {
    "loading": "loading",
    "error": "Error!",
    "slogan": "A Decentralized Future Calls For A Decentralized Exchange.",
    "balance": "Balance",
    "available": "Available",
    "trading": "Trading",
    "last": "Last Price",
    "price": "{price, number} {currency}/ETH",
    "trades": "Trades",
    "markets": "Markets",
    "amount": "Amount",
    "total": "Total",
    "by": "By",
    "network": "Network",
    "blocktime": "{time, number} s",
    "ether": "{value, number} {unit}",
    "init": {
      "loading": "Ethereum loading...",
      "ready": "The Ethereum block chain is current. Just a few more seconds...",
      "not_ready": `The Ethereum block chain is not current and
                    {peers, plural,
                      =0 {we're looking for peers}
                      =1 {is fetching blocks from # peer}
                      other {is fetching blocks from # peers}}.`,
      "force": "Load anyway",
      "failed": {
        "header": "Demark failed to load",
        "explain": "There was a problem loading Demark.",
        "assistance": "Visit #Demark on IRC for assitance."
      },
      "connect": {
        "failed": "Ethereum not found",
        "explain": `Demark requires an Ethereum client to be running and current.
                    Demark could not detect a client running which probably means
                    it's not installed, running or is misconfigured.`,
        "assistance": `Get help installing and configuring Ethereum`
      },
      "install": {
        "title": "Installing and configuring Ethereum",
        "OSX": {
          "brew": `<a target="_blank" href="http://brew.sh/">Install Homebrew</a> for Mac OS, then:`,
          "install": `brew tap ethereum/ethereum\nbrew install ethereum`,
          "link": `See also the <a href="{wiki}" target="_blank">Wiki page</a>
                  and the <a href="{brew}" target="_blank">homebrew-ethereum README</a>.`
        },
        "Ubuntu": {
          "PPA": `sudo apt-get install software-properties-common\nsudo add-apt-repository ppa:ethereum/ethereum\nsudo apt-get update\nsudo apt-get install ethereum`,
          "link": `See also the <a href="{wiki}" target="_blank">Wiki page</a>
                  and the <a href="{ppa}" target="_blank">PPA repository</a>.`
        },
        "Win": {
          "install": `Download the
                        <a href="#">
                          lastest geth build
                        </a>
                      for Windows`,
          "link": `See also the <a href="{wiki}" target="_blank">Wiki page</a>
                  and the <a href="{choco}" target="_blank">Chocolatery package</a>.`
        },
        "Others": {
          "build": `Follow the Ethereum
                      <a href="https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum">
                        install guide
                      </a>
                    on GitHub`
        },
        "installed": `Once <pre className="small">geth</pre> is installed:`,
        "account": `Add a new account using: { geth }`,
        "start": `Start geth with: { geth }`
      },
      "block": {
        "age": "Last block was {age}.",
        "left": "Approximately {left, number} blocks left to go.",
        "genesis": "No block mined. This is the genesis."
      }
    },
    "demo": {
      "proceed": "Proceed in demo mode"
    },
    "nav": {
      "toggle": "Toggle navigation",
      "categories": "Categories",
      "trades": "Trade",
      "markets": "Market",
      "wallet": "Wallet",
      "account": "Account",
      "request": "Request Token",
      "publish": "ICO Service",
      "tools": "Tool",
      "help": "Help"
    },
    "sections": {
      "sub": "Subcurrencies",
      "xchain": "X-Chain",
      "assets": "Assets",
      "currencies": "Currencies"
    },
    "wallet": {
      "balance": "In {currency} wallet: {balance, number}",
      "available": "Available {currency} balance: {balance, number}",
      "trading": "Currently trading {balance, number} {currency}",
      "sub": `{balance, plural,
                =0 {0 {currency}}
                other {# {currency}}
              }`,
      "pending": `{currency} balance: {balance, number}
                  {pending, plural,
                    =0 {}
                    other {(# pending)}
                  }`
    },
    "confirm": {
      "required": "Confirmation required",
      "estimate": "Gas cost estimate",
      "no": "No",
      "yes": "Yes"
    },
    "form": {
      "buy": "Buy",
      "sell": "Sell",
      "buyorsell": "Buy or Sell",
      "amount": "Amount",
      "price": "Price",
      "toaddress": "To address",
      "mint": "Mint",
      "checkgoal": "Check Goal",
      "total": "Total",
      "trade": "Place trade",
      "new": "New Trade",
      "deposit": "Deposit",
      "withdraw": "Withdraw",
      "recipient": "Recipient",
      "rating": "Rating",
      "address": "Address",
      "market": "Market",
      "empty": "Fill it up mate!",
      "smaller": "Don't be smaller than 0!",
      "cheap": "Don't be cheap...",
      "warning": "Warning!",
      "yours": "Your trades"
    },
    "config": {
      "title": "Configuration",
      "current": "Demark address",
      "new": "New address",
      "blockfee": "BTC relay block fee",
      "blockfeehelp": "Amount of wei you would charge to other users for the BTC block headers you would successfully store to btcrelay.",
      "timeout": "Network timeout (seconds)",
      "update": "Update",
      "refresh": "Refresh",
      "debug_mode": "Debug mode",
      "debug_warning": "This prints a truckload of logs to the console and can slow down the UI considerably.",
      "address": "Are you sure you want to change the exchange's address to {address} ?",
      "si": "Use named large numbers for balances"
    },
    "address": {
      "size": `Address too {size, select,
                short {short}
                long {long}
              }.`
    },
    "deposit": {
      "currency": "Deposit {currency}",
      "confirm": "Deposit {amount, number} ETH to {currency}?",
      "not_enough": "Not enough {currency} for a deposit of {amount, number}, you have {balance, number}"
    },
    "sub": {
      "send": "Are you sure you want to send {amount, number} {currency} {recipient}?",
      "buy": "Are you sure you want to buy {amount, number} {symbol} by sending {value} {currency}?",
      "not_enough": "Not enough {currency} available to send, got {balance, number}",
      "register": "Subcurrency registration",
      "code": "Subcurrency code",
      "contract": "Contract address",
      "minimum": "Minimum ETH amount",
      "decimals": "Decimals",
      "precision": "Price precision",
      "confirm": `Are you sure you want to register {code} at address {address}
        in the {category} section, with a minimum trade amount of {minimum} ETH,
        {decimals} decimals to the subcurrency and a price precision of {precision} ?`
    },
    "withdraw": {
      "currency": "Withdraw {currency}",
      "confirm": "Are you sure you want to withdraw {amount, number} {currency}?",
      "not_enough": "Not enough {currency} available for withdrawal, got {balance, number}, needs {amount, number}",
      "empty": "Dont' be cheap to yourself..."
    },
    "send": {
      "send": "Transfer",
      "withdraw": "Withdraw",
      "reward": "Reward",
      "fund": "Buy",
      "currency": "Transfer {currency}"
    },
    "market": {
      "favorite": "Favorite",
      "pair": "Currency pair",
      "change": "% change in<br />24h/1w/1m"
    },
    "trade": {
      "asks": "Asks",
      "bids": "Bids",
      "cancel": "Are you sure you want to cancel this trade?",
      "confirm": `Are you sure you want to {type, select,
                    buy {buy}
                    sell {sell}
                  } {amount, number} {currency} at {price, number} {currency}/ETH for a maximum of {total, number} ETH?`,
      "adding": `You will be adding a new trade of {amount, number} {currency}
                  at {price, number} {currency}/ETH for {total, number} ETH.`,
      "filling": `You will be filling
                  {numTrades, plural, =1 {one trade} other {# trades}}
                  for a total of {total, number} ETH
                  {left, plural,
                    =0 {}
                    other {({balance, number} ETH left)}}.`,
      "also_adding": `You will also be adding a new trade of {amount, number} {currency}
                      at {price, number} {currency}/ETH for {total, number} ETH.`,
      "not_left": `Not enough left for a new trade with {amount, number} for {total, number} ETH.`,
      "minimum": `Minimum total is {minimum, number} ETH`,
      "not_total": `Not enough ETH for this trade, {minimum, number} ETH required.`,
      "not_enough": `Not enough {currency} for this trade, {amount, number} {currency} required.`
    },
    "txs": {
      "block": "Block #",
      "inout": "In / Out",
      "type": "Type",
      "fromto": "From / To",
      "price": "Price",
      "amount": "Amount",
      "totaleth": "Total ETH",
      "details": "Details",
      "hash": "Hash",
      "id": "Trade ID"
    },
    "txs_events": {
      "block": "Block #",
      "from": "From",
      "fromto": "From / To",
      "to": "To",
      "exchange": "Exchange",
      "amount": "Amount",
      "datetime": "Date / Time"
    },
    "user": {
      "account": "My Account",
      "balances": "Balances",
      "tokenforico": "Token For ICO",
      "not_found": "User not found",
      "address": "Current address",
      "total": "Total value (ETH)",
      "trades": "Open trades",
      "balance": `{balance, number} {currency}
                  {pending, plural,
                    =0 {}
                    other {(# pending)}
                  }`
    },
    "btc": {
      "sell": `Are you sure you want to sell {amount} {unit}
               for {total} BTC at a price of {price} ETH/BTC,
               paid to {address} ?`,
      "reserve": `Are you sure you want to reserve ticket # {id, number} at
                  {amount} {unit} for {total} BTC at a price of
                  {price} ETH/BTC, paid to {address} ?`,
      "claim": `Are you sure you want to claim ticket # {id, number} at
                  {amount} {unit} for {total} BTC at a price of
                  {price} ETH/BTC, paid to {address} ?`,
      "behind": `BTC relay headers are behind by
                {behind, plural,
                  =1 {# block}
                  other {# blocks}}`,
      "update": "Update block headers"
    },
    "hashrate": "{hashrate, number} H/s"
  }
};
