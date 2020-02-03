chown -R root: /srv/www/static
find /srv/www/static -type d | xargs chmod +xr
find /srv/www/static -type f | xargs chmod +r