import {parse, parseISO, format} from 'date-fns'

function toBool(val) {
    let num = +val;
    return !isNaN(num) ? !!num : !!String(val).toLowerCase().replace(!!0, '');
}

function toNull(val) {
    return ((val === null) || (val === 'null')) ? null : true;
}

export function encodeFilter(searchParam, filters) {
    filters.forEach((filter) => {
        if (filter.hasOwnProperty('value')) {
            if (toNull(filter.value) !== null) {
                // Select Multiple
                if (filter.type === 'select_multiple') {
                    filter.value.forEach((selected) => {
                        searchParam.append(filter.field + '[]', selected);
                    })
                    return;
                }

                // Date Range
                if (filter.type === 'date_range') {
                    Object.keys(filter.value).forEach((key) => {
                        if (filter.value[key]) {
                            searchParam.append(`${filter.field}[${key}]`, format(filter.value[key], filter.format));
                        }
                    })
                    return;
                }

                // Date
                if (filter.type === 'date') {
                    searchParam.append(filter.field, filter.value ? format(filter.value, filter.format) : null);
                    return;
                }

                // Checkbox
                if (filter.type === 'checkbox' || filter.type === 'switch') {
                    searchParam.append(filter.field, toBool(filter.value));
                    return;
                }

                // Other Inputs
                searchParam.append(filter.field, filter.value);
                return;
            }

            searchParam.delete(filter.field)
        }
    })
}

export function decodeFilter(searchParams, filters) {
    filters.forEach((filter) => {
        // Select Multiple
        if (filter.type === 'select_multiple') {
            filter.default = filter.default ?? [];
            filter.value = searchParams.getAll(filter.field + '[]') ?? filter.default;
            return;
        }

        // Date Range
        if (filter.type === 'date_range') {
            filter.default = {
                start: typeof filter.default[0] !== "undefined" ? parseISO(filter.default[0]) : (filter.default[0] ?? null),
                end: typeof filter.default[1] !== "undefined" ? parseISO(filter.default[1]) : (filter.default[0] ?? null),
            };
            filter.value = {
                start: searchParams.has(filter.field + '[start]') ? parse(searchParams.get(filter.field + '[start]'), filter.format, new Date()) : filter.default.start,
                end: searchParams.has(filter.field + '[end]') ? parse(searchParams.get(filter.field + '[end]'), filter.format, new Date()) : filter.default.end
            }
            return;
        }

        // Date
        if (filter.type === 'date') {
            filter.default = typeof filter.default === 'string' ? parseISO(filter.default) : (filter.default ?? null);
            filter.value = searchParams.has(filter.field) ? parse(searchParams.get(filter.field), filter.format, new Date()) : filter.default
            return;
        }

        // Checkbox
        if (filter.type === 'checkbox' || filter.type === 'switch') {
            filter.default = toNull(filter.default) !== null ? toBool(filter.default) : null;
            filter.value = searchParams.has(filter.field) ? toBool(searchParams.get(filter.field)) : filter.default;

            return;
        }

        // Other Inputs
        filter.value = searchParams.has(filter.field) ? searchParams.get(filter.field) : filter.default;
        filter.default = filter.default ?? null
    })
}
