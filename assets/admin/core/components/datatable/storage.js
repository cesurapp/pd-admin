/**
 * Remove Storage Key
 *
 * @param name
 * @returns {boolean}
 */
function removeStorage(name) {
    try {
        localStorage.removeItem(name);
        localStorage.removeItem(name + '_expiresIn');
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * Get Storage Value Expired is Null
 *
 * @param key -> Storage Key
 * @returns {string|null}
 */
function getStorage(key) {
    let now = Date.now();
    let expiresIn = localStorage.getItem(key + '_expiresIn');
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    if (expiresIn < now) {
        // Expired
        removeStorage(key);
        return null;
    } else {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }
}

/**
 * Writes a key into localStorage setting a expire time
 *
 * @param key
 * @param value
 * @param expires -> Number of seconds from now to expire the key
 * @returns {boolean} -> Telling if operation succeeded
 */
function setStorage(key, value, expires) {
    if (expires === undefined || expires === null) {
        expires = (24 * 60 * 60);  // default: seconds for 1 day
    } else {
        expires = Math.abs(expires); //make sure it's positive
    }

    let now = Date.now();
    let schedule = now + expires * 1000;
    try {
        localStorage.setItem(key, JSON.stringify(value));
        localStorage.setItem(key + '_expiresIn', schedule);
    } catch (e) {
        return false;
    }
    return true;
}

export default {
    removeStorage, getStorage, setStorage
}
