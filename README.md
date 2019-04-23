# Zilliqapooltools
Tools to augment CMAX Proxy

I'm closing down my zilliqa pools, so this is my contribution to the community.

With the items in this repo you can:

1) Automatically update nodes remotely upon software change (from windows) using plink/putty. ( I have included a modified launch_docker.sh that can be executed remotely, and curls your ip address for each node)
2) Get your addr and private keys (from windows) using plink/putty.
3) Update CMAX (miner.py & website miner.jinja2 and miner3.jinja2) mongodb to add new variables, and update them.
4) Automatically pay miners using nodejs and zilliqa-js every block if your using CMAX proxy.
Note** you need to install nodejs, and zilliqa-js on your proxy server. These are required to run the javascript.
There are instruction here for zilliqa-js.

https://github.com/Zilliqa/Zilliqa-JavaScript-Library/blob/dev/README.md

Credits go to the following repos:

https://github.com/DurianStallSingapore/Zilliqa-Mining-Proxy

&

https://github.com/nnamon

P.S I am not a programmer, so excuse the the formatting and use of variables.

Enjoy!




