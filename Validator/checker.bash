#curl -sL -w %{http_code} https://google.com:443 -o /dev/null
curl https://google.com:443
#echo http_code