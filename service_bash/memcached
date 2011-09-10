#!/bin/sh
#
# memcached    Startup script for memcached processes
#
# chkconfig: - 90 10
# description: Memcache provides fast memory based storage.
# processname: memcached

# These mappings correspond one-to-one with Drupal's settings.php file.

[ -f memcached ] || exit 0

prog="memcached"

start() {
    echo -n $"Starting $prog "
    # Sessions cache.
    memcached -m 16 -l 0.0.0.0 -p 11211 -d -u nobody
    # Default cache.
    memcached -m 32 -l 0.0.0.0 -p 11212 -d -u nobody
    # Block cache.
    memcached -m 32 -l 0.0.0.0 -p 11213 -d -u nobody
    # Content cache. Holds fully loaded content type structures.
    memcached -m 16 -l 0.0.0.0 -p 11214 -d -u nobody
    # Filter cache. Usually the busiest cache after the default.
    memcached -m 32 -l 0.0.0.0 -p 11215 -d -u nobody
    # Form cache.
    memcached -m 32 -l 0.0.0.0 -p 11216 -d -u nobody
    # Menu cache.
    memcached -m 32 -l 0.0.0.0 -p 11217 -d -u nobody
    # Page cache. Bigger than most other caches.
    memcached -m 128 -l 0.0.0.0 -p 11218 -d -u nobody
    # Views definition cache.
    memcached -m 1 -l 0.0.0.0 -p 11219 -d -u nobody
    # Views data cache (may need to be increased if heavily used).
    memcached -m 32 -l 0.0.0.0 -p 11220 -d -u nobody

    # More caches that might be added later:

    # Users table.
    #/usr/bin/memcached -m 24 -l 0.0.0.0 -p 11219 -d -u nobody
    # Path source cache.
    #/usr/bin/memcached -m 4 -l 0.0.0.0 -p 11220 -d -u nobody
    # Path destination cache.
    #/usr/bin/memcached -m 6 -l 0.0.0.0 -p 11221 -d -u nobody
    RETVAL=$?
    echo
    return $RETVAL
}

stop() {
    if test "x`pidof memcached`" != x; then
        echo -n $"Stopping $prog "
        killall memcached
        echo
    fi
    RETVAL=$?
    return $RETVAL
}

case "$1" in
        start)
            start
            ;;

        stop)
            stop
            ;;

        restart)
            stop
            start
            ;;
        condrestart)
            if test "x`pidof memcached`" != x; then
                stop
                start
            fi
            ;;

        *)
            echo $"Usage: $0 {start|stop|restart|condrestart}"
            exit 1

esac

exit $RETVAL
